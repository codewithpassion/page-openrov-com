
const videos = $('.video-container.mouseover-play');
videos
    .on('mouseover', function (ev) {
        $(this).addClass('play');
        let video = $(this).find('.card-video');
        $(this).find('.card-img').css('opacity', 0);
        video.css('opacity', 1);
        const videoElement = video.get(0);
        videoElement.play();

    })
    .on('mouseout', function (ev) {
        $(this).removeClass('play');
        let video = $(this).find('.card-video');
        video[0].pause();
    })
    

videos.append('<div class="video-fullscreen"><i class="fa fa-arrows-alt" aria-hidden="true"></i></div>')
videos.append('<div class="card-video-control"><span class="fa fa-play-circle-o play" aria-hidden="true"></span><span class="fa fa-pause-circle-o pause" aria-hidden="true"></span></div>');
videos.append('<div class="video-loading-indicator invisible"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>')

videos.find('.video-fullscreen').click(function() {
    $(this).parent().find('video').get(0).requestFullscreen();
})

videos.find('video').each((i,video) => {
    video.onwaiting = function () {
        $(video).parent().find('.video-loading-indicator').removeClass('invisible');
    };

    video.onplaying = function () {
        $(video).parent().find('.video-loading-indicator').addClass('invisible');
    }
})
