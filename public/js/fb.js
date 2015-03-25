'use strict';

var FIREBASE_URL = 'https://whomowsthelawn.firebaseio.com',
              fb = new Firebase(FIREBASE_URL);

// $(document).ready(function () {
//   $newProfile.click(function() {
//     $form.show();
//     $addProfile.show();
//     $newProfile.hide();
//   });


if (fb.getAuth()) {
  // $('.login').remove();
  // $('.app').toggleClass('hidden');
  $('.test1').toggleClass('hidden');
  $('.test2').toggleClass('hidden');

  $.get(FIREBASE_URL + '/users/' + fb.getAuth().uid + '/profile.json', function(data){
    if(data !== null) {
      Object.keys(data).forEach(function(uuid) {
        addProfileToTable(uuid, data[uuid]);
        showPetDiv();
      });
    }
  });
}

$('.registerMe').click(function () {
  var $loginForm = $('.loginForm'),
      email      = $loginForm.find('[type="email"]').val(),
      pass       = $loginForm.find('[type="password"]').val(),
      data       = {email: email, password: pass};

  registerAndLogin(data, function (err, auth) {
    if (err) {
      $('.error').text(err);
    } else {
      //location.reload(true);
      $(location).attr('href','/public/index.html');
    }
  });
});

$('.getinthere').click(function(event){
  var $loginForm = $('.loginForm'),
      email      = $loginForm.find('[type="email"]').val(),
      pass       = $loginForm.find('[type="password"]').val(),
      data       = {email: email, password: pass};

  event.preventDefault();

  fb.authWithPassword(data, function(err, auth) {
    if (err) {
      $('.error').text(err);
    } else {
      //location.reload(true);
      $(location).attr('href','/public/index.html');
    }
  });
});

// This is the logout function. it appears to work just fine.
$('.logout').click(function (){
  fb.unauth();
  location.reload(true);
});

function registerAndLogin(obj, cb) {
  fb.createUser(obj, function(err) {
    if (!err) {
      fb.authWithPassword(obj, function (err, auth){
        if (!err) {
          cb(null, auth);
        } else {
          cb(err);
        }
      });
    } else {
      cb(err);
    }
  });
}