import { english } from "./translations/common_en.js";
import { ukrainian } from "./translations/common_ua.js";
import { blogData_en } from "./translations/blog/blog_en.js";
import { blogData_ua } from "./translations/blog/blog_ua.js";
import { tourData_en } from "./translations/tour/tour_en.js";
import { tourData_ua } from "./translations/tour/tour_ua.js";
import { tourCommon_en } from "./translations/tour/common_en.js";
import { tourCommon_ua } from "./translations/tour/common_ua.js";

const translationTexts = {
    "en-GB": english,
    "uk-UA": ukrainian,
}

const blogTranslationTexts = {
    "en-GB": blogData_en,
    "uk-UA": blogData_ua,
}

const tourDataTranslationTexts = {
    "en-GB": tourData_en,
    "uk-UA": tourData_ua,
}

const tourCommonTranslationTexts = {
    "en-GB": tourCommon_en,
    "uk-UA": tourCommon_ua,
}

let translationMetadata = {}
let commonTranslationData = {}
let blogTranslationData = {}
let tourTranslationData = {}
let tourTranslationCommon = {}

for (let key in translationTexts) {
    translationMetadata[key] = translationTexts[key].metadata
    commonTranslationData[key] = translationTexts[key].data
}

for (let key in blogTranslationTexts) {
    blogTranslationData[key] = blogTranslationTexts[key]
}

for (let key in tourDataTranslationTexts) {
    tourTranslationData[key] = tourDataTranslationTexts[key]
}

for (let key in tourCommonTranslationTexts) {
    tourTranslationCommon[key] = tourCommonTranslationTexts[key]
}

export function getPrefLang() {
    return localStorage.getItem("prefLang") || "en-GB";
}

function mergeTranslations(obj1, obj2) {
    return Object.assign({}, obj1, obj2);
};

function getSelectedTranslations(translations, id = null) {
    const prefLang = getPrefLang();
    if (id) {
        return translations[prefLang][id];
    }
    return translations[prefLang];
}

export function buildContactMessage(type, { tourTitle, formattedDate, guests }) {
    const lang = getPrefLang();

    const messages = {
        "en-GB": {
            book: `Hello, I'm interested in the tour "${tourTitle}". Please contact me back with additional details.`,
            check: `Hello, I’d like to check the availability of the "${tourTitle}" tour${formattedDate ? ` on ${formattedDate}` : ""}${guests ? ` for ${guests} guest${guests > 1 ? "s" : ""}` : ""}. Could you please confirm availability and provide more details? Thank you!`
        },
        "uk-UA": {
            book: `Вітаю! Мене цікавить тур «${tourTitle}». Будь ласка, зв’яжіться зі мною для отримання додаткової інформації.`,
            check: `Вітаю! Я хотів(ла) би дізнатися про доступність туру «${tourTitle}»${formattedDate ? ` на ${formattedDate}` : ""}${guests ? ` для ${guests} учасник${guests > 1 ? "ів" : ""}` : ""}. Чи могли б ви підтвердити доступність і надати більше деталей? Дякую!`
        }
    };

    return messages[lang]?.[type] || messages["en-GB"][type];
}

export function getTourData(id) {
    return getSelectedTranslations(tourTranslationData, id);
}

export function applyTranslations(targetPage = "", id = null) {
    if (id != null) {
        applyTranslationsWithId(targetPage, id);
    } else {
        applyTranslationsWithoutId(targetPage);
    }
}

function applyTranslationsWithId(targetPage, id) {
    if (targetPage != "blog-post" && targetPage != "tour") {
        console.error(`Attempting to translate unknown page ${targetPage}, ${id}`);
        return;
    }
    let selectedTranslations = undefined;
    if (targetPage == "blog-post") {
        selectedTranslations = getSelectedTranslations(blogTranslationData, id);
    } else if (targetPage == "tour") {
        selectedTranslations = mergeTranslations(getSelectedTranslations(tourTranslationData, id), getSelectedTranslations(tourTranslationCommon, "data"))
    }

    if (!selectedTranslations) {
        console.error(`No translations found for language: ${getPrefLang()}`);
        return;
    }
    const elements = document.querySelectorAll("[data-translate]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-translate");
        if (selectedTranslations[key]) {
            element.textContent = selectedTranslations[key];
        }
    });
}

function applyTranslationsWithoutId(targetPage) {
    let selectedTranslations = getSelectedTranslations(commonTranslationData, "common");
    if (targetPage != "") {
        selectedTranslations = getSelectedTranslations(commonTranslationData, targetPage);
    }

    if (!selectedTranslations) {
        console.error(`No translations found for language: ${getPrefLang()}`);
        return;
    }

    const elements = document.querySelectorAll("[data-translate]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-translate");
        if (selectedTranslations[key]) {
            element.textContent = selectedTranslations[key];
        }
    });
}

