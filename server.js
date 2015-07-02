var express = require('express');
var path = require('path');
var PythonShell = require('python-shell');
var CronJob = require('cron').CronJob;
var tracks = require('./routes/tracks');
var app = express();


app.use(express.static(__dirname + '/public'));

app.get('/resolve', function (req, res) {
  res.sendFile(__dirname + '/public/resolver.html');
});

app.get('/api/shorttracks', tracks.getShortTracks);

app.get('/api/longtracks', tracks.getLongTracks);


app.get('*', function(req,res) {
  res.sendFile(__dirname + '/public/index.html');
  });

var options = {
	mode: 'text',
	scriptPath: '/Users/Justin/Dropbox/edmdiscover/tasks',
	pythonPath: 'python3'
};

new CronJob('*/2 * * * *', function() {
var d = new Date();
console.log("starting Update at: " + d);
var shell = new PythonShell('update.py', options);

shell.on('message', function (message) {
	console.log(message);

});

shell.end(function (err) {
  if (err) throw err;
  console.log('FINISHED UPDATE at: ' + d);
});

}, null, true, 'America/New_York');


app.listen(8081);
console.log('Listening on port 3000..');
