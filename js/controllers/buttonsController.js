import { getPrefLang, buildContactMessage } from "../lang/translations.js"

export function injectHeaderButtonsLogic() {
    const brandButton = document.getElementById("brand-home-btn");
    const homeButton = document.querySelectorAll(".headerHomeButton");
    const galleryButton = document.querySelectorAll(".headerGalleryButton");
    const contactButton = document.querySelectorAll(".headerContactButton");
    const blogButton = document.querySelectorAll(".headerBlogButton");
    const toursButton = document.querySelectorAll(".headerToursButton");

    if (brandButton) {
        brandButton.removeEventListener("click", () => loadPage("home"));
        brandButton.addEventListener("click", () => loadPage("home"));
    }

    if (homeButton) {
        homeButton.forEach(btn => btn.removeEventListener("click", () => loadPage("home")));
        homeButton.forEach(btn => btn.addEventListener("click", () => loadPage("home")));
    }

    if (galleryButton) {
        galleryButton.forEach(btn => btn.removeEventListener("click", () => loadPage("gallery")));
        galleryButton.forEach(btn => btn.addEventListener("click", () => loadPage("gallery")));
    }

    if (contactButton) {
        contactButton.forEach(btn => btn.removeEventListener("click", () => loadPage("contact")));
        contactButton.forEach(btn => btn.addEventListener("click", () => loadPage("contact")));
    }

    if (blogButton) {
        blogButton.forEach(btn => btn.removeEventListener("click", () => loadPage("blog")));
        blogButton.forEach(btn => btn.addEventListener("click", () => loadPage("blog")));
    }

    if (toursButton) {
        toursButton.forEach(btn => btn.removeEventListener("click", () => loadPage("tours")));
        toursButton.forEach(btn => btn.addEventListener("click", () => loadPage("tours")));
    }
}

export function injectHomepageButtonsLogic() {
    const contactButton = document.getElementById("contactButton");
    const blogPostButtons = document.querySelectorAll('[id^="blogPost"]');

    if (contactButton) {
        contactButton.removeEventListener("click", () => loadPage("contact"));
        contactButton.addEventListener("click", () => loadPage("contact"));
    }

    blogPostButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const blogId = button.id.replace("blogPost", "").toLowerCase();

            loadPage("blog-post", blogId);
        }, { once: true });
    });
}

export function injectTourNavigationButtonLogic() {
    const toursButtons = document.querySelectorAll('[id^="tourPage"]');

    toursButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const tourId = button.id.replace("tourPage", "").toLowerCase();
            loadPage("tour", tourId);
        }, { once: true });
    });
}

export function injectParallaxButtonsLogic() {
    const bookTourButton = document.getElementById("parallaxButton");

    if (bookTourButton) {
        bookTourButton.removeEventListener("click", () => loadPage("contact"));
        bookTourButton.addEventListener("click", () => loadPage("contact"));
    }
}

export function injectTourButtonLogic() {
    const bookTourButton = document.getElementById("bookTourButton");
    const checkAvailabilityButton = document.getElementById("checkAvailabilityButton");
    const dateInput = document.getElementById("date");

    // Force calendar input to be in future 
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    if (bookTourButton) {
        bookTourButton.addEventListener("click", () => {
            const tourTitle = document.getElementById("tourTitle").innerText;
            const message = buildContactMessage("book", { tourTitle });
            loadPage("contact", message);
        });
    }

    if (checkAvailabilityButton) {
        checkAvailabilityButton.addEventListener("click", (e) => {
            e.preventDefault();

            const tourTitle = document.getElementById("tourTitle").innerText;
            const dateValue = document.getElementById("date")?.value;
            const guests = document.getElementById("guests")?.value;

            let formattedDate = "";
            if (dateValue) {
                const dateObj = new Date(dateValue);
                formattedDate = dateObj.toLocaleDateString(getPrefLang(), {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            }

            const message = buildContactMessage("check", { tourTitle, formattedDate, guests });
            loadPage("contact", message);
        });
    }
}

export function injectFooterButtonsLogic() {
    const homeButton = document.getElementById("footerHomeButton");
    const galleryButton = document.getElementById("footerGalleryButton");
    const contactButton = document.getElementById("footerContactButton");
    const blogButton = document.getElementById("footerBlogButton");
    const toursButton = document.getElementById("footerToursButton");

    if (homeButton) {
        homeButton.removeEventListener("click", () => loadPage("home"));
        homeButton.addEventListener("click", () => loadPage("home"));
    }

    if (galleryButton) {
        galleryButton.removeEventListener("click", () => loadPage("gallery"));
        galleryButton.addEventListener("click", () => loadPage("gallery"));
    }

    if (contactButton) {
        contactButton.removeEventListener("click", () => loadPage("contact"));
        contactButton.addEventListener("click", () => loadPage("contact"));
    }

    if (blogButton) {
        blogButton.removeEventListener("click", () => loadPage("blog"));
        blogButton.addEventListener("click", () => loadPage("blog"));
    }

    if (toursButton) {
        toursButton.removeEventListener("click", () => loadPage("tours"));
        toursButton.addEventListener("click", () => loadPage("tours"));
    }
}