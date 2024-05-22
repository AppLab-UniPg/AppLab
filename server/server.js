let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require("multer");
let mysql = require('mysql');
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

io.sockets.on('connection', function (socket) { //quando un client si connette

    socket.on('receive-tutorial', function () { //quando ricevo la richiesta di un tutorial invio i dati
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM tutorial", function (err, result, fields) {
                if (err) throw err;
                let tutorials = JSON.parse(JSON.stringify(result));
                socket.emit('send-tutorial', { tutorials: tutorials });   //invio i dati al client
                console.log(tutorials);
            });
        });
    });

    socket.on('receive-subtutorial', function (dati) { //quando ricevo la richiesta di un subtutorial invio i dati
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM subtutorial where tutorial=?", [dati.tutorial], function (err, result, fields) {
                if (err) throw err;
                let tutorials = JSON.parse(JSON.stringify(result));
                socket.emit('send-subtutorial', { tutorials: tutorials });   //invio i dati al client
                console.log(tutorials);
            });
        });
    });

    socket.on('receive-list-tutorial', function () { //quando ricevo la richiesta della lista dei tutorial invio i dati
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT Titolo FROM tutorial", function (err, result, fields) {
                if (err) throw err;
                let tutorials = JSON.parse(JSON.stringify(result));
                socket.emit('send-list-tutorial', { tutorials: tutorials });
                console.log(tutorials);
            });
        });
    });

});

//Create new tutorial
// for parsing multipart/form-data
app.use(multer().any());

app.post('/addtutorial', (req, res) => {

    let titolo = req.body.title;
    let descrizione = req.body.description;

    con.query("INSERT INTO `tutorial` (`Titolo`, `Descrizione`) VALUES (?,?)", [titolo, descrizione], function (err) {
        if (err) throw err;
        return res.status(201).send('Caricato nel tutorial');
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


http.listen(3000, function () {
    console.log('listening on *:3000');
});