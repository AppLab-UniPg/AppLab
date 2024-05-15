let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const path = require("path");
const multer = require("multer");
let mysql = require('mysql');
let db = require('./db.js'); //dati database in un'altro file
let con;

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
                let tutorials=JSON.parse(JSON.stringify(result));
                socket.emit('send-tutorial', {tutorials: tutorials});   //invio i dati al client
                console.log(tutorials);
            });
        });
    });

    socket.on('receive-subtutorial', function (dati) { //quando ricevo la richiesta di un subtutorial invio i dati
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM subtutorial where tutorial=?",[dati.tutorial], function (err, result, fields) {
                if (err) throw err;
                let tutorials=JSON.parse(JSON.stringify(result));
                socket.emit('send-subtutorial', {tutorials: tutorials});   //invio i dati al client
                console.log(tutorials);
            });
        });
    });

    socket.on('receive-list-tutorial', function () { //quando ricevo la richiesta della lista dei tutorial invio i dati
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT Titolo FROM tutorial", function (err, result, fields) {
                if (err) throw err;
                let tutorials=JSON.parse(JSON.stringify(result));
                socket.emit('send-list-tutorial', {tutorials: tutorials});
                console.log(tutorials);
            });
        });
    });

    socket.on('add-tutorial', function () { //quando ricevo la richiesta di aggiungere un turoria
    });

    socket.on('add-subtutorial', function () { //quando ricevo la richiesta di aggiungere un subtutorial
    });

});





 
// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
 
var upload = multer({ dest: "/var/www/html/upload/file" })
// If you do not want to use diskStorage then uncomment it
 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "/var/www/html/upload/file");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
 
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
 
var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
 
        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
 
        if (mimetype && extname) {
            return cb(null, true);
        }
 
        cb(
            "Error: File upload only supports the " +
                "following filetypes - " +
                filetypes
        );
    },
 
    // mypic is the name of file attribute
}).single("mypic");

 
app.post("/uploadProfilePicture", function (req, res, next) {
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req, res, function (err) {
        if (err) {
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err);
        } else {
            // SUCCESS, image successfully uploaded
            res.send("Success, Image uploaded!");
        }
    });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});