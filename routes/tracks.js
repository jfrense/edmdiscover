var mongo = require("mongodb");


var Server = mongo.Server,
    Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('edmdiscover', server);
var connection = db.open(function(err, db) {

  if(!err) {
  console.log("Connected to database");
  db.collection('tracks',{strict: true},function(err, collection){

    if(err) {
      console.log("cant connect to db");
    }


  });


}

});

exports.getShortTracks = function(req, res){
 db.collection('tracks', function(err, collection){

 collection.find({ duration: { $lt: 480000 } }).sort({created_at:-1}).toArray(function(err,items){
    //  var result = JSON.stringify(items);
      res.json(items);
   });


 });


};

exports.getLongTracks = function(req, res){
 db.collection('tracks', function(err, collection){

 collection.find({ duration: { $gte: 480000 } }).sort({created_at:-1}).toArray(function(err,items){
    //  var result = JSON.stringify(items);
      res.json(items);
   });


 });


};