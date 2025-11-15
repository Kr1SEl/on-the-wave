import { applyTranslations, injectContact } from "../lang/translations.js";
import { showAlert } from "../controllers/alertController.js";
import { EMAILJS_NEWSLETTER_SERVICE, EMAILJS_AUTO_REPLY_TEMPLATE, EMAILJS_NEWSLETTER_TEMPLATE } from "../config/conf.js";

function injectCountryCodeSelection() {
    const phoneInput = document.querySelector("#phone");
    window.intlTelInput(phoneInput, {
        initialCountry: "auto",
        preferredCountries: ["ua", "us", "gb"],
        geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"));
        },
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js", // formatting/validation
    });
}

function injectContactFormLogic() {
    const contactForm = document.getElementById("contactForm")
    contactForm.removeEventListener("submit", submitForm);
    contactForm.addEventListener("submit", submitForm);
}

function injectContactFormMessage(message = null) {
    if (message == null) {
        return;
    }

    const contactFormMessage = document.getElementById("message");
    contactFormMessage.value = message;
}

function submitForm(e) {
    e.preventDefault()

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const formData = {
        name: name,
        text: "User send a message using Contact Form!",
        email: email,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    };

    emailjs.send(EMAILJS_NEWSLETTER_SERVICE, EMAILJS_NEWSLETTER_TEMPLATE, formData)
        .then(
            function (response) {
                showAlert('Message sent successfully!', 'success');
                document.getElementById("contactForm").reset();
            },
            function (error) {
                showAlert('Failed to send a message. Please try again later.', 'danger');
                console.error('EmailJS Error:', error);
            }
        );

    emailjs.send(EMAILJS_NEWSLETTER_SERVICE, EMAILJS_AUTO_REPLY_TEMPLATE, { name, email });
}

export function loadContactPage(message = null) {
    return new Promise((resolve) => {
        applyTranslations("contact");
        injectContact();
        injectContactFormLogic();
        injectContactFormMessage(message);
        injectCountryCodeSelection();
        resolve();
    });
}

// <script src="https://kit.fontawesome.com/YOUR_KIT_ID.js" crossorigin="anonymous"></script> -->
