import axios from 'axios';

$.fn.exists = function () {
    return this.length !== 0;
};

const VIDEO_TESTIMONIALS_BASE_URL = "http://example.com/video-testimonials";
const VIDEO_TESTIMONIALS_LIST_URL = "http://example.com/all-video-testimonials";

$(() => {

    const homePage = $('#home-page');
    const categoryPage = $('#category-page');
    const postPage = $('#post-page');
    const testimonialsPage = $('#all-testimonials');

    const numberOftestimonials = $('.video-testimonial').length;

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
    if (categoryPage.exists() || postPage.exists() && numberOftestimonials > 0) {
        let interval;
        let minimized = false;
        let minimisedByUser = false;
        const intervalDelay = 5000;
        const testimonialsContainer = $(".testimonials");

        const modals = $(".video-testimonial-modal");
        const modalsClose = $(".modal-close");
        const openModals = $(".video-play-button");
        const openModalsMin = $(".video-play-button-minimized")
        const videos = $(".modal-video");
        const minimizeTestimonials = $(".minimize-testimonial");
        const maximizeTestimonials = $(".maximize-testimonial");
        const closeTestimonials = $(".close-testimonial");

        let testimonials = $('.video-testimonial');
        let testimonialVideos = $(".testimonial-video");

        if ($(window).width() <= 960) {
            $(maximizeTestimonials).css("display", "none");
            if (!minimized) {
                $(testimonialsContainer).addClass("minimized");
                minimized = true;
                clearInterval(interval);
                interval = setInterval(intervalFunctionMinimized, intervalDelay);
            }
        }

        /*
        setInterval(() => {
            console.log(minimized)
        }, 1000)
        */

        $(window).resize(() => {
            testimonials = $('.video-testimonial');
            testimonialVideos = $(".testimonial-video");
            if ($(window).width() <= 960) {
                $(maximizeTestimonials).css("display", "none");
                if (!minimized) {
                    minimize();
                }
            } else {
                $(maximizeTestimonials).removeAttr("style");
                if (minimized && !minimisedByUser) {
                    maximize();
                }
            }
        });

        $(window).focus(() => {
            clearInterval(interval);
            if (numberOftestimonials > 1) {
                interval = minimized ? setInterval(intervalFunctionMinimized, intervalDelay) : setInterval(intervalFunction, intervalDelay);
            }
        }).blur(() => {
            clearInterval(interval);
        }).ready(() => {
            clearInterval(interval);
            if (numberOftestimonials > 1) {
                interval = minimized ? setInterval(intervalFunctionMinimized, intervalDelay) : setInterval(intervalFunction, intervalDelay);
            }
        })

        const intervalFunction = () => {
            testimonials = $('.video-testimonial');
            testimonialVideos = $(".testimonial-video");
            
            $(testimonialVideos).each((index, element) => {
                if (index == 1) {
                    element.play();
                } else {
                    setTimeout(() => {
                        element.pause();
                        element.currentTime = 0;
                    }, 2000)
                }
            });

            $(testimonials).first().stop().animate({
                top: "400px"
            }, {
                duration: 1000,
                queue: false,
                progress: (animation, progress, remainingMs) => {
                    if (remainingMs <= 150) {
                        $(testimonials).each((index, element) => {
                            $(element).removeClass(`z-ind-${index+1}`).addClass(`z-ind-${index == 0 ? numberOftestimonials : index}`);
                        });
                    }
                    if (remainingMs <= 800) {
                        $(testimonials).each((index, element) => {
                            $(element).removeClass(`tab-${index+1}`).addClass(`tab-${index == 0 ? numberOftestimonials : index}`);
                        });
                    }
                },
                done: function() {
                    let fromTop = "20px";
                    if (numberOftestimonials == 2) {
                        fromTop = "10px"
                    }      
                    $(this).animate({
                        top: fromTop
                    }, {
                        duration: 1000,
                        done: function() {
                            $(testimonials).each((index, element) => {
                                $(element).removeAttr("style");
                            });
                        }
                    });

                    $(testimonialsMin).first().insertAfter($(testimonialsMin).last());

                    $(testimonials).first().insertAfter($(testimonials).last());
                }
            });
            $(testimonials).eq(1).stop().animate({
                top: "0px"
            }, {
                duration: 1000,
                queue: false,
                done: function() {
                    $(testimonials).each((index, element) => {
                        $(element).removeAttr("style");
                    });
                }
            })
        };

        const intervalFunctionMinimized = () => {
            const testimonialsMin = $('.video-testimonial-minimized');
            const testimonialVideosMin = $(".testimonial-video-minimized");
        
            $(testimonialVideosMin).each((index, element) => {
                if (index == 1) {
                    element.play();
                } else {
                    setTimeout(() => {
                        element.pause();
                        element.currentTime = 0;
                    }, 2000)
                }
            });

            $(testimonialsContainer).first().stop().animate({
                bottom: "-150px"
            }, {
                duration: 1000,
                done: () => {
                    $(testimonialsMin).first().removeClass("visible");
                    if (numberOftestimonials > 2) {
                        $(testimonialsMin).eq(1).addClass("visible");
                    } else {
                        $(testimonialsMin).elast().addClass("visible");
                    }
                    $(testimonialsContainer).first().animate({
                        bottom: "0px"
                    }, {
                        duration: 1000,
                        done: () => {
                            $(testimonials).first().insertAfter($(testimonials).last());

                            $(testimonialsMin).first().insertAfter($(testimonialsMin).last());
                            $(testimonialsContainer).removeAttr("style");
                        }
                    })
                }
            });
        };

        const minimize = () => {
            clearInterval(interval);
            $(testimonialsContainer).stop().animate({
                bottom: "-400px"
            }, {
                duration: 500,
                done: () => {
                    $(testimonialsContainer).addClass("minimized");
                    minimized = true;
                    $(testimonialsContainer).animate({
                        bottom: "0px"
                    }, {
                        duration: 1000,
                        done: () => {
                            interval = setInterval(intervalFunctionMinimized, intervalDelay);
                        }
                    });
                }
            });
        };

        const maximize = () => {
            clearInterval(interval);
            $(testimonialsContainer).stop().animate({
                bottom: "-400px"
            }, {
                duration: 1000,
                done: () => {
                    $(testimonialsContainer).removeClass("minimized");
                    minimized = false;
                    $(testimonialsContainer).animate({
                        bottom: "50px"
                    }, {
                        duration: 500,
                        done: () => {
                            interval = setInterval(intervalFunction, intervalDelay);
                        }
                    });
                }
            });
        };

        const closeTestemonials = () => {
            $(testimonialsContainer).stop().animate({
                bottom: "-400px"
            }, {
                duration: 500,
                done: () => {
                    $(testimonialsContainer).css("display", "none");
                }
            });
        };

        openModals.each((index, element) => {
            $(element).on("click", () => {
                $(modals[index]).css("display", "block");
                $(modals[index]).removeClass("out");
                videos[index].play();
            });
        });

        openModalsMin.each((index, element) => {
            $(element).on("click", () => {
                $(modals[index]).css("display", "block");
                $(modals[index]).removeClass("out");
                videos[index].play();
            });
        });

        minimizeTestimonials.each((index, element) => {
            $(element).on("click", () => {
                minimisedByUser = true;
                minimize();
            });
        });

        maximizeTestimonials.each((index, element) => {
            $(element).on("click", () => {
                minimisedByUser = false;
                maximize();
            });
        })

        closeTestimonials.each((index, element) => {
            $(element).on("click", () => {
                closeTestemonials();
            });
        });

        modalsClose.each((index, element) => {
            $(element).on("click", () => {
                $(modals[index]).addClass("out");
                videos[index].muted = true;
                setTimeout(() => {
                    videos[index].pause();
                    videos[index].currentTime = 0;
                    videos[index].muted = false;
                }, 400)
            });
        });

        $(window).on("click", (event) => {
            modals.each((index, element) => {
                if (event.target == element) {
                    $(element).addClass("out");
                    videos[index].muted = true;
                    setTimeout(() => {
                        videos[index].pause();
                        videos[index].currentTime = 0;
                        videos[index].muted = false;
                    }, 400)
                }
            });
        });
    }
    if (testimonialsPage.exists()) {

        const filters = $(".filters");
        /*const filters = $(".filters :input");*/
        const testimonialsList = $(".testimonials-list");
        let filterList = [];

        const modalContainer = $(".testemonial-modals");

        let modals = $(".video-testimonial-modal");
        let videos = $(".modal-video");

        $(document).on("dataChanged", () => {
            modals = $(".video-testimonial-modal");
            videos = $(".modal-video");
        });

        $(testimonialsList).on("click", ".video-play-button", (event) => {
            const index = $(event.currentTarget).data("open-index");
            $(modals[index]).css("display", "block");
            $(modals[index]).removeClass("out");
            videos[index].play();
        });

        /* Play testemonial video only on hover */
        $(testimonialsList).on("mouseenter", ".video-testimonial", (event) => {
            $(event.currentTarget).find("video")[0].play();
        });
        $(testimonialsList).on("mouseleave", ".video-testimonial", (event) => {
            $(event.currentTarget).find("video")[0].pause();
            $(event.currentTarget).find("video")[0].currentTime = 0;
        });

        $(modalContainer).on("click", ".modal-close", (event) => {
            const index = $(event.currentTarget).data("index");
            $(modals[index]).addClass("out");
            videos[index].muted = true;
            setTimeout(() => {
                videos[index].pause();
                videos[index].currentTime = 0;
                videos[index].muted = false;
            }, 400);
        });

        $(window).on("click", (event) => {
            $(".video-testimonial-modal").each((index, element) => {
                if (event.target == element) {
                    $(element).addClass("out");
                    videos[index].muted = true;
                    setTimeout(() => {
                        videos[index].pause();
                        videos[index].currentTime = 0;
                        videos[index].muted = false;
                    }, 400);
                }
            });
        });

        window.onpopstate = () => {
            location.reload();
        };

        /*
        $(filters).click((event) => {
            if (event.target.checked) {
                filterList.push($(event.target).val());
                handleFilterChange(filterList);
            } else {
                filterList.splice(filterList.indexOf($(event.target).val()), 1);
                handleFilterChange(filterList);
            }
        })
        */
        
        $(filters).on("click", ".input", (event) => {
            if (event.currentTarget.checked) {
                filterList.push($(event.currentTarget).val());
                handleFilterChange(filterList);
            } else {
                filterList.splice(filterList.indexOf($(event.currentTarget).val()), 1);
                handleFilterChange(filterList);
            }
        });

        const handleFilterChange = (filterList) => {
            filter(filterList).then((data) => {
                $(modalContainer).empty();
                $(testimonialsList).empty();
                data.video_testimonials.forEach((testimonial, index) => {
                    $(testimonialsList).append(maketestimonialTemplate(testimonial, index));
                    $(modalContainer).append(makeTestemonialModalTemplate(testimonial, index));
                });

                /*
                $(filters).each((index, filter) => {
                    const keysArray = Object.keys(data.categories_data);
                    if (keysArray.length === 0) {
                        $(filter).prop("disabled", false);
                    } else {
                        if (keysArray.includes($(filter).val())) {
                            $(filter).prop("disabled", false);
                        } else {
                            $(filter).prop("disabled", true);
                        }
                    }
                });
                */

                $(filters).empty();
                Object.entries(data.categories_data).forEach((category) => {
                    $(filters).append(maketestimonialFiltersTemplate(category, data.filter_categories));
                });
                $(document).trigger("dataChanged");
            });
        };

        const filter = async (filterList) => {
            const axiosOptions = {
                params: {
                    json: true,
                    categories: filterList
                }
            };
            try {
                const response = await axios.get(VIDEO_TESTIMONIALS_BASE_URL, axiosOptions);
                const data = await response.data;

                /* updating URL */
                const url = axios.getUri({
                    url: VIDEO_TESTIMONIALS_LIST_URL, 
                    params: {
                        categories: filterList
                    }
                });
                const values = Object.values(response.data.filter_categories);
                window.history.pushState(values, "", url);

                return data;
            } catch (error) {
                console.log(error);
            };
            /*
            return axios.get(VIDEO_TESTIMONIALS_BASE_URL, {
                params: {
                    json: true,
                    categories: filterList
                }
            }).then((response) => {
                const url = axios.getUri({
                    url: VIDEO_TESTIMONIALS_LIST_URL, 
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
            */
        };

        const maketestimonialTemplate = ({author_name, author_image, author_job_position, description, video, categories, video_settings: { duration }}, index) => {
            return `
            <div class="video-testimonial">
                <p>${truncate(description, 35)}</p>
                <div class="video">
                    <video muted loop class="testimonial-video">
                        <source src="${video}">
                    </video>
                    <div class="duration">
                        ${secondsToMinutes(Math.floor(duration))}
                    </div>
                    <div class="buttons">
                        <button class="video-play-button" data-open-index=${index}>
                            <span class="fa-stack" style="vertical-align: top;">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fal fa-play-circle fa-stack-1x"></i>
                            </span>
                        </button>
                    </div>
                    <div class="about">
                        <img src="${author_image}" alt="Author image" />
                        <div class="author-info">
                            <div class="name">
                                <span>Answered by:</span>
                                ${author_name}
                            </div>
                            <div class="job-title">${author_job_position}</div>
                        </div>
                    </div>
                </div>
                <ul class="testimonial-categories">
                    ${categories.map((category) => {
                        return `<li><a href="${category.link}">${category.title}</a></li>`;
                    }).join('')}
                </ul>
            </div>
            `
        };

        const makeTestemonialModalTemplate = ({author_name, author_surname, author_image, author_job_position, description, video, categories, is_video_vertical}, index) => {
            return `
                <div class="video-testimonial-modal out" data-index=${index}>
                    <div class="modal-content ${is_video_vertical ? "height" : "width" }">
                        <button class="close modal-close" data-index=${index}><i class="material-icons">close</i></button>
                        <h3 class="description">
                            ${description}
                        </h3>
                        <div class="content">
                            <video controls disablepictureinpicture controlsList="nodownload" class="modal-video">
                                <source src="${video}">
                            </video>
                        </div>
                        <div class="author">
                            <img src="${author_image}" alt="Author image" />
                            <div class="author-info">
                                <div class="name">
                                    ${author_name}
                                    ${author_surname}
                                </div>
                                <div class="job-title">${author_job_position}</div>
                            </div>
                        </div>
                        <div class="modal-tags">
                        ${categories.map((category) => {
                            return `<a class="tag-pill" href="${category.link}">${category.title}</a>`;
                        }).join('')}
                        </div>
                    </div>
                </div>
            `
        };

        const maketestimonialFiltersTemplate = ([categoryId, categoryName], filterCategories) => {
            return `
                <label class="checkbox">
                    <span class="checkbox-input">
                        <input class="input" type="checkbox" name="${categoryName.toLowerCase()}" id="${categoryName.toLowerCase()}" value=${categoryId} ${filterCategories.includes(categoryId) && "checked"}>
                        <span class="checkbox-control">
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                    </span>
                    <span class="radio-label">${categoryName}</span>
                </label>
            `
            /*
            return `
                <input class="input" type="checkbox" id="${categoryName.toLowerCase()}" name="${categoryName.toLowerCase()}" value=${categoryId} ${filterCategories.includes(categoryId) && "checked"}>
                <label for="${categoryName.toLowerCase()}">${categoryName}</label><br>
            `
            */
        };

        const truncate = (string, length) => {
            let trimmedString = "";
            if (string.length > trimmedString.length) {
                trimmedString = string.substr(0, length);

                trimmedString += string.substr(trimmedString.length, string.replace(trimmedString, "").indexOf(" ")) + "...";
            }
            return trimmedString;
        };

        const secondsToMinutes = (seconds) => {
            seconds = Number(seconds);
        
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 3600 % 60);
        
            return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
        }
        
    }

})