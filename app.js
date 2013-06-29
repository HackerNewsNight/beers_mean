/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api.js')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

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
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/users', user.list);
// Beer Mapping
app.get('/api/beers', api.beers.get);
app.post('/api/beers', api.beers.post);
app.put('/api/beers/:id', api.beers.put);
app.delete('/api/beers/:id', api.beers.delete);
app.get('*', routes.index);

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
