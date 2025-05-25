import { english } from "./translations/english.js";
import { ukrainian } from "./translations/ukrainian.js";
import { blogData_en } from "./translations/blog/blog_en.js";
import { blogData_ua } from "./translations/blog/blog_ua.js";

const translationTexts = {
    "en-GB": english,
    "uk-UA": ukrainian,
}

const blogTranslationTexts = {
    "en-GB": blogData_en,
    "uk-UA": blogData_ua,
}

let translationMetadata = {}
let translationData = {}
let blogTranslationData = {}

for (let key in translationTexts) {
    translationMetadata[key] = translationTexts[key].metadata
    translationData[key] = translationTexts[key].data
}

for (let key in blogTranslationTexts) {
    blogTranslationData[key] = blogTranslationTexts[key]
}

export function applyTranslations(targetPage = "", id = null) {
    const prefLang = localStorage.getItem("prefLang") || "en-GB";
    if(id != null){
        applyTranslationsWithId(targetPage, id, prefLang);
    }else{
        applyTranslationsWithoutId(targetPage, prefLang);
    }
}

function applyTranslationsWithId(targetPage, id, prefLang){
    if(targetPage != "blog-post"){
        console.error(`Attempting to translate unknown page ${targetPage}, ${id}`);
        return;
    }
    console.log(id);
    console.log(typeof id);
    if(targetPage == "blog-post"){
        console.log(blogData_en);
        console.log(blogTranslationData);
        let selectedTranslations = blogTranslationData[prefLang][id];
        
        console.log(selectedTranslations);
        if (!selectedTranslations) {
            console.error(`No translations found for language: ${prefLang}`);
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
}

function applyTranslationsWithoutId(targetPage, prefLang){
    let selectedTranslations = translationData[prefLang]["common"];

    if(targetPage != ""){
        selectedTranslations = translationData[prefLang][targetPage];
    }

    if (!selectedTranslations) {
        console.error(`No translations found for language: ${prefLang}`);
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
    const prefLang = localStorage.getItem("prefLang") || "en-GB";
    let selectedTranslations = translationData[prefLang]["common"];

    const emailNewsletterInput = document.getElementById("emailNewsletter");
    emailNewsletterInput.placeholder = selectedTranslations["email-placeholder"];

    const phones = document.querySelectorAll('a[href*="tel"]');

    const phoneOne = phones[0];
    phoneOne.href = `tel:${selectedTranslations["phone-one-href"].replace(/\s+/g, "")}`;
    phoneOne.querySelector('span').textContent = selectedTranslations["phone-one"];

    const phoneTwo = phones[1];
    phoneTwo.href = `tel:${selectedTranslations["phone-two-href"].replace(/\s+/g, "")}`;
    phoneTwo.querySelector('span').textContent = selectedTranslations["phone-two"];

    const email = document.querySelector('a[href*="mailto"]');
    email.href = `mailto:${selectedTranslations["email"]}`;
    email.querySelector('span').textContent = selectedTranslations["email"];
}


export { translationData, translationMetadata}

