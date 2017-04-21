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