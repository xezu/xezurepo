var express = require('express'),
    stylus = require('stylus'),
    open = require('open'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname+'/server/views');

// STYLUS CONFIG
function compile(str, path){
    return stylus(str).set('filename', path);
}
app.use(express.static(__dirname+'/public'));
app.use(stylus.middleware(
    {
        src: __dirname+'/public',
        compile:compile
    }
));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



// DB CONNECTION
var dbName = 'testDb';
var connString = 'mongodb://localhost/'+dbName;
mongoose.connect(connString);
var db = mongoose.connection;

db.on('error', function(err){
    console.log('Error Connecting to Mongodb '+err);
    //consol.error.bind(console, 'connection error');
});

db.once('open', function callback(){
   console.log('MongoDB Connection Opened'); 
});

// SHOWING DB CONTENT
// Define a Schema
var msgSchema = mongoose.Schema({message:String});

// Create a Model - In Memory representation of schema
var msgModel = mongoose.model('Message', msgSchema);

// WRITE MSG TO DB
var msgObjToSave = new msgModel({message: 'This is a fresh message' });
msgObjToSave.save(
    function (err){
        if (err)
            console.log('Failed to Save Message');
});


// READ MSG FROM DB
var msgFromDB;
msgModel.findOne().exec(function(err, msgDocument){
    msgFromDB = msgDocument.message;
    console.log('Got the message from DB '+msgFromDB);
});


app.get('/partials/:partialPath', function(req, res) {
    console.log('partial requested '+req.params.partialPath);
    res.render('partials/' + req.params.partialPath);
});


app.get('/', function(req, res){
    console.log('main page requested');
    res.render('index', {
        msgFromDB : msgFromDB
    });
});


var port = 3000;
app.listen(port);
console.log('http://localhost:'+port);
open('http://localhost:'+port);
