import axios from 'axios';

$.fn.exists = function () {
    return this.length !== 0;
};

const VIDEO_TESTEMONIALS_BASE_URL = "http://example.com/video-testimonials";
const VIDEO_TESTEMONIALS_LIST_URL = "http://example.com/all-video-testimonials";

$(() => {

    const homePage = $('#home-page');
    const categoryPage = $('#category-page');
    const postPage = $('#post-page');
    const testemonialsPage = $('#all-testemonials');

    const numberOfTestemonials = $('.video-testemonial').length;

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
    if (categoryPage.exists() || postPage.exists() && numberOfTestemonials > 0) {
        let interval;
        const intervalDelay = 5000;
        let isIntervalRunning = false;

        if (numberOfTestemonials > 1) {
            $(window).focus(() => {
                clearInterval(interval);
                if (!isIntervalRunning) {
                    interval = setInterval(intervalFunction, intervalDelay);
                }
            }).blur(() => {
                clearInterval(interval);
                isIntervalRunning = false;
            }).ready(() => {
                clearInterval(interval);
                if (!isIntervalRunning) {
                    interval = setInterval(intervalFunction, intervalDelay);
                }
            })
        }

        const intervalFunction = () => {
            isIntervalRunning = true;
            const testemonials = $('.video-testemonial');
            const testemonialVideos = $(".testemonial-video");

            $(testemonialVideos).each((index, element) => {
                if (index == 1) {
                    element.play();
                } else {
                    setTimeout(() => {
                        element.pause();
                        element.currentTime = 0;
                    }, 2000)
                }
            })

            $(testemonials).first().animate({
                top: "400px"
            }, {
                duration: 1000,
                queue: false,
                progress: (animation, progress, remainingMs) => {
                    if (remainingMs <= 200) {
                        $(testemonials).each((index, element) => {
                            $(element).removeClass(`z-ind-${index+1}`).addClass(`z-ind-${index == 0 ? numberOfTestemonials : index}`);
                        });
                    }
                    if (remainingMs <= 800) {
                        $(testemonials).each((index, element) => {
                            $(element).removeClass(`tab-${index+1}`).addClass(`tab-${index == 0 ? numberOfTestemonials : index}`);
                        });
                    }
                },
                done: function() {
                    let fromTop = "20px";
                    if (numberOfTestemonials == 2) {
                        fromTop = "10px"
                    }      
                    $(this).animate({
                        top: fromTop
                    }, {
                        duration: 1000,
                        done: function() {
                            $(testemonials).each((index, element) => {
                                $(element).removeAttr("style");
                            });
                        }
                    })
                    $(testemonials).first().insertAfter($(testemonials).last());
                }
            })
            $(testemonials).eq(1).animate({
                top: "0px"
            }, {
                duration: 1000,
                queue: false,
                done: function() {
                    $(testemonials).each((index, element) => {
                        $(element).removeAttr("style");
                    });
                }
            })
        };

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
                setTimeout(() => {
                    videos[index].pause();
                    videos[index].currentTime = 0;
                }, 400)
            })
        });

        $(window).on("click", (event) => {
            modals.each((index, element) => {
                if (event.target == element) {
                    $(element).addClass("out");
                    setTimeout(() => {
                        videos[index].pause();
                        videos[index].currentTime = 0;
                    }, 400)
                }
            })
        })
    }
    if (testemonialsPage.exists()) {

        const filters = $(".filters");
        const testemonialsList = $(".list-of-testemonials");
        let filterList = [];

        window.onpopstate = () => {
            location.reload();
        };

        $(filters).on("click", ".input", (event) => {
            if (event.target.checked) {
                filterList.push($(event.target).val());
                handleFilterChange(filterList);
            } else {
                filterList.splice(filterList.indexOf($(event.target).val()), 1);
                handleFilterChange(filterList);
            }
        });

        const handleFilterChange = (filterList) => {
            filter(filterList).then((data) => {
                $(testemonialsList).empty();
                data.video_testimonials.forEach((testemonial) => {
                    $(testemonialsList).append(makeTestemonialTemplate(testemonial));
                });
                $(filters).empty();
                Object.entries(data.categories_data).forEach((category) => {
                    $(filters).append(makeTestemonialFiltersTemplate(category, data.filter_categories));
                });
            });
        };

        const filter = (filterList) => {
            return axios.get(VIDEO_TESTEMONIALS_BASE_URL, {
                params: {
                    json: true,
                    categories: filterList
                }
            }).then((response) => {
                const url = axios.getUri({
                    url: VIDEO_TESTEMONIALS_LIST_URL, 
                    params: {
                        categories: filterList
                    }
                });
                const values = Object.values(response.data.filter_categories);
                window.history.pushState(values, "", url);
                return response.data
            }).catch((error) => {
                console.log(error);
            });
        };

        const makeTestemonialTemplate = ({author_name, author_surname, author_image, description, video}) => {
            return `
            <div class="video-testemonial">
                <p>${truncate(description, 35)}</p>
                <div class="video">
                    <video autoplay muted loop class="testemonial-video">
                        <source src="${video}">
                    </video>
                    <div class="buttons">
                        <button class="video-play-button"><i class="material-icons-two-tone">play_circle</i></button>
                    </div>
                    <div class="about">
                        <img src="${author_image}" alt="Author image" />
                        <div class="author-info">
                            <div class="name">
                                <span>Answered by:</span>
                                ${author_name}
                            </div>
                            <div class="job-title">Job title</div>
                        </div>
                    </div>
                </div>
            </div>
            `
        };

        const makeTestemonialFiltersTemplate = ([categoryId, categoryName], filterCategories) => {
            return `
                <input class="input" type="checkbox" id="${categoryName.toLowerCase()}" name="${categoryName.toLowerCase()}" value=${categoryId} ${filterCategories.includes(categoryId) && "checked"}>
                <label for="${categoryName.toLowerCase()}">${categoryName}</label><br>
            `
        };

        const truncate = (string, length) => {
            let trimmedString = "";
            if (string.length > trimmedString.length) {
                trimmedString = string.substr(0, length);

                trimmedString += string.substr(trimmedString.length, string.replace(trimmedString, "").indexOf(" ")) + "...";
            }
            return trimmedString;
        };
        
    }

})