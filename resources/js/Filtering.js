import axios from 'axios';

export default class Filtering {
    constructor(testimonialsList, modalContainer, pageButtons, filters, video_testimonials_base_url, video_testimonials_list_url) {
        this.testimonialsList = testimonialsList;
        this.modalContainer = modalContainer;
        this.pageButtons = pageButtons;
        this.filters = filters;
        this.video_testimonials_base_url = video_testimonials_base_url;
        this.video_testimonials_list_url = video_testimonials_list_url;
    };

    async filter(filterList, page = 1) {
        const axiosOptions = {
            params: {
                json: true,
                categories: filterList,
                page: page
            }
        };
        try {
            const response = await axios.get(this.video_testimonials_base_url, axiosOptions);
            const data = await response.data;

            /* updating URL */
            const url = axios.getUri({
                url: this.video_testimonials_list_url, 
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

    handleDataChange(filterList, page = 1) {
        $(this.testimonialsList).addClass("loading");
        this.filter(filterList, page).then((data) => {
            $(this.modalContainer).empty();
            $(this.testimonialsList).empty();
            data.video_testimonials.forEach((testimonial) => {
                $(this.testimonialsList).append(this.maketestimonialTemplate(testimonial));
                $(this.modalContainer).append(this.makeTestemonialModalTemplate(testimonial));
            });

            $(this.pageButtons).empty();
            for (let el = 1; el <= data.number_of_pages; el++) {
                $(this.pageButtons).append(this.pageNumbersTemplate(el, page));
            }

            $(this.filters).empty();
            Object.entries(data.categories_data).forEach((category) => {
                $(this.filters).append(this.maketestimonialFiltersTemplate(category, data.filter_categories));
            });
            $(this.testimonialsList).removeClass("loading");
        });
    };

    maketestimonialTemplate({testimonial_id, author_name, author_image, author_job_position, description, video, categories, video_settings: { duration }}) {
        return `
        <div class="video-testimonial">
            <p>${description.length > 35 ? this.truncate(description, 35) : description}</p>
            <div class="video">
                <video muted loop class="testimonial-video">
                    <source src="${video}">
                </video>
                <div class="duration">
                    ${this.secondsToMinutes(Math.floor(duration))}
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

    makeTestemonialModalTemplate({testimonial_id, author_name, author_surname, author_image, author_job_position, description, video, categories, is_video_vertical}) {
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

    maketestimonialFiltersTemplate([categoryId, categoryName], filterCategories) {
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

    pageNumbersTemplate(numberOfPage, currentPageNumber) {
        return `
            <button class="page-button ${currentPageNumber === numberOfPage ? "active" : ""}" data-page-number=${numberOfPage}>${numberOfPage}</button>
        `
    };

    truncate(string, length) {
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

    secondsToMinutes(seconds) {
        seconds = Number(seconds);
        const m = Math.floor(seconds % 3600 / 60);
        const s = Math.floor(seconds % 3600 % 60);
        return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    };

}