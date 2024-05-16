let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');
const path = require("path");
const multer = require("multer");
let mysql = require('mysql');
let db = require('./db.js'); //dati database in un'altro file
let con;

app.use(bodyParser.urlencoded({ extended: false }));

io.sockets.on('connection', function (socket) { //quando un client si connette
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

    socket.on('add-tutorial', function () { //quando ricevo la richiesta di aggiungere un turoria
    });

    socket.on('add-subtutorial', function () { //quando ricevo la richiesta di aggiungere un subtutorial
    });

});

//Create new tutorial
app.post('/addtutorial', (req, res) => {
    console.log('Title:', req.body.title);
    console.log('Description:', req.body.description);
});


//Upload file

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "/var/www/html/upload/file");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    // Limit file size if needed
    limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB
    // Filter files
    fileFilter: function (req, file, cb) {
        // Check file type
        const allowedExtensions = ['.zip', '.pdf', '.ppt', '.pptx'];
        const extname = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(extname)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file extension!'), false);
        }
    }
});

app.post('/upload', (req, res) => {
    upload.fields([
        { name: 'presentation', maxCount: 1 },
        { name: 'exercise', maxCount: 1 }])(req, res, function (err) {
            if (err) {
                next(err);
                return;
            }

            const presentationFile = req.files['presentation'] ? req.files['presentation'][0] : null;
            const exerciseFile = req.files['exercise'] ? req.files['exercise'][0] : null;


            if (presentationFile) console.log('PDF/PPT/PPTX file:', presentationFile.originalname);
            if (exerciseFile) console.log('ZIP file:', exerciseFile.originalname);

            console.log('Description:', req.body.description);
            console.log('Title:', req.body.title);
            console.log('Tutorial:', req.body.tutorial);

            res.send('Files uploaded successfully!');
        });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});