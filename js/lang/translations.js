import { english } from "./translations/english.js";
import { ukrainian } from "./translations/ukrainian.js";

const translationTexts = {
    "en-GB": english,
    "uk-UA": ukrainian,
}

let translationMetadata = {}
let translationData = {}

for (let key in translationTexts) {
    translationMetadata[key] = translationTexts[key].metadata
    translationData[key] = translationTexts[key].data
}

export function applyTranslations(targetPage = "") {
    const prefLang = localStorage.getItem("prefLang") || "en-GB";
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

