$.fn.exists = function () {
    return this.length !== 0;
};

$(() => {
    const homePage = $('#home-page');
    const categoryPage = $('#category-page');
    const postPage = $('#post-page');

    const articleSliderConfig = {
        slide: '.artcle',
        autoplay: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#article-slider-prev'),
        nextArrow: $('#article-slider-next')
    }
    
    $('.btn-close').on('click', () => {
        $(".alert").alert('close');
    });

    if (homePage.exists()) {
        $('.article-slider').slick(articleSliderConfig);
        $('.news-carousel-slider').slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: $('#news-carousel-prev'),
            nextArrow: $('#news-carousel-next')
        });
        $('.editorials-slider').slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $('#editorials-prev'),
            nextArrow: $('#editorials-next')
        });
        $('.local-news-slider').slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $('#local-news-prev'),
            nextArrow: $('#local-news-next')
        });
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: $('#bottom-image-slider-prev'),
            nextArrow: $('#bottom-image-slider-next'),
            slide: '.slider-img'
        });
        $('.slider-nav').slick({
            infinite: false,
            slidesToShow: 7,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            arrows: false,
            autoplay: false,
            focusOnSelect: true
        });
    }
    if (categoryPage.exists()) {
        $('.article-slider').slick(articleSliderConfig);
    }
    if (categoryPage.exists() || postPage.exists()) {
        setInterval(() => {
            let testemonials = $('.video-testemonial');
            $(testemonials).eq(0).animate({
                top: "400px"
            }, {
                duration: 1000,
                queue: false,
                progress: (animation, progress, remainingMs) => {
                    if (remainingMs <= 200) {
                        $(testemonials).each((index, element) => {
                            $(element).removeClass(`z-ind-${index+1}`).addClass(`z-ind-${index == 0 ? 3 : index}`);
                        });
                    }
                    if (remainingMs <= 800) {
                        $(testemonials).each((index, element) => {
                            $(element).removeClass(`tab-${index+1}`).addClass(`tab-${index == 0 ? 3 : index}`);
                        });
                    }
                },
                done: function() {        
                    $(this).animate({
                        top: "20px"
                    }, {
                        duration: 1000,
                        done: function() {
                            $(testemonials).each((index, element) => {
                                $(element).removeAttr("style");
                            });
                        }
                    })
                    $(testemonials).eq(0).insertAfter($(testemonials).last());
                }
            })
            $(testemonials).eq(1).animate({
                top: "0px"
            }, {
                duration: 1000,
                queue: false,
                done: function() {
                    $(this).removeAttr("style");
                }
            })
        }, 5000)

        const modals = $(".video-testemonial-modal");
        const modalsClose = $(".modal-close");
        const openModals = $(".video-play-button");
        const videos = $(".modal-video");

        openModals.each((index, element) => {
            $(element).on("click", () => {
                $(modals[index]).css("display", "block");
                $(modals[index]).removeClass("out");
                videos[index].play();
            })
        });

        modalsClose.each((index, element) => {
            $(element).on("click", () => {
                $(modals[index]).addClass("out");
                videos[index].pause();
                videos[index].currentTime = 0;
            })
        });

        $(window).on("click", (event) => {
            modals.each((index, element) => {
                if (event.target == element) {
                    $(element).addClass("out");
                    videos[index].pause();
                    videos[index].currentTime = 0;
                }
            })
        })
    }
})