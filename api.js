var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'databases.000webhost.com',
    port: '80',
    user: 'id12958271_test',
    password: '1q2w3e',
    database: 'id12958271_teste'
});
  
// connect to database
dbConn.connect(); 
 
//led state
app.get('/led/:id', function (req, res) {
  
    let led_id = req.params.id;
  
    if (!led_id) {
        return res.status(400).send({ error: true, message: 'Please provide led_id' });
    }
  
    dbConn.query('SELECT * FROM led where id=?', led_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'led_id state.' });
    });
  
});

//  Update user with id
app.post('/led', function (req, res) {
  
    let led_id = req.body.led_id;
    let state = req.body.state;
  
    if (!led_id) {
        return res.status(400).send({ error: state, message: 'Please provide led and id'});
    }
  
    dbConn.query("UPDATE led SET state = ? WHERE id = ?", [state, led_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'led has been updated successfully.' });
    });
});
 
// set port
app.listen(process.env.PORT || 3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;