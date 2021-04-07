import axios from 'axios';

const VIDEO_TESTIMONIALS_BASE_URL =  window.location.origin + "/video-testimonials";
const VIDEO_TESTIMONIALS_LIST_URL = window.location.origin + "/all-video-testimonials";

const allVideoTestimonials = () => {
    
    const filters = $(".filters");
    const testimonialsList = $(".testimonials-list");
    const modalContainer = $(".testemonial-modals");
    const loading = $(".loading-container");
    const previewVideos = $(".testimonial-video source");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let filterList = urlParams.getAll('categories[]');
    let scrolledToBottom = false;
    let currentPage = 1;

    $(window).scroll(function () {
        if (($(testimonialsList).position().top + $(testimonialsList).outerHeight(true)) - $(this).height() <= $(this).scrollTop() && !scrolledToBottom) {
            currentPage += 1;
            handleFilterChange(filterList, currentPage, true);
            scrolledToBottom = true;
        }
    })
    .on("load", () => {
        $(previewVideos).each((index, element) => {
            const video_url = $(element).data("src");
            $(element).attr("src", video_url);
            const vid = element.parentElement;
            vid.load();
        });
    })
    .on("click", (event) => {
        $(".video-testimonial-modal").each((index, element) => {
            const videos = $(".modal-video");
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

    $(testimonialsList).on("mouseenter", ".video-testimonial", (event) => {
        $(event.currentTarget).find("video")[0].play();
    })
    .on("mouseleave", ".video-testimonial", (event) => {
        $(event.currentTarget).find("video")[0].pause();
        $(event.currentTarget).find("video")[0].currentTime = 0;
    })
    .on("click", ".video-play-button", (event) => {
        const index = $(event.currentTarget).data("open-index");
        const modal = $(modalContainer).find(`[data-index=${index}]`);
        const video = $(modalContainer).find(`[data-video-id=${index}]`);
        $(modal).css("display", "block");
        $(modal).removeClass("out");
        video.get(0).play();
    });

    window.onpopstate = () => {
        location.reload();
    };

    $(modalContainer).on("click", ".modal-close", (event) => {
        const index = $(event.currentTarget).data("close-index");
        const modal = $(modalContainer).find(`[data-index=${index}]`);
        const video = $(modalContainer).find(`[data-video-id=${index}]`).get(0);
        $(modal).addClass("out");
        video.muted = true;
        setTimeout(() => {
            video.pause();
            video.currentTime = 0;
            video.muted = false;
        }, 400);
    });
        
    $(filters).on("click", ".input", (event) => {
        currentPage = 1;
        if (event.currentTarget.checked) {
            filterList.push($(event.currentTarget).val());
            handleFilterChange(filterList);
        } else {
            filterList.splice(filterList.indexOf($(event.currentTarget).val()), 1);
            handleFilterChange(filterList);
        }
    });

    const handleFilterChange = (filterList, page = 1, infiniteScroll = false) => {
        filter(filterList, page).then((data) => {
            if (!infiniteScroll) {
                $(modalContainer).empty();
                $(testimonialsList).empty();
            }
            if (data.number_of_pages >= page) {
                data.video_testimonials.forEach((testimonial, index) => {
                    $(testimonialsList).append(maketestimonialTemplate(testimonial));
                    $(modalContainer).append(makeTestemonialModalTemplate(testimonial));
                });
            
                $(filters).empty();
                Object.entries(data.categories_data).forEach((category) => {
                    $(filters).append(maketestimonialFiltersTemplate(category, data.filter_categories));
                });
                scrolledToBottom = false;
            } else {
                $(loading).empty();
            }
        });
    };

    const filter = async (filterList, page = 1) => {
        const axiosOptions = {
            params: {
                json: true,
                categories: filterList,
                page: page
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
    };

    const maketestimonialTemplate = ({testimonial_id, author_name, author_image, author_job_position, description, video, categories, video_settings: { duration }}) => {
        return `
        <div class="video-testimonial">
            <p>${description.length > 35 ? truncate(description, 35) : description}</p>
            <div class="video">
                <video muted loop playsinline class="testimonial-video" id=${testimonial_id}>
                    <source src="${video}">
                </video>
                <div class="duration">
                    ${secondsToMinutes(Math.floor(duration))}
                </div>
                <div class="buttons">
                    <button class="video-play-button" data-open-index=${testimonial_id}>
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

    const makeTestemonialModalTemplate = ({testimonial_id, author_name, author_surname, author_image, author_job_position, description, video, categories, is_video_vertical}) => {
        return `
            <div class="video-testimonial-modal out" data-index=${testimonial_id}>
                <div class="modal-content ${is_video_vertical ? "height" : "width" }">
                    <button class="close modal-close" data-close-index=${testimonial_id}><i class="material-icons">close</i></button>
                    <h3 class="description">
                        ${description}
                    </h3>
                    <div class="content">
                        <video controls disablepictureinpicture controlsList="nodownload" class="modal-video" data-video-id=${testimonial_id}>
                            <source src="${video}">
                        </video>
                    </div>
                    <div class="author">
                        <img src="${author_image}" alt="Author image" />
                        <div class="author-info">
                            <div class="name">
                                ${author_name}
                                ${author_surname ? author_surname : ""}
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
    };

    const truncate = (string, length) => {
        let trimmedString = "";
        if (string.length > trimmedString.length) {
            trimmedString = string.substr(0, length);
            const spaceIndex = string.replace(trimmedString, "").indexOf(" ");

            if (spaceIndex < 0) {
                trimmedString = string;
            } else {
                trimmedString += string.substr(trimmedString.length, spaceIndex) + "...";
            }

        }
        return trimmedString;
    };

    const secondsToMinutes = (seconds) => {
        seconds = Number(seconds);
        
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 3600 % 60);
        
        return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    };
};

export default allVideoTestimonials;