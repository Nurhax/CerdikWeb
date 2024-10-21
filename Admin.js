var Username;
var Password;
var isRegistered = false;
var arrUser = [];
var arrPass = [];
function HideLogin(){
    Username = $("#Username").val();
    Password = $("#Password").val();
    for(var i = 0; i < arrUser.length; i++){
        console.log(arrUser[i], arrPass[i]);
        console.log(Username, Password)
        if(arrUser[i] == Username && arrPass[i] == Password){
            isRegistered = true;

        }
    }

    if(!isRegistered){
        alert("PASSWORD DAN USERNAME SALAH!");
    }else{
        alert("Login Berhasil!");
        window.location = 'CRUDMenu.html';
    }
}

$(document).ready(function(){
    loadJSON();
})


function loadJSON(){
    $.getJSON('Admin.json', function(data){
        for(var i in data["AdminAccount"]){
            arrUser.push(data["AdminAccount"][i]["username"]);
            arrPass.push(data["AdminAccount"][i]["password"]);
        }
        
    });
}

function redirectToLogin(){
    window.location = 'LoginAdmin.html';
    alert("Logout!");
}

