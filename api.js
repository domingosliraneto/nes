var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

let prod = 1;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// Prod
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

if(prod == 1){
    var dbConn = mysql.createConnection({
        host: 'remotemysql.com',
        port: '3306',
        user: 'aauej2RDHp',
        password: 'ZnjhsChzJM',
        database: 'aauej2RDHp'
    });
}
else{
    var dbConn = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'nes'
    });
}

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


app.get('/sensor/:id', function (req, res) {
  
    let sensor = req.params.id;
  
    if (!sensor) {
        return res.status(400).send({ error: true, message: 'Please provide sensor' });
    }
  
    dbConn.query('SELECT * FROM sensor where id=?', sensor, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'sensor state.' });
    });
  
});

//  Update user with id
app.post('/sensor', function (req, res) {
  
    let sensor_id = req.body.sensor_id;
    let pitch = req.body.pitch;
    let roll = req.body.roll;

    if (!sensor_id) {
        return res.status(400).send({ error: state, message: 'Please provide sensor and id'});
    }
  
    dbConn.query("UPDATE sensor SET pitch = ?, roll = ? WHERE id = ?", [pitch, roll, sensor_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'sensor has been updated successfully.' });
    });
});


app.get('/sensorStatus/:nomeEsp', function (req, res) {
  
    let nomeEsp = req.params.nomeEsp;
  
    if (!nomeEsp) {
        return res.status(400).send({ error: true, message: 'Please provide Sensor Status - error!.' });
    }
  
    dbConn.query('SELECT * FROM sensorStatus where nomeEsp=?', nomeEsp, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Sensor Status - OK!.' });
    });
  
});

//  Update user with id
app.post('/sensorStatus', function (req, res) {
  
    let nomeEsp = req.body.nomeEsp;
    let ax = req.body.ax;
    let ay = req.body.ay;
    let az = req.body.az;
    
    let gx = req.body.ay;
    let gy = req.body.ay;
    let gz = req.body.ay;

    let mx = req.body.ay;
    let my = req.body.ay;
    let mz = req.body.ay;

    if (!nomeEsp) {
        return res.status(400).send({ error: state, message: 'Please provide sensor and nomeEsp'});
    }
  
    dbConn.query("UPDATE sensorStatus SET  ax = ?, ay = ? , az = ?,  gx = ?, gy = ?,  gz = ?,  mx = ?,  my = ?,  mz = ? WHERE nomeEsp = ?", 
    [nomeEsp, ax, ay, az,  gx, gy,  gz,  mx,  my,  mz], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Sensor Status has been updated successfully.' });
    });
});

// set port
app.listen(process.env.PORT || 3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;