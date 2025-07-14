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

function getPrefLang() {
    return localStorage.getItem("prefLang") || "en-GB";
}

function mergeTranslations(obj1, obj2) {
    return Object.assign({}, obj1, obj2);
};

function getSelectedTranslations(translations, id) {
    const prefLang = getPrefLang();
    return translations[prefLang][id];
}

export function getTourData(id){
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

export function injectContact() {
    let contactTranslations = getSelectedTranslations(commonTranslationData, "common");

    const emailNewsletterInput = document.getElementById("emailNewsletter");
    emailNewsletterInput.placeholder = contactTranslations["footer.newsletter.email-placeholder"];

    const phones = document.querySelectorAll('a[href*="tel"]');

    const phoneOne = phones[0];
    phoneOne.href = `tel:${contactTranslations["phone-one-href"].replace(/\s+/g, "")}`;
    phoneOne.querySelector('span').textContent = contactTranslations["phone-one"];

    const phoneTwo = phones[1];
    phoneTwo.href = `tel:${contactTranslations["phone-two-href"].replace(/\s+/g, "")}`;
    phoneTwo.querySelector('span').textContent = contactTranslations["phone-two"];

    const email = document.querySelector('a[href*="mailto"]');
    email.href = `mailto:${contactTranslations["email"]}`;
    email.querySelector('span').textContent = contactTranslations["email"];
}

export function injectTourData(id) {
    let tourTranslations = getSelectedTranslations(tourTranslationData, id);

    document.getElementById('tour-hero').style.setProperty('--hero-url', `url('${tourTranslations["hero-image"]}')`);
    document.getElementById('tour-description').innerHTML = tourTranslations.description;

    // Highlights
    const highlightsContainer = document.getElementById('tour-highlights');
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
    const itineraryContainer = document.getElementById('tour-itinerary');
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
    const galleryContainer = document.getElementById('tour-gallery');
    tourTranslations.gallery.forEach(imageUrl => {
        const imageElement = document.createElement('div');
        imageElement.className = 'overflow-hidden rounded-lg shadow-md';
        imageElement.innerHTML = `
        <img src="${imageUrl}" alt="Tour photo" class="gallery-image w-full h-full">
            `;
        galleryContainer.appendChild(imageElement);
    });

    // Included/Excluded
    const includedContainer = document.getElementById('tour-included');
    tourTranslations.included.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-start';
        li.innerHTML = `
            <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
            <span>${item}</span>
            `;
        includedContainer.appendChild(li);
    });

    const excludedContainer = document.getElementById('tour-excluded');
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

    const faqContainer = document.getElementById('tour-faq');
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

