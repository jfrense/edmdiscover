SC.initialize({
  client_id: 'b45b1aa10f1ac2941910a7f0d10f8e28'
});
var songlist = [];

/*
var myTrack;
var myTrack2;
var djlist2 = [208934];
var djlist = [296190,
274197,
29968445,
2068138,
141707,
1861068,
4904351,
420748,
856062,
199197,
208934,
26253177,
1495169,
1057056,
1953860,
124877001,
3221831,
630356,
241466,
4152527,
2022886,
462658,
351064,
398575,
124286,
118312,
782695,
9910169,
369512,
302173,
2580498,
16730,
4562420,
2279060,
271960,
16502149,
1701116,
322386,
300697,
11315169,
60663,
6727283,
28133363,
291427,
2292993,
1271874,
2332671,
2233642,
944515,
236295,
144968,
17474,
5042148,
146393,
925075,
308413,
1250904,
13245797,
1038649,
2795582,
52701120,
335414,
17775636,
670089,
20216802,
12132385,
956458,
2863526,
119571,
20615392,
1385523,
681528,
1402458,
120536,
3188585,
2323997,
1121186,
3333956,
24229,
1887081,
31037,
483294,
10286205,
1230816,
1319725,
23510416,
330740,
461610,
840950,
3787492,
25410620,
4282725,
8721372,
11107858,
1716289,
1642029,
1452676,
5107465,
31024
];



var remixList = []
var songlist = [];
var looper = 0;
// api call to SC for track listmand then pushed to array songList
for (x in djlist) {
SC.get('/users/' + djlist[x] + '/tracks',{ limit: 10 }, function(tracks) {
 console.log(tracks);
/*
 sortedTracks = tracks.sort(function(a,b){
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.created_at) - new Date(a.created_at);
});


 	myTrack = tracks[0].id;
  myTitle = tracks[0].title;

  if (myTitle.search(/remix/i) > -1 ) {
remixList.push(myTitle);
  }
console.log(remixList);
console.log(remixList.length);
*/
//  var iframestart = '<iframe width="500" height="100" scrolling="no" transparency="false" style="background: #0000;" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';

//  var iframeend = '&amp;color=0066cc&amp;inverse=true&amp;auto_play=false&amp;show_user=true"></iframe>';
var tab1 = document.getElementById("tab1");
//var shortTracks = []
$.getJSON( "http://localhost:8080/api/shorttracks", function( data ) {
  
  $.each( data, function( key, val ) {
   // shortTracks.push(val);
  var span = '<span id="trackName">' + val.title + '</span>';
  var button = '<button id="playButton" data-track="' + val._id + '">Play</button>';
 // var framecode = iframestart + $(this).attr("data-track") + iframeend;
 // console.log(framecode);
  var mydiv = '<div class="myPlayer" id=' + val._id + '>' + span + button + '</div>';
  tab1.insertAdjacentHTML( 'beforeend', mydiv );  
  songlist.push(val._id);
});
// initial load of div objects containing track information (title, artist)
  /*
  var body = document.getElementById("music");
  var span = '<span id="trackName">' + myTitle + looper + '</span>';
  var button = '<button id="playButton" data-track="' + myTrack + '">Play</button>';
 // var framecode = iframestart + $(this).attr("data-track") + iframeend;
 // console.log(framecode);
  var b = '<br><br>';
  var mydiv = '<div class="myPlayer" id=' + myTrack + '>' + span + button + '</div>';
  body.insertAdjacentHTML( 'beforeend', mydiv );
 // div.insertAdjacentHTML( 'beforeend', button );
//  div.insertAdjacentHTML( 'beforeend', framecode );

//  div.insertAdjacentHTML( 'beforeend', b );
*/
//  songlist.push(myTrack);
 //  console.log(songlist);          
});

var tab2 = document.getElementById("tab2");
//var shortTracks = []
$.getJSON( "http://localhost:8080/api/longtracks", function( data ) {
  
  $.each( data, function( key, val ) {
 //   shortTracks.push(val);
  var span = '<span id="trackName">' + val.title + '</span>';
  var button = '<button id="playButton" data-track="' + val._id + '">Play</button>';
 // var framecode = iframestart + $(this).attr("data-track") + iframeend;
 // console.log(framecode);
  var mydiv = '<div class="myPlayer" id=' + val._id + '>' + span + button + '</div>';
  tab2.insertAdjacentHTML( 'beforeend', mydiv );  
  songlist.push(val._id);
});
});


//maybe you should group the two following functions into one. Might be bad code style if two functions call each other repeatedly

// find ID of next song and produce iframe on FINISH of current track being played
function queueNextSong(currenttrack){

  var mydiv = document.getElementById(currenttrack);
    var myiframe = mydiv.getElementsByTagName("iframe")[0];
    var widget = SC.Widget(myiframe);
    var currentsongindex = songlist.indexOf((parseInt(currenttrack))); // must parse to int otherwise it takes currenttrack literilly as a string
    var nextsongID = songlist[currentsongindex + 1];
    
    widget.bind(SC.Widget.Events.FINISH, function () {
   
    produceIframe(nextsongID);

});

}


// produce Iframe of track and queue up iframe of next track to load when current track is finished playing
function produceIframe(track){
  var iframestart = '<iframe width="100%" height="100" scrolling="no" transparency="false" style="background: #0000;" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';

  var iframeend = '&amp;color=0066cc&amp;inverse=true&amp;auto_play=true&amp;show_user=true"></iframe>';
  
  var iframeCode = iframestart + track + iframeend;


    $("#" + track ).html(iframeCode);

    queueNextSong(track);


}



$('#music').on('click', '#playButton', function(){
    
  var clickedTrack = $(this).attr("data-track");

  produceIframe(clickedTrack);


});




/*
    var iframeCode = iframestart + $(this).attr("data-track") + iframeend;
    var thisTrack = $(this).attr("data-track");
    console.log(thisTrack);
    $("#" + thisTrack ).html(iframeCode);

    var mydiv = document.getElementById($(this).attr("data-track"));
    var myiframe = mydiv.getElementsByTagName("iframe")[0];
    var widget = SC.Widget(myiframe);
    var currentsongindex = songlist.indexOf((parseInt(thisTrack)));
    console.log(currentsongindex);
    var nextsongID = songlist[currentsongindex + 1];
    console.log(nextsongID);
    widget.bind(SC.Widget.Events.FINISH, function () {
    var iframeCodenext = iframestart + nextsongID + iframeend;
    $("#" + nextsongID ).html(iframeCodenext);

    

});
*/
$('#remix').on("click", function(){
  $('#music').empty();
  songlist = [];
    $.each( tracks, function( key, val ) {
      if (val.title.search(/remix/i) > -1 ) {
        var span = '<span id="trackName">' + val.title + '</span>';
  var button = '<button id="playButton" data-track="' + val._id + '">Play</button>';
 // var framecode = iframestart + $(this).attr("data-track") + iframeend;
 // console.log(framecode);
  var mydiv = '<div class="myPlayer" id=' + val._id + '>' + span + button + '</div>';
  body.insertAdjacentHTML( 'beforeend', mydiv );  
  songlist.push(val._id);


  }

});
  $('head').append('<link rel="stylesheet" type="text/css" href="style.css">');


});

jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });
});

