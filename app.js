/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , BeerProvider = require('./beerprovider').BeerProvider;

var app = express();
var bp = new BeerProvider('localhost', 27017);

// all environments
app.set('debug', true);
app.set('title', 'Beers');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', function(req, res){
  bp.findAll(function(error, beers){
    res.render('index', {
      title: 'Beers',
      beers: beers
    });
  });
});

app.get('/users', user.list);

app.get('/beers/new', function(req, res) {
  res.render('beers_new', {
    title: 'New Beer'
  });
});

app.post('/beers/new', function(req, res){
  bp.save({
    title: req.param('title'),
    name: req.param('name')
  }, function( error, docs) {
    res.redirect('/')
  });
});


// Check for development mode
app.configure('production', function(){
	app.set('debug', false);
})

http.createServer(app).listen(app.get('port'), function(){
  serverMsg = 'Express server listening on port ' + app.get('port');
  if (app.get('debug') == true){
    serverMsg += ' [debug mode]';
  }
  console.log(serverMsg);
  console.log('- static resources @ ' + path.join(__dirname, 'public'));
});
