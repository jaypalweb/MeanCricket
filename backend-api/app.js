var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config/database');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Connect to db
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to MongoDB');
});

//Init app
var app = express();

//express file upload middleware
app.use(fileUpload());

//Pretify JSON middleware
app.set('json spaces', 4);

// Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//set the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var port = 3000;

const swaggerConfig = require('./config/swagger');
const swaggerDocs = swaggerJsDoc(swaggerConfig.options(port));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));


//Set routes
var teams = require('./routers/teams');
var players = require('./routers/players');

app.use('/teams', teams);
app.use('/players', players);

// Start the server
app.listen(port, function () {
    console.log('Server running at ' + port);
});
