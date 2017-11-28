const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// pg setup
const pg = require('pg');
const format = require('pg-format');
let PGUSER = 'www-data';
let PGDATABASE = 'blowoffsteam';

let config = {
    user: 'www-data',
    password: 'www-data',
    host: 'localhost',
    database: 'blowoffsteam',
    max: 10,
    idleTimeoutMillis: 30000
};
let pool = new pg.Pool(config);
let dbClient;

// generaj setup
const port = 3000;

// create express app
let app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//  static files
app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.static(path.resolve(__dirname, 'node_modules')));

// api routes
app.get('/', function(req, res){
    res.json({
        result: 'i did nothing wrong'
    });
});
app.get('/messages', function(req, res) {
    dbClient.query(`SELECT * FROM messages LIMIT 100`,
    function (err, result) {
        if (err) {
            console.log(err.stack);
            res.json({
                result: 'error: ' + err.stack
            });
            return;
        }
        let count = result.rows.length;
        let messages = result.rows;
        res.json({
            result: count + ' messages fetched.',
            messages
        });
    });
});
app.get('/messages/:id', function(req, res) {
    dbClient.query(`SELECT * FROM messages WHERE id = $1`,
    [req.params.id],
    function (err, result) {
        if (err) {
            console.log(err.stack);
            res.json({
                result: 'error: ' + err.stack
            });
            return;
        }
        let count = result.rows.length;
        let message = result.rows[0];
        res.json({
            result: count + ' message fetched.',
            message
        });
    });
});
app.post('/messages', function(req, res) {
    let content = req.body.message;
    let recipient = req.body.to;

    dbClient.query(`INSERT INTO messages (content, recipient) VALUES ($1, $2) RETURNING ID`,
        [content, recipient],
        function (err, result) {
            if (err) {
                console.log(err.stack);
                res.json({
                    result: 'error: ' + err.stack
                });
                return;
            }
            console.log(result)
            let id = result.rows[0].id;
            res.json({
                result: 'message was inserted with id ' + id
            });
        });
});
app.delete('/messages/:id', function(req, res) {
    dbClient.query(`DELETE FROM messages WHERE id = $1 RETURNING *`,
    [req.params.id],
    function (err, result) {
        if (err) {
            console.log(err.stack);
            res.json({
                result: 'error: ' + err.stack
            });
            return;
        }
        let count = result.rows.length;
        res.json({
            result: count + ' message deleted.',
        });
    });
});

// connect to db
pool.connect(function (err, client, done) {
    if (err) console.log(err)
    else {
        console.log('Connected to db')
        dbClient = client;
    }
})

// listen for requests
app.listen(port, function(){
    console.log("Listening on " + port);
});
