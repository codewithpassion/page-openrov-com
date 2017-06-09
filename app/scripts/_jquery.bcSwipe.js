/**
 * Bootstrap Carousel Swipe v1.1
 *
 * jQuery plugin to enable swipe gestures on Bootstrap 3 carousels.
 * Examples and documentation: https://github.com/maaaaark/bcSwipe
 *
 * Licensed under the MIT license.
 */
(function ($) {
    $.fn.bcSwipe = function (settings) {
        var config = { threshold: 50 };
        if (settings) {
            $.extend(config, settings);
        }

        this.each(function () {
            var stillMoving = false;
            var start;
            var self = this;

            if ('ontouchstart' in document.documentElement) {
                self.addEventListener('touchstart', onTouchStart, false);
            }

            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    start = e.touches[0].pageX;
                    stillMoving = true;
                    self.addEventListener('touchmove', onTouchMove, false);
                }
            }

            function onTouchMove(e) {
                if (stillMoving) {
                    var x = e.touches[0].pageX;
                    var difference = start - x;
                    if (Math.abs(difference) >= config.threshold) {
                        cancelTouch();
                        if (difference > 0) {
                            $(this).carousel('next');
                        }
                        else {
                            $(this).carousel('prev');
                        }
                    }
                }
            }

            function cancelTouch() {
                self.removeEventListener('touchmove', onTouchMove);
                start = null;
                stillMoving = false;
            }
        });

        return this;
    };
})(jQuery);