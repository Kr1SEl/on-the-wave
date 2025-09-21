import { initLanguage } from "./lang/language.js";
import { applyTranslations, injectNewsletter, injectContact } from "./lang/translations.js";
import { loadPage } from "./controllers/redirectController.js";
import { showAlert } from "./controllers/alertController.js";
import { EMAILJS_NEWSLETTER_SERVICE, EMAILJS_NEWSLETTER_TEMPLATE } from "./config/conf.js";
import { injectHeaderButtonsLogic, injectFooterButtonsLogic, injectParallaxButtonsLogic } from "./controllers/buttonsController.js";

async function injectHeader() {
    const headerContainer = document.getElementById('header');
    try {
        const response = await fetch('/on-the-wave/components/shared/header.html');
        if (response.ok) {
            headerContainer.innerHTML = await response.text();
            injectNavbar();
            injectMobileMenu();
            injectHeaderButtonsLogic();
            initLanguage('dropdownMenu', 'langMenuBtn');
            initLanguage('dropdownMenuMobile', 'langMenuBtnMobile');
            applyTranslations();
        } else {
            console.error('Failed to load header:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

export function injectNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (navbar) {
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

export function injectMobileMenu() {
    const menuToggler = document.getElementById("menuToggler");
    const overlayMenu = document.getElementById("overlayMenu");
    const closeOverlay = document.getElementById("closeOverlay");

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

export async function injectParallax() {
    const parallaxContainer = document.getElementById('parallax');
    try {
        const response = await fetch('/on-the-wave/components/shared/parallax.html')
        if (response.ok) {
            parallaxContainer.innerHTML = await response.text();
            injectParallaxButtonsLogic();
            applyTranslations();
        } else {
            console.error('Failed to load Parallax:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading Parallax:', error);
    }
}

async function injectFooter() {
    const headerContainer = document.getElementById('footer');
    try {
        const response = await fetch('/on-the-wave/components/shared/footer.html')
        if (response.ok) {
            headerContainer.innerHTML = await response.text();
            injectNewsletter();
            injectContact();
            applyTranslations();
            injectFooterEmailLogic();
            injectFooterButtonsLogic();
        } else {
            console.error('Failed to load footer:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

function injectFooterEmailLogic() {
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
                showAlert('Failed to subscribe. Please try again later.', 'danger');
                console.error('EmailJS Error:', error);
            }
        );
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const [page, query] = window.location.hash.replace(/^#/, "").split("?");
    const params = new URLSearchParams(query);
    const id = params.get("id");

    loadPage(page || "", id);
});

document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
});


