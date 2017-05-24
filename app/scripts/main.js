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
        arrows: false,
        autoplay: document.location.hostname !== 'localhost',
        autoplaySpeed: 5000,
    });
}

$('.mfp-gallery').each(function() {
    $(this).magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery: {
            enabled: true, // set to true to enable gallery
            preload: [0, 2], // read about this option in next Lazy-loading section
            navigateByImgClick: true
        }
    })
});
$('.mfp-gallery-zoom').each(function() {
    $(this).magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        mainClass: 'mfp-with-zoom',
        gallery: {
            enabled: true, // set to true to enable gallery
            preload: [0, 2], // read about this option in next Lazy-loading section
            navigateByImgClick: true
        },
        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function (openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.parent().parent().find('img');
            }
        },        
    })
});