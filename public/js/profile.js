'use strict';

var FIREBASE_URL = 'https://whomowsthelawn.firebaseio.com',
              fb = new Firebase(FIREBASE_URL),
           $form = $('form')
           token,
      usersFbUrl;


if (fb.getAuth()) {
  // $('.login').remove();
  // $('.app').toggleClass('hidden');
  // $('.test1').toggleClass('hidden');
  // $('.test2').toggleClass('hidden');

  usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid; //deleted  + '/data'
  token = fb.getAuth().token;

  $.get(usersFbUrl + '/users/' + fb.getAuth().uid + '/profile.json', function(data){
    if(data !== null) {
      Object.keys(data).forEach(function(uuid) {
        //addProfileToTable(uuid, data[uuid]);
        //showPetDiv();
      });
    }
  });
}

$form.submit(function(evt){
   var $address   = $('input[name="address"]').val(),
       $city      = $('input[name="city"]').val(),
       $state     = $('select[name="state"]').val(),
       $zip       = $('input[name="zip"]').val(),
       $price     = $('input[name="price"]').val(),
       $website   = $('input[name="website"]').val(),
       $facebook  = $('input[name="facebook"]').val(),
       $rating    = $('select[name="rating"]').val(),
       $comments  = $('textarea[name="comments"]').val();

   var group      = { address: $address,
                      city: $city,
                      state: $state,
                      zip: $zip,
                      price: $price,
                      website: $website,
                      facebook: $facebook,
                      rating: $rating,
                      comments: $comments };

   var ref = new Firebase("https://whomowsthelawn.firebaseio.com/users/");
   var usersRef = ref.child(fb.getAuth().uid);
   usersRef.set(group);



   //var url  = usersFbUrl + '/profile.json'; //was usersFbUrl + '/profile.json?auth=' + token;
   //var data = JSON.stringify(group);
   //$.post(url, data, function(res){
    //  $tr.attr('data-uuid', res.name);
    //  $tbody.append($tr);
   //});
   evt.preventDefault();
 });
