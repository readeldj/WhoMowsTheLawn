'use strict';


// setting global variables
var FIREBASE_URL = 'https://whomowsthelawn.firebaseio.com',
              fb = new Firebase(FIREBASE_URL),
           $form = $('form'),
      usersFbUrl;
  var geocoder; //new
  var LatLng = 0;
  var coordinates;

//this runs on loading of the js file.
if (fb.getAuth()) {
  // $('.login').remove();
  // $('.app').toggleClass('hidden');
  // $('.test1').toggleClass('hidden');
  // $('.test2').toggleClass('hidden');

  usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid;

//this is where we get our data from fb and then add it to the DOM.
//works but the submit button holds grey font color. fix
  $.get(usersFbUrl + '.json', function(data){
    $('input[id="address"]').val( data.address );
    $('input[id="city"]').val(data.city);
    $('select[id="state"]').val(data.state);
    $('input[id="zip"]').val(data.zip);
    $('input[id="price"]').val(data.price);
    $('input[id="website"]').val(data.website);
    $('input[id="facebook"]').val(data.facebook);
    $('select[id="rating"]').val(data.rating);
    $('textarea[id="comments"]').val(data.comments);
  });
}

//This is where we submit our profile form to fb.
$form.submit(function(evt){
   var $address   = $('input[id="address"]').val(),
       $city      = $('input[id="city"]').val(),
       $state     = $('select[id="state"]').val(),
       $zip       = $('input[id="zip"]').val(),
       $price     = $('input[id="price"]').val(),
       $website   = $('input[id="website"]').val(),
       $facebook  = $('input[id="facebook"]').val(),
       $rating    = $('select[id="rating"]').val(),
       $comments  = $('textarea[id="comments"]').val();

   var $concatAddress = $('input[id="address"]').val() + ", " + $('input[id="city"]').val() + ", " + $('select[id="state"]').val();

   var group      = { address: $address,
                      city: $city,
                      state: $state,
                      zip: $zip,
                      price: $price,
                      website: $website,
                      facebook: $facebook,
                      rating: $rating,
                      comments: $comments, //};
                      test: LatLng };



   getCoordinates ($concatAddress, function(coordinates){
     LatLng = (coordinates);
   });


  $.when(LatLng !== 0).then(function(X){
     postDataToFB(group);
   })

   function getCoordinates (address, callback) {

     var coords_obj;
     geocoder   = new google.maps.Geocoder();
     geocoder.geocode({ address: address}, function (results, status){
       coords_obj = results[0].geometry.location;
       coordinates = [coords_obj.k, coords_obj.D];
       callback(coordinates);
     });
   }



//I want to redo this so that it uses jquery/ajax so it's not fb specific so I can move it somewhere else later.

  //  $.when(LatLng !== 0).then(function(){
  //    console.log(LatLng);
  //    usersRef.set(group);
  //  });
   function postDataToFB (group){
     var ref = new Firebase("https://whomowsthelawn.firebaseio.com/users/");
     var usersRef = ref.child(fb.getAuth().uid);
     usersRef.set(group);
   }




   evt.preventDefault();
 });
