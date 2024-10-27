

$(document).ready(function() {
    const slideWidth = $('.carousel-item').outerWidth(true); // Lebar satu slide
    const totalSlides = $('.carousel-item').length;

    // Gandakan seluruh konten carousel untuk efek loop
    $('.carousel-slide').append($('.carousel-slide').html());

    let currentPosition = 0;

    function moveCarousel() {
        currentPosition -= slideWidth;

        // Saat mencapai akhir, reset posisi ke awal untuk loop seamless
        $('.carousel-slide').css('transition', 'transform 0.5s ease');
        $('.carousel-slide').css('transform', `translateX(${currentPosition}px)`);

        // Jika sudah sampai ujung konten asli, reset ke posisi awal tanpa animasi
        if (Math.abs(currentPosition) >= slideWidth * totalSlides) {
            setTimeout(() => {
                $('.carousel-slide').css('transition', 'none');
                currentPosition = 0;
                $('.carousel-slide').css('transform', `translateX(${currentPosition}px)`);
            }, 500); // Waktu disesuaikan dengan durasi transisi
        }
    }

    // Set interval untuk perpindahan otomatis setiap 3 detik
    setInterval(moveCarousel, 2000);

});

