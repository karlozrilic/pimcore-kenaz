import Animations from './Animations';

const videoTestimonialsAnimation = (numberOftestimonials) => {
    /*
    let interval;
    let minimized = false;
    let minimizedByUser = false;
    let closed = false;
    */
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

    const animationSettings = {
        numberOftestimonials: numberOftestimonials, 
        container: testimonialsContainer, 
        testimonials: testimonials, 
        videos: testimonialVideos, 
        delay: intervalDelay
    };

    const animations = new Animations(animationSettings);

    if ($(window).width() <= 960) {
        $(maximizeTestimonials).css("display", "none");
        if (!animations.minimized) {
            $(testimonialsContainer).addClass("minimized");
            animations.setMinimized = true;
            animations.clearInterval();
            animations.setInterval(animations.intervalFunctionMinimized);
            /*
            minimized = true;
            clearInterval(interval);
            interval = setInterval(intervalFunctionMinimized, intervalDelay);
            */
        }
    }

    $(window).resize(() => {
        testimonials = $('.video-testimonial');
        testimonialVideos = $(".testimonial-video");
        if ($(window).width() <= 960) {
            $(maximizeTestimonials).css("display", "none");
            if (!animations.minimized && !animations.closed) {
                animations.minimize();
            }
        } else {
            $(maximizeTestimonials).removeAttr("style");
            if (animations.minimized && !animations.minimizedByUser && !animations.closed) {
                animations.maximize();
            }
        }
    }).focus(() => {
        animations.clearInterval();
        if (numberOftestimonials > 1 && !animations.closed) {
            (animations.minimized ? animations.setInterval(animations.intervalFunctionMinimized) : animations.setInterval(animations.intervalFunction));
            //interval = minimized ? setInterval(intervalFunctionMinimized, intervalDelay) : setInterval(intervalFunction, intervalDelay);
        }
    }).blur(() => {
        animations.clearInterval();
    }).ready(() => {
        animations.clearInterval();
        if (numberOftestimonials > 1 && !animations.closed) {
            (animations.minimized ? animations.setInterval(animations.intervalFunctionMinimized) : animations.setInterval(animations.intervalFunction));
            //interval = minimized ? setInterval(intervalFunctionMinimized, intervalDelay) : setInterval(intervalFunction, intervalDelay);
        }
    });

    /*
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
                if (remainingMs <= 200) {
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
                    $(testimonialsMin).last().addClass("visible");
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
                        changeInterval(intervalFunctionMinimized);
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
                        changeInterval(intervalFunction);
                    }
                });
            }
        });
    };

    const closeTestemonials = () => {
        closed = true;
        $(testimonialsContainer).stop().animate({
            bottom: "-400px"
        }, {
            duration: 500,
            done: () => {
                $(testimonialsContainer).css("display", "none");
            }
        });
    };

    const changeInterval = (intervalFunc) => {
        if (numberOftestimonials > 1 && !closed) {
            interval = setInterval(intervalFunc, intervalDelay);
        }
    };
    */

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
            animations.minimizedByUser = true;
            animations.minimize();
        });
    });

    maximizeTestimonials.each((index, element) => {
        $(element).on("click", () => {
            animations.minimizedByUser = false;
            animations.maximize();
        });
    })

    closeTestimonials.each((index, element) => {
        $(element).on("click", () => {
            animations.closeTestemonials();
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

export default videoTestimonialsAnimation;