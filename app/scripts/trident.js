(function ($) {
    $('.carousel').bcSwipe({ threshold: 50 });
    
    $('#feature-list .slide-selector').on('mouseenter', function() {
        $('#feature-list').carousel(parseInt(this.dataset.slideTo));
    })

})($) 