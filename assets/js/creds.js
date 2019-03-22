/*
Project Name: Atlantis-X
Author: Jason M George
Website: http://www.atlantis-x.com
    ------------------------------------------------
			LOGIN FUNCTIONS CONTENT TABLE
    ------------------------------------------------

    <!-- ======== GLOBAL FUNCTIONS ============= -->
    1.1 Check For Login
    1.2 Get User Information
    1.3 Get Current URL

    <!-- ======== LOGIN FUNCTIONS ============== -->
    2.1 Log In
    2.2 Log Out
    2.3 Register
    2.4 Update User Information
	
*/


/* 1.1 Check For Login
------------------------------------------------- */
var checkForLogin = function() {

	var userObj = getUserInfo();
	var pg = getCurrUrl();

	if (userObj == null) {
		if (pg != 'login.html' && pg != 'register.html'){
			window.location.href = "login.html";
		}
	}
	else {
		if (pg == 'login.html' || pg == 'register.html'){
			window.location.href = "index.html";
		}
	}
    
};


/* 1.2 Get User Information
------------------------------------------------- */
var getUserInfo = function(){

	var sessionUserInfo = JSON.parse(window.sessionStorage.getItem("atlantisUser"));
	var localUserInfo = JSON.parse(window.localStorage.getItem("atlantisUser"));

	return sessionUserInfo || localUserInfo;

};


/* 1.3 Get Current URL
------------------------------------------------- */
var getCurrUrl = function (){

	var urlArr = window.location.href.split('/');
	return urlArr[urlArr.length - 1];

};


/* 2.1 Log In
------------------------------------------------- */
var logIn = function (){

	var email = $('#email').val();
    
    // Validate Password
    mongo.get('users', '{"email":"' + email + '"}', 'email', function(results){

        var pass = $('#pass').val();
        var userObj = results[0];
        userObj.rememberMe = $('#remember_me_checkbox').attr('data-checked') == 'true' ? 'localStorage' : 'sessionStorage';
        
        if(userObj.pass == pass){

        	// Update the User Info and Send the User to the Homepage
            updateUserInfo(userObj);
            window.location.href = "index.html";

        }
        else{

            // Wrong Password Notification
            $('#pass').parsley().addError('icorrectPassword', {message: 'Incorrect Password.', updateClass: true});
            $('#pass').effect('shake', {times:3,distance:10});
        }

    })

};


/* 2.2 Log Out
------------------------------------------------- */
var logOut = function (){

	window.sessionStorage.removeItem("atlantisUser");
	window.localStorage.removeItem("atlantisUser");
	window.location.href = "login.html";

};


/* 2.3 Register
------------------------------------------------- */
var register = function(){
    
    var userObj = {
        "_id": getRandomKey()
        , "name": $('#name').val()
        , "email": $('#email').val()
        , "pass": $('#pass').val()
        , "userImg": "_default.jpg"
        , "rememberMe": "sessionStorage"
        , "favObjects": []
        , "dashboardCount": 0
        , "reportCount": 0
        , "SQLCount": 0
    }
    
    // Check to see if Email Address is already in use : Write Registration to Mongo and Login
    mongo.get('users', '{"email":"' + userObj.email + '"}', 'email', function(results){
        
        if(results.length == 0){

            // Register the User Info and Send the User to the Homepage
            updateUserInfo(userObj);
            window.location.href = "index.html";
        }
        else{
            // Give them an Alert that they already have an account
            $('#email').parsley().addError('duplicateEmail', {message: 'Email Address is already Registered.', updateClass: true});
            $('#email').effect('shake', {times:3,distance:10});
        }

    })

};


/* 2.4 Update User Information
------------------------------------------------- */
var updateUserInfo = function(userObj){

	// First write to Mongo
	mongo.write('users', userObj._id, JSON.stringify(userObj), function(){})

	// Second write to session or local storage
	window[userObj.rememberMe].setItem('atlantisUser', JSON.stringify(userObj));
};

