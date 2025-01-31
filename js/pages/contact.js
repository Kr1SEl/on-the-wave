import { applyTranslations } from "../lang/translations.js";

function injectContactFormLogic() {
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        };

        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
            .then(function (response) {
                alert("Message sent successfully!");
                document.getElementById("contactForm").reset();
            }, function (error) {
                alert("Failed to send message. Please try again.");
            });
    });
}

export function loadContactPage() {
    applyTranslations("contact");
    injectContactFormLogic();
}

// <script src="https://kit.fontawesome.com/YOUR_KIT_ID.js" crossorigin="anonymous"></script> -->
