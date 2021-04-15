export default class Animations{
    constructor({numberOftestimonials, container, testimonials, videos, delay}) {
        this.interval;
        this.minimized = false;
        this.minimizedByUser = false;
        this.closed = false;
        this.numberOftestimonials = numberOftestimonials;
        this.container = container;
        this.testimonials = testimonials;
        this.videos = videos;
        this.delay = delay;
    };

    intervalFunction() {
        this.testimonials = $('.video-testimonial');
        this.videos = $(".testimonial-video");
        
        $(this.videos).each((index, element) => {
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

        $(this.container).first().stop().animate({
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
                $(this.container).first().animate({
                    bottom: "0px"
                }, {
                    duration: 1000,
                    done: () => {
                        $(testimonialsMin).first().insertAfter($(testimonialsMin).last());
                        $(this.container).removeAttr("style");
                    }
                });
            }
        });
    };

    minimize() {
        clearInterval(this.interval);
        $(this.container).stop().animate({
            bottom: "-400px"
        }, {
            duration: 500,
            done: () => {
                $(this.container).addClass("minimized");
                this.minimized = true;
                $(this.container).stop().animate({
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
        $(this.container).stop().animate({
            bottom: "-400px"
        }, {
            duration: 1000,
            done: () => {
                $(this.container).removeClass("minimized");
                this.minimized = false;
                $(this.container).stop().animate({
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
        $(this.container).stop().animate({
            bottom: "-400px"
        }, {
            duration: 500,
            done: () => {
                $(this.container).css("display", "none");
            }
        });
    };

    changeInterval(intervalFunc) {
        if (this.numberOftestimonials > 1 && !this.closed) {
            this.interval = setInterval(intervalFunc.bind(this), this.delay);
        }
    };

    setInterval(intervalFunc) {
        this.interval = setInterval(intervalFunc.bind(this), this.delay);
    }

    clearInterval() {
        clearInterval(this.interval);
    };

    set setMinimized(value) {
        this.minimized = value;
    }

}