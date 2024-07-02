const express = require('express'); // Importa il framework Express.js
let app = express(); // Crea un'applicazione Express
const fs = require('fs'); // Modulo per la gestione dei file
const path = require('path'); // Modulo per la gestione dei percorsi dei file
const multer = require("multer"); // Modulo per la gestione dei file caricati
let mysql = require('mysql'); // Modulo per la connessione al database MySQL
const cors = require('cors'); // Middleware per gestire le richieste di risorse incrociate (CORS)
let db = require('./db.js'); //dati database in un'altro file
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


//Create new tutorial
// for parsing multipart/form-data
app.use(cors({
    origin: 'http://localhost', // Origine del frontend che può accedere alle risorse del server
    credentials: true, // Permette l'uso dei cookie dalle richieste frontend
}));
app.use(multer().any());

app.post('/addtutorial', (req, res) => {

    let titolo = req.body.title;
    let descrizione = req.body.description;
    
    let PathImg = '/var/www/html/upload/file/';

    con.query("INSERT INTO `tutorial` (`Titolo`, `Descrizione`) VALUES (?,?)", [titolo, descrizione], function (err) {
        if (err) throw err;
        return res.status(201).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <script type="text/javascript">
              setTimeout(function() {
                window.location.href = 'http://localhost/upload/';
              }, 2000);
            </script>
          </head>
          <body>
          <h2>Tutorial created successfully</h2>
            <p>Redirecting in 2 seconds...</p>
          </body>
        </html>
      `);
    });
    console.log('body:', req.body);
});


//Upload file

app.post('/upload', (req, res) => {

    if (!req.body.title || !req.body.description || !req.body.token || !req.body.tutorial) {
        return res.status(400).send('Please provide all required fields and files');
    }

    let titolo = req.body.title;
    let descrizione = req.body.description;
    let tutorial = req.body.tutorial;
    let token = req.body.token;
    let PathPresentazione = '/var/www/html/upload/file/';
    let PathEsercizi = '/var/www/html/upload/file/';;

    console.log('Title:', req.body.title);
    console.log('Description:', req.body.description);
    console.log('Token:', req.body.token);
    console.log('Tutorial:', req.body.tutorial);
    console.log('Files:', req.files);

    //query token

    // Save each file to a specified directory
    req.files.forEach(file => {
        const destinationDir = '/var/www/html/upload/file'; // Specify your destination directory here
        const filePath = path.join(destinationDir, file.originalname);
        if (file.fieldname == 'presentation') {
            PathPresentazione = '/var/www/html/upload/file/' + file.originalname;
        }
        if (file.fieldname == 'exercise') {
            PathPresentazione = '/var/www/html/upload/file/' + file.originalname;
        }
        // Save the file
        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                console.error('Error saving file:', err);
            } else {
                console.log('File saved successfully:', file.originalname);
            }
        });
    });

    con.query("INSERT INTO `subtutorial` (`Titolo`, `Descrizione`, `PathPresentazione`, `PathEsercizi`, `tutorial`) VALUES (?,?,?,?,?)", [titolo, descrizione, PathPresentazione, PathEsercizi, tutorial], function (err) {
        if (err) throw err;
        return res.status(201).send('Caricato nel tutorial');
    });

    res.send('Files uploaded successfully!');
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