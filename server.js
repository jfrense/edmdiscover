var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(express.static(__dirname));

app.get('/resolve', function (req, res) {
  res.sendFile(__dirname + '/resolver.html');
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + 'index.html');
});

MongoClient.connect("mongodb://localhost:27017/soundcloud", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
