var googleUser = {};
var startApp = function () {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '745501205386-1eib7vvmr41pa488m35bf2f9l88thd72.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            prompt: 'select_account',
            hosted_domain: 'kean.edu',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('signinBtn'));
    });
};

function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            var profile = googleUser.getBasicProfile();
            document.getElementById('name').innerText = "Signed in: " +
                profile.getName();

            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

            // The ID token you need to pass to your backend:
            var id_token = googleUser.getAuthResponse().id_token;
            //console.log("ID Token: " + id_token);
            //Send ID token to server
            /*
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function(){
                console.log('Signed in as: ' + xhr.responseText);
            };
            xhr.send('idtoken=' + id_token);
            */

            document.getElementById("signinBtn").style.display = "none";
            document.getElementById("signout").classList.add("d-block");
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    document.getElementById('name').innerText = "";
    document.getElementById("signinBtn").style.display = "block";
    document.getElementById("signout").classList.remove("d-block");
}