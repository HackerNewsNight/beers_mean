var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

BeerProvider = function(host, port) {
    this.db= new Db('node-mongo-Beer', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}), {safe: true});
    this.db.open(function(){});
};


BeerProvider.prototype.getCollection= function(callback) {
    this.db.collection('Beers', function(error, Beer_collection) {
        if( error ) callback(error);
        else callback(null, Beer_collection);
    });
};

//find all Beers
BeerProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, Beer_collection) {
        if( error ) callback(error)
        else {
            Beer_collection.find().toArray(function(error, results) {
                if( error ) callback(error)
                else callback(null, results)
            });
        }
    });
};

//save new Beer
BeerProvider.prototype.save = function(Beers, callback) {
    this.getCollection(function(error, Beer_collection) {
        if( error ) callback(error)
        else {
            if( typeof(Beers.length)=="undefined")
                Beers = [Beers];

            for( var i =0;i< Beers.length;i++ ) {
                Beer = Beers[i];
                Beer.created_at = new Date();
            }

            Beer_collection.insert(Beers, function() {
                callback(null, Beers);
            });
        }
    });
};

exports.BeerProvider = BeerProvider;
