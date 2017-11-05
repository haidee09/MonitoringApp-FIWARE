var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
//var mongoose    = require('mongoose');
var path        = require('path');
const http      = require('http');
//var config      = require('./config'); // get our config file
//var mdauth      = require('./middleware/middlewareauth'); // get our config file
//var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = express();
/*
// DataBase configuration
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
*/
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// Express middleware - This will ensure that the middleware runs before the routes.
/*
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Content-Type, x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
/* Route middleware to verify a token
app.use(function(req, res, next) {
  mdauth.verifyToken(req, res, next);
});
*/
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//ROUTES HERE

// Middleware to catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});


/* Configuracion del puerto*/
const port = process.env.PORT || '3500';// used to create, sign, and verify tokens
app.set('port', port);
/* Creacíon del servidor http */
const server = http.createServer(app);
/* Servidor en escucha de acuerdo al puerto especificado.*/
server.listen(port, () => console.log(`APP running on localhost:${port}`));
module.exports = app;
