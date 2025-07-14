export function injectHeaderButtonsLogic(){
    const galleryButton = document.getElementById("headerGalleryButton");
    const contactButton = document.getElementById("headerContactButton");
    const blogButton = document.getElementById("headerBlogButton");
    const toursButton = document.getElementById("headerToursButton");

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

export function injectHomepageButtonsLogic(){
    const contactButton = document.getElementById("contactButton");
    const blogPostButtons = document.querySelectorAll('[id^="blogPost"]');
    const toursButtons = document.querySelectorAll('[id^="tourPage"]');

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

    toursButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const tourId = button.id.replace("tourPage", "").toLowerCase();
            loadPage("tour", tourId);
        }, { once: true });
    });
}

export function injectFooterButtonsLogic(){
    const galleryButton = document.getElementById("footerGalleryButton");
    const contactButton = document.getElementById("footerContactButton");
    const blogButton = document.getElementById("footerBlogButton");
    const toursButton = document.getElementById("footerToursButton");

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