import { initLanguage } from "./lang/language.js";
import { applyTranslations } from "./lang/translations.js";
import { injectContact } from "./lang/translations.js";
import { loadPage } from "./controllers/redirectController.js";
import { EMAILJS_NEWSLETTER_SERVICE, EMAILJS_NEWSLETTER_TEMPLATE } from "./config/conf.js";

async function injectHeader(){
    const headerContainer = document.getElementById('header');
    try {
        const response = await fetch('/on-the-wave/components/shared/header.html');
        if (response.ok) {
            headerContainer.innerHTML = await response.text();
            injectNavbar();
            injectMobileMenu();
            initLanguage('dropdown-menu', 'lang-menu-btn');
            initLanguage('dropdown-menu-mobile', 'lang-menu-btn-mobile');
            applyTranslations();
        } else {
            console.error('Failed to load header:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

export function injectNavbar(){
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (navbar){
            if (window.scrollY > 10) {
                navbar.classList.remove('navbar-transparent');
                navbar.classList.add('navbar-solid');
            } else {
                navbar.classList.remove('navbar-solid');
                navbar.classList.add('navbar-transparent');
            }
        }
    });
}

export function injectMobileMenu(){
    const menuToggler = document.getElementById("menu-toggler");
    const overlayMenu = document.getElementById("overlay-menu");
    const closeOverlay = document.getElementById("close-overlay");

    menuToggler.addEventListener("click", () => {
        overlayMenu.classList.add("active");
    });

    closeOverlay.addEventListener("click", () => {
        overlayMenu.classList.remove("active");
    });

    overlayMenu.addEventListener("click", (event) => {
        if (event.target === overlayMenu) {
            overlayMenu.classList.remove("active");
        }
    });
}

async function injectFooter(){
    const headerContainer = document.getElementById('footer');
    try {
        const response = await fetch('/on-the-wave/components/shared/footer.html')
        if (response.ok) {
            headerContainer.innerHTML = await response.text();
            injectContact();
            applyTranslations();
            injectFooterEmailLogic();
        } else {
            console.error('Failed to load footer:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

function injectFooterEmailLogic(){
    document.getElementById('newsletterForm').addEventListener('submit', function (event) {
        event.preventDefault(); 

        const emailInput = document.getElementById('emailNewsletter');

        emailjs.send(EMAILJS_NEWSLETTER_SERVICE, EMAILJS_NEWSLETTER_TEMPLATE, {
            email: emailInput.value,
        }).then(
            function (response) {
                showAlert('Thank you for subscribing!', 'success');
                emailInput.value = '';
            },
            function (error) {
                showAlert('Failed to send email. Please try again later.', 'danger');
                console.error('EmailJS Error:', error);
            }
        );
    });
}

function showAlert(message, type) {
    const icons = {
        success: `
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill"></use>
            </svg>
        `,
        danger: `
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                <use xlink:href="#exclamation-triangle-fill"></use>
            </svg>
        `
    };

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} d-flex align-items-center alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${icons[type] || ''}
        <div>${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const alertContainer = document.getElementById('alert-container');
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.classList.remove('show');
        alert.addEventListener('transitionend', () => alert.remove());
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    loadPage("");
});


