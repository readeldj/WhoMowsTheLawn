initialize();

function initialize() {
  var myLatlng = new google.maps.LatLng(36.124, -86.725);
  var mapOptions = {
    zoom: 14,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!',
      animation: google.maps.Animation.DROP,
      labelContent: "$425K",
      labelAnchor: new google.maps.Point(22, 0),
      labelClass: "labels" // the CSS class for the label
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
