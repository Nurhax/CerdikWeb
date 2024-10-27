arrTitle = [];
arrDesk = [];
const moreCards = [
    { img: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1727146858/attached_image/obat-batuk-tablet-yang-ampuh-3-alodokter.jpg", name: "OBAT BROCHIFAR" },
    { img: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2024/04/02023717/Methylprednisolone-8-mg-10-Tablet.jpg", name: "OBAT METHYLPREDNISOLONE" },
    { img: "https://d3bbrrd0qs69m4.cloudfront.net/images/product/apotek_online_k24klik_20230321033237359225_OMEPRAZOLE.png", name: "OBAT OMEPRAZOLE" },
    { img: "https://res-5.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_500,w_500/v1/production/pharmacy/products/1660812039_coxiron_60_mg_10_tablet", name: "OBAT COXIRON" },
];

$(document).ready(function () {
    loadJSON();
});

function loadJSON() {
    $.getJSON('Scripts/tentangObat.json', function (data) {
        for (var i in data["informasiObat"]) {
            arrTitle.push(data["informasiObat"][i]["title"]);
            arrDesk.push(data["informasiObat"][i]["deskripsi"]);
        }
    });
}

// untuk menampilkan popup berdasarkan indeks card
function showPopup(index) {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupText = document.getElementById("popup-text");

    // Mengatur isi dari popup dengan memanggil title dan deskripsi
    popupTitle.innerText = `${arrTitle[index]}`;
    popupText.innerText = `\n${arrDesk[index]}`;
    popup.style.display = "block"; // Menampilkan popup
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

//menambahkan card box 
let currentIndex = 0;
    const cardsPerPage = 4;

    function loadMoreCards() {
        const grid = document.querySelector(".column-grid");

        // Memuat untuk card berikutnya
        for (let i = 0; i < cardsPerPage && currentIndex < moreCards.length; i++, currentIndex++) {
            const cardData = moreCards[currentIndex];
            
            // Membuat elemet pada Card card
            const card = document.createElement("div");
            card.className = `card c${currentIndex + 8}`;
            card.setAttribute("onclick", `showPopup(${currentIndex + 8})`);

            const img = document.createElement("img");
            img.src = cardData.img;
            img.alt = "Gambar Obat";

            const cardName = document.createElement("div");
            cardName.className = "card-name";
            cardName.textContent = cardData.name;

            // untuk menambahkan elemen pada card
            card.appendChild(img);
            card.appendChild(cardName);

            //Menambahkan card pada column grid
            grid.appendChild(card);
        }

        // Menyembunyikan button memuat ketika sudah di klik
        if (currentIndex >= moreCards.length) {
            document.querySelector(".button-action").style.display = "none";
        }
    }

    //Untuk memanggil function loadMoreCard agar dapat menambahkan pada card
    document.querySelector(".button-action button").addEventListener("click", loadMoreCards);
