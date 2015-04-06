'use strict';
//initialize();

function initialize() {
  var myLatlng = new google.maps.LatLng(31.569177, -91.3473639999999);  //Schools location for testing.
  //var myLatlng = new google.maps.LatLng([app:user-lat], [app:user-lon]);
  var mapOptions = {
    zoom: 15,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: map,
  //     title: 'Hello World!',
  //     animation: google.maps.Animation.DROP,
  //     labelContent: "$425K",
  //     labelAnchor: new google.maps.Point(22, 0),
  //     labelClass: "labels" // the CSS class for the label
  // });

  var contentString = '<div id="content">'+
      // '<div id="siteNotice">'+
      // '</div>'+
      //'<h1 id="firstHeading" class="firstHeading">400 Oakland Dr</h1>'+
      '<div id="bodyContent">'+
      '<p>400 Oakland Dr<br>' +
      'Natchez, MS 39120<br>'+
      'Website: <a href="http://uslawns.com/ken-beasley-system-success/">uslawns.com</a><br>'+
      'Facebook: <a href="https://www.facebook.com/uslawnsfranchise">www.facebook.com/uslawnsfranchise</a><br>'+
      'Price: $30<br>'+
      'Comments: Grass is even, edging is perfect, no mess left behind.<br>'+
      '</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
  });

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: '400 Oakland Dr'
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });




}

google.maps.event.addDomListener(window, 'load', initialize);


// var myFirebaseRef = new Firebase("https://whomowsthelawn.firebaseio.com/"),
//                fb = new Firebase(myFirebaseRef);

function test() {
  myFirebaseRef.push({
    title: "Hello 111 World!",
    author: "Devin"
  });
}
//test();
