BeerProvider = require('../api/beerprovider').BeerProvider;
var bp = new BeerProvider('localhost', 27017);

exports.beers = {};

exports.beers.get = function(req, res){
    var id = req.params.id;
    if(id){
        console.log('this request has an id attached to it')
    }
    else {
        console.log('get all beers')
        bp.findAll(function(error, beers){
            res.json({
                beers: beers
            })
        });
    };
};

exports.beers.post = function(req, res){
    res.render('TODO: Do some posting here.... ');
};

exports.beers.destroy = function(req, res){
    res.render('TODO: DELETE')
}

exports.beers.put = function(req, res){
    bp.save({
        entry: req.body
    }, function(error, docs) {
        res.redirect('/');
    })
};
