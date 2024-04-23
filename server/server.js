let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
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


    socket.on('receive-tutorial', function (dati) { //quando ricevo la richiesta di un tutorial invio i dati

    });

    socket.on('receive-subtutorial', function (dati) { //quando ricevo la richiesta di un subtutorial invio i dati
    });

    socket.on('receive-list-tutorial', function () { //quando ricevo la richiesta della lista dei tutorial invio i dati
    });

});



http.listen(3000, function () {
    console.log('listening on *:3000');
});