export function injectNewsletter() {
    let contactTranslations = getSelectedTranslations(commonTranslationData, "common");

    const emailNewsletterInput = document.getElementById("emailNewsletter");
    emailNewsletterInput.placeholder = contactTranslations["footer.newsletter.email-placeholder"];
}

export function injectContact() {
    let contactTranslations = getSelectedTranslations(commonTranslationData, "common");

    const phones = document.querySelectorAll('a[href*="tel"]');

    const phoneOne = phones[0];
    phoneOne.href = `tel:${contactTranslations["phone-one-href"].replace(/\s+/g, "")}`;

    const phoneTwo = phones[1];
    phoneTwo.href = `tel:${contactTranslations["phone-two-href"].replace(/\s+/g, "")}`;

    const email = document.querySelector('a[href*="mailto"]');
    email.href = `mailto:${contactTranslations["email"]}`;
}

export function injectAllToursData() {
    let tours = getSelectedTranslations(tourTranslationData);
    const container = document.getElementById("tourGrid");
    if (!container) return;

    container.innerHTML = "";

    Object.keys(tours).forEach((key, index) => {
        const tour = tours[key];

        const card = document.createElement("div");
        card.className =
            "tour-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", `${100 * (index + 1)}`);

        card.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${tour["hero-image"]}" alt="${tour.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-gray-900">${tour.title}</h3>
                    <span class="bg-${tour.badgeColor}-100 text-${tour.badgeColor}-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        ${tour.badgeName}
                    </span>
                </div>
                <p class="text-gray-600 mb-4">${tour.subtitle}</p>
                <div class="flex items-center text-gray-500 mb-4 space-x-6">
                    <div class="flex items-center">
                        <i class="far fa-clock mr-2"></i>
                        <span class="text-sm">${tour.duration}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-users mr-2"></i>
                        <span class="text-sm">${tour["group-size"]}</span>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-blue-600">${tour.price}</span>
                    <button id="tourPage${key}" 
                                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-flex items-center">
                                View Tour <i class="ml-2 fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

export function injectTourData(id) {
    let tourTranslations = getTourData(id);

    document.getElementById('tourHero').style.setProperty('--hero-url', `url('${tourTranslations["hero-image"]}')`);
    document.getElementById('tourDescription').innerHTML = tourTranslations.description;

    // Highlights
    const highlightsContainer = document.getElementById('tourHighlights');
    tourTranslations.highlights.forEach(highlight => {
        const highlightElement = document.createElement('div');
        highlightElement.className = 'flex items-start';
        highlightElement.innerHTML = `
        <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
        <span class="text-gray-700">${highlight}</span>
        `;
        highlightsContainer.appendChild(highlightElement);
    });

    // Itinerary
    const itineraryContainer = document.getElementById('tourItinerary');
    tourTranslations.itinerary.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'border-l-4 border-blue-500 pl-4 py-2';
        itemElement.innerHTML = `
        <div class="font-bold text-blue-600">${item.day}</div>
        <h3 class="text-lg font-semibold text-gray-800">${item.title}</h3>
        <p class="text-gray-700">${item.description}</p>
        `;
        itineraryContainer.appendChild(itemElement);
    });

    // Gallery
    const galleryContainer = document.getElementById('tourGallery');
    tourTranslations.gallery.forEach(imageUrl => {
        const imageElement = document.createElement('div');
        imageElement.className = 'overflow-hidden rounded-lg shadow-md';
        imageElement.innerHTML = `
        <img src="${imageUrl}" alt="Tour photo" class="gallery-image w-full h-full">
            `;
        galleryContainer.appendChild(imageElement);
    });
}

export function injectIncludedExcluded() {
    let tourTranslations = getSelectedTranslations(tourTranslationCommon, "data");

    // Included/Excluded
    const includedContainer = document.getElementById('tourIncluded');
    tourTranslations.included.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-start';
        li.innerHTML = `
            <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
            <span>${item}</span>
            `;
        includedContainer.appendChild(li);
    });

    const excludedContainer = document.getElementById('tourExcluded');
    tourTranslations.excluded.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-start';
        li.innerHTML = `
            <i class="fas fa-times text-red-500 mt-1 mr-2"></i>
            <span>${item}</span>
            `;
        excludedContainer.appendChild(li);
    });
}

export function injectFaqTranslations() {
    let faqTranslations = getSelectedTranslations(commonTranslationData, "faq");

    const faqContainer = document.getElementById('tourFaq');
    faqTranslations.forEach(item => {
        const faqElement = document.createElement('div');
        faqElement.className = 'bg-white p-6 rounded-lg shadow-md';
        faqElement.innerHTML = `
                <h3 class="text-lg font-semibold text-gray-800 mb-2">${item.question}</h3>
                <p class="text-gray-700">${item.answer}</p>
                `;
        faqContainer.appendChild(faqElement);
    });
}

export { commonTranslationData as translationData, translationMetadata }

