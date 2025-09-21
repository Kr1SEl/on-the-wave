import { applyTranslations, injectTourData, injectFaqTranslations } from "../lang/translations.js";
import { injectParallax } from "../main.js"

export function loadTourPage(id) {
    return new Promise((resolve) => {
        applyTranslations("tour", id);
        injectTourData(id);
        injectFAQ();
        injectParallax();
        resolve();
    });
}

async function injectFAQ() {
    const headerContainer = document.getElementById('faq');
    try {
        const response = await fetch('/on-the-wave/components/shared/faq.html')
        if (response.ok) {
            headerContainer.innerHTML = await response.text();
            injectFaqTranslations();
        } else {
            console.error('Failed to load FAQ:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading FAQ:', error);
    }
}