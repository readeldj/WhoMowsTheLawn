'use strict';

var FIREBASE_URL = 'https://whomowsthelawn.firebaseio.com',
              fb = new Firebase(FIREBASE_URL),
           $form = $('form');

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

   var url  = 'https://whomowsthelawn.firebaseio.com/users.json';
   var data = JSON.stringify(group);
   $.post(url, data, function(res){
    //  $tr.attr('data-uuid', res.name);
    //  $tbody.append($tr);
   });
   evt.preventDefault();
 });
