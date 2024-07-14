const express = require('express'); // Importa il framework Express.js
let app = express(); // Crea un'applicazione Express
const fs = require('fs'); // Modulo per la gestione dei file
const path = require('path'); // Modulo per la gestione dei percorsi dei file
const multer = require("multer"); // Modulo per la gestione dei file caricati
let mysql = require('mysql'); // Modulo per la connessione al database MySQL
const cors = require('cors'); // Middleware per gestire le richieste di risorse incrociate (CORS)
let db = require('./db.js'); //dati database in un'altro file
const { createHash } = require('crypto'); // Modulo per la creazione di hash
const { Console } = require('console');
let con;

//mi connetto al database
con = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

// restituisce una stringa senza spazi e in minuscolo
function formatString(str) {
  return str.replace(/\s+/g, '').toLowerCase();
}

function sendPage(url, message) {
  let page;
  return page = `
    <!DOCTYPE html>
    <html>
      <head>
        <script type="text/javascript">
          alert('${message}');
          window.location.href = 'http://localhost/${url}'; // Reindirizza alla pagina di upload
        </script>
      </head>
      <body></body>
    </html>
  `;
}

// for parsing multipart/form-data
app.use(cors({
  origin: 'http://localhost', // Origine del frontend che può accedere alle risorse del server
  credentials: true, // Permette l'uso dei cookie dalle richieste frontend
}));
app.use(multer().any());

// Token check
app.post('/check-token', (req, res) => {
  let token = req.body.token;
  token = createHash('sha256').update(token).digest('hex');
  console.log('token:', token);

  con.query("SELECT * FROM `secret-key` WHERE `secret` = ?", [token], function (err, result, fields) {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).send(sendPage('upload.html','Errore nella query'));
    }
    if (result.length == 0) {
      return res.status(401).send(sendPage('upload.html','Token non valido'));
    }
  });
  return res.status(200).json({ message: 'OK' });
});

// Aggiungi un tutorial
app.post('/addtutorial', (req, res) => {

  // Verifica che tutti i campi e i file richiesti siano presenti
  if (!req.body.title || !req.body.description || req.files.length === 0) {
    return res.status(400).send(sendPage('upload.html','Inserisci tutti i campi richiesti'));
  }

  let titolo = req.body.title;
  let descrizione = req.body.description;

  let PathImg = '/assets/tutorials/imgs/';

  // Save each file to a specified directory
  req.files.forEach(file => {
    const formattedTitolo = formatString(titolo);
    const destinationDir = '/var/www/html/assets/tutorials/imgs/'; // Specifica la tua directory di destinazione qui
    const newFileName = `${formattedTitolo}${path.extname(file.originalname)}`;
    console.log('newFileName:', newFileName);
    const filePath = path.join(destinationDir, newFileName);

    if (file.fieldname == 'immagine') {
      PathImg = PathImg + newFileName;
    }
    // Save the file
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error('Error saving file:', err);
      } else {
        console.log('File saved successfully');
      }
    });

    // Inserisci i dati del tutorial nel database
    con.query("INSERT INTO `tutorial` (`Titolo`, `Descrizione`,`Pathimg`) VALUES (?,?,?)", [titolo, descrizione, PathImg], function (err) {
      if (err) throw err;
      return res.status(201).send(sendPage('tutorial.html?editMode=true','Tutorial creato'));
    });
  });

});


//Upload di un sottotutorial
app.post('/upload', (req, res) => {

  // Verifica che tutti i campi e i file richiesti siano presenti
  if (!req.body.title || !req.body.description || !req.body.token || !req.body.tutorial || req.files.length === 1) {
    return res.status(400).send(sendPage('upload.html','Inserisci tutti i campi richiesti'));
  }

  let titolo = req.body.title;
  let descrizione = req.body.description;
  let tutorial = req.body.tutorial;
  let token = req.body.token;
  let PathPresentazione = '/assets/tutorials/files/';
  let PathEsercizi = '/assets/tutorials/files/';

  console.log('Title:', req.body.title);
  console.log('Description:', req.body.description);
  console.log('Token:', req.body.token);
  console.log('Tutorial:', req.body.tutorial);
  console.log('Files:', req.files);

  //Check token
  token = createHash('sha256').update(token).digest('hex');
  console.log('token:', token);

  con.query("SELECT * FROM `secret-key` WHERE `secret` = ?", [token], function (err, result, fields) {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).send(sendPage('upload.html','Errore nella query'));
    }
    if (result.length == 0) {
      return res.status(401).send(sendPage('upload.html','Token non valido'));
    }

    // Save each file to a specified directory
    req.files.forEach(file => {
      const formattedTutorial = formatString(tutorial);
      const formattedTitolo = formatString(titolo);
      const destinationDir = '/var/www/html/assets/tutorials/files'; // Specifica la tua directory di destinazione qui
      const newFileName = `${formattedTutorial}${formattedTitolo}${path.extname(file.originalname)}`;
      console.log('newFileName:', newFileName);
      const filePath = path.join(destinationDir, newFileName);

      if (file.fieldname == 'presentation') {
        PathPresentazione = PathPresentazione + newFileName;
      }
      if (file.fieldname == 'exercise') {
        PathEsercizi = PathEsercizi + newFileName;
      }
      // Save the file
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          console.error('Error saving file:', err);
        } else {
          console.log('File saved successfully');
        }
      });
    });

    // Inserisci i dati del sottotutorial nel database
    con.query("INSERT INTO `subtutorial` (`Titolo`, `Descrizione`, `PathPresentazione`, `PathEsercizi`, `tutorial`) VALUES (?,?,?,?,?)", [titolo, descrizione, PathPresentazione, PathEsercizi, tutorial], function (err) {
      if (err) throw err;
      return res.status(201).send(sendPage('tutorial.html','Caricato nel tutorial'));
    });
  });
});

