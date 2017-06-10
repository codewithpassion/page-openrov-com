/* shrink navbar on scroll */
$(window).scroll(function () {
    const navbar = $('nav.navbar');
    if ($(document).scrollTop() > navbar.height()) {
        navbar.addClass('scrolled');
    } else {
        navbar.removeClass('scrolled');
    }
});

const heroSliders = $('.hero-slider');
if (heroSliders.length > 0) {

    heroSliders.slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: false,
        verticalSwiping: false,
        arrows: true,
        autoplay: document.location.hostname !== 'localhost',
        autoplaySpeed: 5000,
    });
}

$('.mfp-gallery').each(function() {
    $(this).magnificPopup({
        delegate: 'a', 
        type: 'image',
        gallery: {
            enabled: true, 
            preload: [0, 2], 
            navigateByImgClick: true
        }
    })
});
$('.mfp-gallery-zoom').each(function() {
    $(this).magnificPopup({
        delegate: 'a', 
        type: 'image',
        mainClass: 'mfp-with-zoom',
        gallery: {
            enabled: true, 
            preload: [0, 2], 
            navigateByImgClick: true
        },
        zoom: {
            enabled: true, 

            duration: 300,
            easing: 'ease-in-out', 

            opener: function (openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.parent().parent().find('img');
            }
        },        
    })
});

    