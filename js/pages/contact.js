import { applyTranslations } from "../lang/translations.js";
import { showAlert } from "../controllers/alertController.js";
import { EMAILJS_NEWSLETTER_SERVICE, EMAILJS_NEWSLETTER_TEMPLATE } from "../config/conf.js";

function injectContactFormLogic() {
    const contactForm = document.getElementById("contactForm")
    contactForm.removeEventListener("submit", submitForm);
    contactForm.addEventListener("submit", submitForm);
}

function submitForm(e) {
    e.preventDefault()

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
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
}

export function loadContactPage() {
    return new Promise((resolve) => {
        applyTranslations("contact");
        injectContactFormLogic();
        resolve();
    });
}

// <script src="https://kit.fontawesome.com/YOUR_KIT_ID.js" crossorigin="anonymous"></script> -->