// Aggiungi un portfolio
app.post('/addportfolio', (req, res) => {

  // Verifica che tutti i campi e i file richiesti siano presenti
  if (!req.body.title || !req.body.description || !req.body.token || !req.body.url || req.files.length === 0) {
    return res.status(400).send(sendPage('upload.html','Inserisci tutti i campi richiesti'));
  }

  let titolo = req.body.title;
  let descrizione = req.body.description;
  let url = req.body.url;
  let token = req.body.token;

  let PathImg = '/assets/imgs/portfolio/';

  //Check token
  token = createHash('sha256').update(token).digest('hex');
  console.log('token:', token);

  con.query("SELECT * FROM `secret-key` WHERE `secret` = ?", [token], function (err, result, fields) {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).send(sendPage('upload.html','Errore nella query'));
    }
    if (result.length == 0) {
      return res.status(401).send(sendPage('upload.html','Token non valido'));
    }
    // Save each file to a specified directory
    req.files.forEach(file => {
      const formattedTitolo = formatString(titolo);
      const destinationDir = '/var/www/html/assets/imgs/portfolio/'; // Specifica la tua directory di destinazione qui
      const newFileName = `${formattedTitolo}${path.extname(file.originalname)}`;
      console.log('newFileName:', newFileName);
      const filePath = path.join(destinationDir, newFileName);

      if (file.fieldname == 'imgcover') {
        PathImg = PathImg + newFileName;
      }
      // Save the file
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          console.error('Error saving file:', err);
        } else {
          console.log('File saved successfully');
        }
      });
    });

    // Inserisci i dati del portfolio nel database
    con.query("INSERT INTO `portfolio` (`Titolo`, `Descrizione`,`Url`,`Pathimg`) VALUES (?,?,?,?)", [titolo.toUpperCase(), descrizione, url, PathImg], function (err) {
      if (err) throw err;
      return res.status(201).send(sendPage('portfolio.html','Portfolio aggiunto'));
    });
  });

});

app.get('/tutorial', (req, res) => {
  // Query per selezionare tutti i dati dalla tabella tutorial
  con.query("SELECT * FROM tutorial", function (err, result, fields) {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).json({ error: 'Errore nella query' });
    }

    // Creazione dell'array di oggetti nel formato richiesto
    const tutorials = result.map(row => ({
      Titolo: row.Titolo,
      Descrizione: row.Descrizione,
      Pathimg: row.Pathimg
    }));

    // Invio della risposta JSON con i dati ottenuti
    res.json(tutorials);
  });
});

app.get('/subtutorial', (req, res) => {
  const titolo = req.query.titolo;
  // Query per selezionare i dati dalla tabella subtutorial filtrati per il titolo
  con.query("SELECT * FROM subtutorial WHERE tutorial = ?", [titolo], function (err, result, fields) {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).json({ error: 'Errore nella query' });
    }

    // Creazione dell'array di oggetti nel formato richiesto
    const subtutorials = result.map(row => ({
      Titolo: row.Titolo,
      Descrizione: row.Descrizione,
      PathPresentazione: row.PathPresentazione,
      PathEsercizi: row.PathEsercizi
    }));

    // Invio della risposta JSON con i dati ottenuti
    res.json(subtutorials);
  });
});

app.get('/portfolio', (req, res) => {
  // Query per selezionare i dati dalla tabella subtutorial filtrati per il titolo
  con.query("SELECT * FROM portfolio", function (err, result, fields) {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).json({ error: 'Errore nella query' });
    }

    // Creazione dell'array di oggetti nel formato richiesto
    const portfolio = result.map(row => ({
      Titolo: row.Titolo,
      Descrizione: row.Descrizione,
      Url: row.Url,
      Pathimg: row.Pathimg
    }));

    // Invio della risposta JSON con i dati ottenuti
    res.json(portfolio);
  });
});

app.get('/list-tutorial', (req, res) => {
  // Query per selezionare tutti i dati dalla tabella tutorial
  con.query("SELECT Titolo FROM tutorial", function (err, result, fields) {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).json({ error: 'Errore nella query' });
    }

    // Creazione dell'array di oggetti nel formato richiesto
    const tutorials = result.map(row => ({
      Titolo: row.Titolo,
      Descrizione: row.Descrizione,
      Pathimg: row.Pathimg
    }));

    // Invio della risposta JSON con i dati ottenuti
    res.json(tutorials);
  });
});



app.listen(3000, function () {
  console.log('listening on *:3000');
});