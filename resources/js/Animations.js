export default class Animations{
    constructor(numberOftestimonials, testimonialsContainer, testimonials, testimonialVideos, delay) {
        this.interval = null;
        this.minimized = false;
        this.minimizedByUser = false;
        this.closed = false;
        this.numberOftestimonials = numberOftestimonials;
        this.testimonialsContainer = testimonialsContainer;
        this.testimonials = testimonials;
        this.testimonialVideos = testimonialVideos;
        this.intervalDelay = delay;
    };

    intervalFunction() {
        this.testimonials = $('.video-testimonial');
        this.testimonialVideos = $(".testimonial-video");
        
        $(this.testimonialVideos).each((index, element) => {
            if (index == 1) {
                element.play();
            } else {
                setTimeout(() => {
                    element.pause();
                    element.currentTime = 0;
                }, 2000)
            }
        });

        $(this.testimonials).first().stop().animate({
            top: "400px"
        }, {
            duration: 1000,
            queue: false,
            progress: (animation, progress, remainingMs) => {
                if (remainingMs <= 200) {
                    $(this.testimonials).each((index, element) => {
                        $(element).removeClass(`z-ind-${index+1}`).addClass(`z-ind-${index == 0 ? this.numberOftestimonials : index}`);
                    });
                }
                if (remainingMs <= 800) {
                    $(this.testimonials).each((index, element) => {
                        $(element).removeClass(`tab-${index+1}`).addClass(`tab-${index == 0 ? this.numberOftestimonials : index}`);
                    });
                }
            },
            done: () => {
                let fromTop = "20px";
                if (this.numberOftestimonials == 2) {
                    fromTop = "10px"
                }
                $(this.testimonials).first().animate({
                    top: fromTop
                }, {
                    duration: 1000,
                    done: () => {
                        $(this.testimonials).each((index, element) => {
                            $(element).removeAttr("style");
                        });
                    }
                });

                
                $(this.testimonials).first().insertAfter($(this.testimonials).last());
            }
        });
        $(this.testimonials).eq(1).stop().animate({
            top: "0px"
        }, {
            duration: 1000,
            queue: false,
            done: function() {
                $(this.testimonials).each((index, element) => {
                    $(element).removeAttr("style");
                });
            }
        })
    };

    intervalFunctionMinimized() {
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

        $(this.testimonialsContainer).first().stop().animate({
            bottom: "-150px"
        }, {
            duration: 1000,
            done: () => {
                $(testimonialsMin).first().removeClass("visible");
                if (this.numberOftestimonials > 2) {
                    $(testimonialsMin).eq(1).addClass("visible");
                } else {
                    $(testimonialsMin).last().addClass("visible");
                }
                $(this.testimonialsContainer).first().animate({
                    bottom: "0px"
                }, {
                    duration: 1000,
                    done: () => {
                        $(this.testimonials).first().insertAfter($(this.testimonials).last());
                        $(testimonialsMin).first().insertAfter($(testimonialsMin).last());
                        $(this.testimonialsContainer).removeAttr("style");
                    }
                })
            }
        });
    };

    minimize() {
        clearInterval(this.interval);
        console.log("minimize");
        console.log(this.testimonialsContainer)
        $(this.testimonialsContainer).stop().animate({
            bottom: "-400px"
        }, {
            duration: 500,
            done: () => {
                $(this.testimonialsContainer).addClass("minimized");
                this.minimized = true;
                $(this.testimonialsContainer).animate({
                    bottom: "0px"
                }, {
                    duration: 1000,
                    done: () => {
                        this.changeInterval(this.intervalFunctionMinimized);
                    }
                });
            }
        });
    };

    maximize() {
        clearInterval(this.interval);
        $(this.testimonialsContainer).stop().animate({
            bottom: "-400px"
        }, {
            duration: 1000,
            done: () => {
                $(this.testimonialsContainer).removeClass("minimized");
                this.minimized = false;
                $(this.testimonialsContainer).animate({
                    bottom: "50px"
                }, {
                    duration: 500,
                    done: () => {
                        this.changeInterval(this.intervalFunction);
                    }
                });
            }
        });
    };

    closeTestemonials() {
        this.closed = true;
        $(this.testimonialsContainer).stop().animate({
            bottom: "-400px"
        }, {
            duration: 500,
            done: () => {
                $(this.testimonialsContainer).css("display", "none");
            }
        });
    };

    changeInterval(intervalFunc) {
        if (this.numberOftestimonials > 1 && !this.closed) {
            this.interval = setInterval(intervalFunc.bind(this), this.intervalDelay);
        }
    };

    setInterval(intervalFunc, intervalDelay) {
        this.interval = setInterval(intervalFunc.bind(this), intervalDelay);
    }

    clearInterval() {
        clearInterval(this.interval);
    };

    set minimized(value) {
        this._minimized = value;
    }

}