import { videoMkv } from '@cloudinary/base/qualifiers/format';
import axios from 'axios';

const VIDEO_TESTIMONIALS_BASE_URL = window.location.origin + "/video-testimonials";
const VIDEO_TESTIMONIALS_LIST_URL = window.location.origin + "/all-video-testimonials";

const allVideoTestimonials = () => {
    const filters = $(".filters");
    const pageButtons = $(".pages");
    /*const filters = $(".filters :input");*/
    const modalContainer = $(".testimonial-modals");
    const testimonialsList = $(".testimonials-list");

    const urlParams = new URLSearchParams(window.location.search);
    let filterList = urlParams.getAll('categories[]');

    $(testimonialsList).on("mouseenter", ".video-testimonial", (event) => {
        $(event.currentTarget).find("video")[0].play();
    }).on("mouseleave", ".video-testimonial", (event) => {
        $(event.currentTarget).find("video")[0].pause();
        $(event.currentTarget).find("video")[0].currentTime = 0;
    }).on("click", ".video-play-button", (event) => {
        const index = $(event.currentTarget).data("open-index");
        const modal = $(modalContainer).find(`[data-index=${index}]`);
        const video = $(modalContainer).find(`[data-video-id=${index}]`).get(0);
        $(modal).css("display", "block");
        $(modal).removeClass("out");
        video.play();
    })

    $(pageButtons).on("click", ".page-button", (event) => {
        const pageNumber = $(event.currentTarget).data("page-number");
        $(pageButtons).each((index, element) => {
            $(element).removeClass("active");
        });
        handleFilterChange(filterList, pageNumber);
    });

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

    $(window).on("click", (event) => {
        $(".video-testimonial-modal").each((index, element) => {
            if (event.target == element) {
                $(element).addClass("out");
                const index = $(element).data("index");
                const video = $(element).find(`[data-video-id=${index}]`).get(0);
                video.muted = true;
                setTimeout(() => {
                    video.pause();
                    video.currentTime = 0;
                    video.muted = false;
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

    const handleFilterChange = (filterList, page = 1) => {
        filter(filterList, page).then((data) => {
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

            $(pageButtons).empty();
            for (let el = 1; el <= data.number_of_pages; el++) {
                $(pageButtons).append(pageNumbersTemplate(el, page));
            }

            $(filters).empty();
            Object.entries(data.categories_data).forEach((category) => {
                $(filters).append(maketestimonialFiltersTemplate(category, data.filter_categories));
            });
            $(document).trigger("dataChanged");
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
                    categories: filterList,
                    page: page
                }
            });
            const values = Object.values(response.data.filter_categories);
            window.history.pushState(values, "", url);

            return data;
        } catch (error) {
            console.log(error);
        };
    };

    const maketestimonialTemplate = ({testimonial_id, author_name, author_image, author_job_position, description, video, categories, video_settings: { duration }}, index) => {
        return `
        <div class="video-testimonial">
            <p>${description.length > 35 ? truncate(description, 35) : description}</p>
            <div class="video">
                <video muted loop class="testimonial-video">
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

    const makeTestemonialModalTemplate = ({testimonial_id, author_name, author_surname, author_image, author_job_position, description, video, categories, is_video_vertical}, index) => {
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

    const pageNumbersTemplate = (numberOfPage, currentPageNumber) => {
        return `
            <button class="page-button ${currentPageNumber === numberOfPage ? "active" : ""}" data-page-number=${numberOfPage}>${numberOfPage}</button>
        `
    }

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
        const m = Math.floor(seconds % 3600 / 60);
        const s = Math.floor(seconds % 3600 % 60);
        return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }
}

export default allVideoTestimonials;