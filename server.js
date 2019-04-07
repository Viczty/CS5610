const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: 'process.env.SESSION_SECRET'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist/my-project')));


// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3200';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);
server.listen(port, () => console.log('Running on port 3200'));

// mongodb://heroku_zshh7r5k:zty199261@ds221416.mlab.com:21416/heroku_zshh7r5k
// var connectionString = 'mongodb://127.0.0.1:27017/webdev';
var connectionString = 'mongodb://cs5610:cs5610@ds221416.mlab.com:21416/heroku_zshh7r5k';

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const client = mongoose.connect(connectionString, {useNewUrlParser: true});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// require('./helloworld')(app);
require('./assignment/app')(app);
