import { initLanguage } from "../lang/language.js";
import { applyTranslations, injectNewsletter, injectContact } from "../lang/translations.js";
import { showAlert } from "../controllers/alertController.js";
import { EMAILJS_NEWSLETTER_SERVICE, EMAILJS_NEWSLETTER_TEMPLATE } from "../config/conf.js";
import { injectNavbarButtonsLogic, injectFooterButtonsLogic, injectParallaxButtonsLogic } from "../controllers/buttonsController.js";


export async function injectHeader() {
    const headerContainer = document.getElementById('header');
    try {
        const response = await fetch('/on-the-wave/components/shared/header.html');
        if (response.ok) {
            headerContainer.innerHTML = await response.text();
            injectNavbar();
            applyTranslations();
        } else {
            console.error('Failed to load header:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
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

export async function injectFooter() {
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

function injectNavbar() {
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
    injectNavbarButtonsLogic();
    initLanguage('dropdownMenu', 'langMenuBtn');
    initLanguage('dropdownMenuMobile', 'langMenuBtnMobile');
}

function injectFooterEmailLogic() {
    document.getElementById('newsletterForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const emailInput = document.getElementById('emailNewsletter');

        const formData = {
            email: emailInput.value,
            text: "User subscribed to the OTW newsletter!"
        };

        emailjs.send(EMAILJS_NEWSLETTER_SERVICE, EMAILJS_NEWSLETTER_TEMPLATE, formData).then(
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
