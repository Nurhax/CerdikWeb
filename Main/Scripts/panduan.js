arrTitle = [];
arrContent = [];


$(document).ready(function(){
    loadJSON();
});

function loadJSON(){
    $.getJSON('Scripts/panduan.json', function(data){
        for(var i in data["Kategori"]){
            arrTitle.push(data["Kategori"][i]["title"]);
            arrContent.push(data["Kategori"][i]["content"]);
        }
    });
}

function showPopup(index) {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupText = document.getElementById("popup-text");

    // Set popup content using the clicked card index
    popupTitle.innerText = `${arrTitle[index]}`;
    popupText.innerText = `\n\n${arrContent[index]}`;
    popup.style.display = "block"; // Show the popup
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}