let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
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



http.listen(3000, function () {
    console.log('listening on *:3000');
});