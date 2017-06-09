(function ($) {

    function scrollToTab(selector) {
        setTimeout(() => {
            $('html,body').animate({
                scrollTop: $(selector).offset().top - 100
            }, 'slow');
        }, 250);

    }

    $('.carousel').bcSwipe({ threshold: 50 });
    
    $('#feature-list .slide-selector').on('mouseenter', function() {
        $('#feature-list').carousel(parseInt(this.dataset.slideTo));
    })

    $('a[href="#specs"]').click(function(e) {
        $('[href="#specs"]').tab('show')
        scrollToTab('#specs');
    })

    $(function () {
        if (!location.hash) return;

        var activeTab = $('[href="' + location.hash + '"]');
        activeTab && activeTab.tab('show');
        scrollToTab(location.hash);
    })

})($) 