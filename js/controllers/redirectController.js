import { loadHomePage } from "../pages/home.js";
import { loadContactPage } from "../pages/contact.js";
import { loadBlogPage } from "../pages/blogPost.js"
import { loadTourPage, loadAllToursPage } from "../pages/tour.js";

let lastScrollTarget = null;

export async function loadPage(page, params = null) {
    const pageMappings = {
        "home": {
            url: "/on-the-wave/components/pages/home.html",
            callback: () => {
                loadHomePage().then(() => {
                    scrollToTop();
                });
            },
        },
        "gallery": {
            url: "/on-the-wave/components/pages/home.html",
            callback: () => {
                loadHomePage().then(() => {
                    scrollToSection("gallerySection");
                });
            },
        },
        "blog": {
            url: "/on-the-wave/components/pages/home.html",
            callback: () => {
                loadHomePage().then(() => {
                    scrollToSection("blogSection");
                });
            },
        },
        "blog-post": {
            url: "/on-the-wave/components/pages/blog-post.html",
            callback: () => {
                loadBlogPage(params).then(() => {
                    scrollToTop();
                });
            }
        },
        "contact": {
            url: "/on-the-wave/components/pages/contact.html",
            callback: () => {
                loadContactPage(params).then(() => {
                    scrollToTop();
                });
            },
        },
        "tours": {
            url: "/on-the-wave/components/pages/allTours.html",
            callback: () => {
                loadAllToursPage().then(() => {
                    scrollToTop();
                });
            },
        },
        "tour": {
            url: "/on-the-wave/components/pages/tour.html",
            callback: () => {
                loadTourPage(params).then(() => {
                    scrollToTop();
                });
            }
        },
        "": {
            url: "/on-the-wave/components/pages/home.html",
            callback: () => loadHomePage(),
        }
    };
    const mapping = pageMappings[page];

    if (!mapping) {
        console.error(`Page "${page}" not found.`);
        return;
    }

    try {
        const response = await fetch(mapping.url);
        if (response.ok) {
            document.getElementById("content").innerHTML = await response.text();
            if (mapping.callback) {
                mapping.callback();
            }
            history.pushState({}, "", `#${page}${params ? `?id=${params}` : ""}`);
        } else {
            console.error('Failed to load page:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading page:', error);
    }
}

function scrollToSection(id, offset = 80) {
    if (lastScrollTarget === id) return;
    lastScrollTarget = id;

    const el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });

        setTimeout(() => (lastScrollTarget = null), 500);
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0 });
}

window.loadPage = loadPage;

window.onpopstate = function () {
    const url = new URL(window.location.href);
    const pageName = url.pathname.split("/").pop().replace(".html", "") || "";
    const id = url.searchParams.get("id");

    loadPage(pageName, id);
};