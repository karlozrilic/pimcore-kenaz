$.fn.exists = function () {
    return this.length !== 0;
}

$('.article-slider').slick({
    slide: '.artcle',
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('#article-slider-prev'),
    nextArrow: $('#article-slider-next')
});

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
})

$('.local-news-slider').slick({
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('#local-news-prev'),
    nextArrow: $('#local-news-next')
})