function checkPass()
{
    //Store the password field objects into variables ...
		password=$("#password").val();
		password2=$("#password2").val();
    //Store the Confimation Message Object ...
    var message = document.getElementById('messagePassword2');
		var message2 = document.getElementById('messagePassword');
      //Compare the values in the password field
    //and the confirmation field
		console.log(password + ' ' + password2);
		if (password.length == 0 || password2.length == 0) {
			$("#password").removeClass("alert-success");
			$("#password").removeClass("alert-danger");
			$("#password2").removeClass("alert-success");
			$("#password2").removeClass("alert-danger");
			message.innerHTML = '';
			return;
		}
    else if(password == password2) {
				console.log("password match");
        //The passwords match.
        //Set the color to the good color and inform
        //the user that they have entered the correct password
      	$("#password").addClass("alert-success");
				$("#password2").removeClass("alert-danger");
				$("#password2").addClass("alert-success");
				message.style.color = "#66cc66";
        message.innerHTML = "Passwords Match!";
    }
		else if (password2.length <= password.length && password2 != password.substr(0, password2.length)) {
			console.log("Mistake typing the second password.");
			//The passwords do not match.
			//Set the color to the bad color and
			//notify the user.
			$("#password2").addClass("alert-danger");
			message.style.color = "#ff6666";
			message.innerHTML = "Passwords Do Not Match!";
		}
		else if (password.length <= password2.length && password != password2.substr(0, password.length)) {
				console.log("something else");
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
				$("#password2").addClass("alert-danger");
				message.style.color = "#ff6666";
				message.innerHTML = "Passwords Do Not Match!";
    }
		else {
			$("#password").removeClass("alert-success");
			$("#password").removeClass("alert-danger");
			$("#password2").removeClass("alert-success");
			$("#password2").removeClass("alert-danger");
			message.innerHTML = '';
		}
}

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

$(document).ready(function(){
    var username,password;
    $("#submit").click(function(){
        firstname=$("#firstname").val();
        lastname=$("#lastname").val();
        email=$("#email").val();
        password=$("#password").val();
				password2=$("#password2").val();

				if (!firstname || !lastname || !email || !password || !password2)
				{
					console.log("EMPTY FIELDS DETECTED");
				}

				if (isEmail(email) == false)
				{
					$("#email").addClass("alert-danger");
					var msg = document.getElementById('messageEmail');
					msg.style.color = "#ff6666";
					msg.innerHTML = "Invalid e-mail";
				}
        /*
        * Perform some validation here.
        */
        $.post("/api/register",{firstname:firstname,lastname:lastname, email:email, password:password},function(data){
            data = JSON.parse(JSON.stringify(data));
            console.log("Success: "); console.log(data.success);
            console.log("Message: "); console.log(data.message);

            if(data.success==true)
            {
                console.log("result acive");
								console.log("result acive");
                window.location.href="/login";
            }
        });
    });
});
