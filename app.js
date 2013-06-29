
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

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/users', user.list);

var beerProvider= new BeerProvider('localhost', 27017);

//Routes

app.get('/', function(req, res){
    beerProvider.findAll(function(error, beers){
        res.render('index', {
            title: 'Beers',
            beers:beers
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
