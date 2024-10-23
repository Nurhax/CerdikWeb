arrTitle = [];
arrDesk = [];


$(document).ready(function () {
    loadJSON();
});

function loadJSON() {
<<<<<<< HEAD
    $.getJSON('Scripts/tentangObat.json', function (data) {
=======
    $.getJSON('tentangObat.json', function (data) {
>>>>>>> main
        for (var i in data["informasiObat"]) {
            arrTitle.push(data["informasiObat"][i]["title"]);
            arrDesk.push(data["informasiObat"][i]["deskripsi"]);
        }
    });
}

// Function to show popup based on card index
function showPopup(index) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");

    // Set popup content using the clicked card index
    popupText.innerText = `${arrTitle[index]}\n\n${arrDesk[index]}`;
    popup.style.display = "block"; // Show the popup
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
