var express = require('express');
var path = require('path');
var app = express();


app.use(express.static(__dirname + '/public'));

app.get('/resolve', function (req, res) {
  res.sendFile(__dirname + '/resolver.html');
});


app.get('*', function(req,res) {
  res.sendFile(__dirname + '/public/index.html');
  });


app.listen(3000);
console.log('Listening on port 3000..');
