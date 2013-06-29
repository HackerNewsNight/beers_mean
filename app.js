/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , BeerProvider = require('./beerprovider.js').BeerProvider;  

var app = express();
var beerProvider= new BeerProvider('localhost', 27017);

// all environments
app.set('title', 'Beers')
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', routes.index);
app.get('/users', user.list);

app.get('/', function(req, res){
    beerProvider.findAll(function(error, emps){
        res.render('index', {
            title: 'Beers',
            beers:emps
        });
    });
});

app.get('/beer/new', function(req, res) {
    res.render('beer_new', {
        title: 'New Beer'
    });
});

//save new beer
app.post('/beer/new', function(req, res){
    beerProvider.save({
        title: req.param('title'),
        name: req.param('name')
    }, function( error, docs) {
        res.redirect('/')
    });
});

// Check for development mode
if ('development' == app.get('env') || 'dev' == app.get('env')) {
  console.log('[development mode]');
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log(' - static resources @ ' + path.join(__dirname, 'public'));
});
