/* shrink navbar on scroll */
$(window).scroll(function () {
    const navbar = $('nav.navbar');
    if ($(document).scrollTop() > navbar.height()) {
        navbar.addClass('scrolled');
    } else {
        navbar.removeClass('scrolled');
    }
});