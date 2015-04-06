'use strict';

var FIREBASE_URL = 'https://whomowsthelawn.firebaseio.com',
              fb = new Firebase(FIREBASE_URL),
           token,
      usersFbUrl;


if (fb.getAuth()) {
  // $('.login').remove();
  // $('.app').toggleClass('hidden');
  $('.test1').toggleClass('hidden');
  $('.test2').toggleClass('hidden');

  usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';
  token = fb.getAuth().token;

  $.get(usersFbUrl + '/users/' + fb.getAuth().uid + '/profile.json', function(data){
    if(data !== null) {
      Object.keys(data).forEach(function(uuid) {
      });
    }
  });
}

//this is the register call from the button click.
//might need to rename this class a little better.
$('.registerMe').click(function () {
  var $loginForm = $('.loginForm'),
      email      = $loginForm.find('[type="email"]').val(),
      pass       = $loginForm.find('[type="password"]').val(),
      data       = {email: email, password: pass};

  registerAndLogin(data, function (err, auth) {
    if (err) {
      $('.error').text(err);
    } else {
      $(location).attr('href','/public/index.html');
    }
  });
});

// this function actually performs the register and login @ fb
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


//this is the login call from the button click.
//might need to rename this class a little better.
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
      $(location).attr('href','/public/index.html');
    }
  });
});



// This is the logout function. it appears to work just fine.
$('.logout').click(function (){
  fb.unauth();
  location.reload(true);
});
