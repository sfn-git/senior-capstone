var googleUser = {};
    var startApp = function () {
        gapi.load('auth2', function () {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: '745501205386-1eib7vvmr41pa488m35bf2f9l88thd72.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                prompt: 'select_account',
                hosted_domain: 'kean.edu',
                //scope: 'additional_scope'
            });
            attachSignin(document.getElementById('signinBtn'));
        });
    };

    function attachSignin(element) {
        auth2.attachClickHandler(element, {},
            function (googleUser) {
                                
                // The ID token you need to pass to your backend:
                var id_token = googleUser.getAuthResponse().id_token;

                //Send ID token to server
                authenticate(id_token);

            }, function (error) {
                console.log(JSON.stringify(error, undefined, 2))
                alert("An error occured, please try to sign-in again");
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
        $.ajax({
            url: "/logout",
            type: "POST"
        })
    }

    function authenticate(id_token) {

        var clientData = {"idtoken": id_token};

        $.ajax({
            url: "/signin",
            type: "POST",
            data: clientData,
            success: (data)=>{
                if(data){
                    window.location.replace("/");
                }
            },
            error: ()=>{
                console.log("An error occured");
            }
        })
    }