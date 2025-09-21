import storageController from '../controllers/storageController.js';
import { translationMetadata } from "./translations.js";

export function initLanguage(elementId, btnId) {
    const languageMenu = document.getElementById(elementId);
    const currentLanguage = storageController.getPreferredLanguage()
    console.log("Init language started")
    const menuBtn = document.getElementById(btnId)
    menuBtn.setAttribute('aria-haspopup', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('tabindex', '0');
    menuBtn.innerHTML = `<span class="${translationMetadata[currentLanguage]['flag']}" 
                            id="langSpan" role="presentation"></span>&ensp;${translationMetadata[currentLanguage]["displayName"]}`
    console.log("Attributes set")
    menuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            console.log("Toggle")
            e.preventDefault();
            toggleDropdown();
        }
    });

    console.log("menuBtn:", menuBtn);
    console.log("languageMenu:", languageMenu);

    function toggleDropdown() {
        console.log("Toggle dropdown start")
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        console.log("Toggle dropdown mid")
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        languageMenu.classList.toggle('show', !isExpanded);
    }

    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !languageMenu.contains(e.target)) {
            menuBtn.setAttribute('aria-expanded', 'false');
            languageMenu.classList.remove('show');
        }
    });

    Object.entries(translationMetadata).map(entry => {
        let val = entry[1];
        if (entry[0] !== currentLanguage) {
            const dropdownItem = document.createElement('a');
            dropdownItem.setAttribute('class', 'dropdown-item');
            dropdownItem.setAttribute('role', 'menuitem');
            dropdownItem.setAttribute('tabindex', '0');
            dropdownItem.id = `${val["tagId"]}`;
            dropdownItem.innerHTML += `<span class="${val["flag"]}" role="presentation"></span>&ensp;${val["displayName"]}`;
            dropdownItem.addEventListener('click', (e) => {
                storageController.changePreferredLanguage(e.currentTarget.id);
            });

            dropdownItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    storageController.changePreferredLanguage(e.currentTarget.id);
                }
            })
            languageMenu.appendChild(dropdownItem);
        }
    });
}