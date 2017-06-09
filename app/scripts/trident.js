(function ($) {
    
    $('#feature-list').on('slid.bs.carousel', function () {
        console.log(this);
    })

    $('#feature-list .slide-selector').on('mouseenter', function() {
        $('#feature-list').carousel(parseInt(this.dataset.slideTo));
    })

})($) 