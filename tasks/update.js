var soundcloudsdk = require('./sdk');

soundcloudsdk.SC.initialize({
  client_id: 'b45b1aa10f1ac2941910a7f0d10f8e28'
});


SC.get('/users/' + 208934 + '/tracks',{ limit: 10 }, function(tracks) {
 console.log(tracks);

}