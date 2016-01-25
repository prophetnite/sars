$(document).ready(function(){
    var username,password;
    $("#submit").click(function(){
        username=$("#username").val();
        password=$("#password").val();
        /*
        * Perform some validation here.
        */
        $.post("/api/authenticate",{name:username,password:password,apitype:"web"},function(data){
            //console.log(data);                                                                              // #DEBUG QRZ
            data = JSON.parse(JSON.stringify(data));
            //console.log(data.success);                                                                      // #DEBUG QRZ
            if(data.success==='true')
            {
                //console.log("passed")                                                                       // #DEBUG QRZ
                window.location.href="dashboard";
            }
        });
    });
    $('.login').keypress(function(event) {
        if (event.which == '13' && !event.shiftKey) {
            $("#submit").click();
        }
    });
});
