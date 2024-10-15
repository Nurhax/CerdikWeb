function HideLogin(){
    var Username = $("#Username").val();
    var Password = $("#Password").val();
    
    if(Username != "admin" && Password != "#123"){
        alert("PASSWORD DAN USERNAME SALAH!");
    }else{
        alert("Login Berhasil!");
        $(".SquareLogin").remove();
        $(".SquareMenu").removeAttr("hidden");
    }
}

function RedirectToMitra(){

}

function RedirectToObat(){
    
}