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
        const modal = $('#modal');
        const modalClose = $('#modal-close');
        const button = $('#open-modal');
        const video = $('#video');

        button.on("click", () => {
            modal.css("display", "block");
            modal.removeClass("out");
            video.get(0).play();
        });

        modalClose.on("click", () => {
            modal.addClass("out");
            video.get(0).pause();
            video.get(0).currentTime = 0;
        });

        $(window).on("click", (event) => {
            if (event.target == modal.get(0)) {
                modal.addClass("out");
                video.get(0).pause();
                video.get(0).currentTime = 0;
            }
        });
    }
})