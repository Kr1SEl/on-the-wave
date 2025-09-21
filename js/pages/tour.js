import { applyTranslations, injectTourData, injectFaqTranslations, injectIncludedExcluded } from "../lang/translations.js";
import { injectParallax } from "../main.js"
import { injectTourButtonLogic } from "../controllers/buttonsController.js"

export function loadTourPage(id) {
    return new Promise((resolve) => {
        applyTranslations("tour", id);
        injectTourData(id);
        injectIncludedExcluded();
        injectFAQ();
        injectParallax();
        injectTourButtonLogic();
        resolve();
    });
}

export function loadAllToursPage() {
    return new Promise((resolve) => {
        applyTranslations("tours");
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