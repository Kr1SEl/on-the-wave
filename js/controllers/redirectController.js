import { loadHomePage } from "../pages/home.js";
import { loadContactPage } from "../pages/contact.js";
import { loadBlogPage } from "../pages/blogPost.js"

let lastScrollTarget = null;

export async function loadPage(page, id = null) {
    console.log(page);
    const pageMappings = {
        "gallery": {
            url: "/on-the-wave/components/pages/home.html",
            callback: () => {
                loadHomePage().then(() => {
                    scrollToSection("gallery-section");
                });
            },
        },
        "blog": {
            url: "/on-the-wave/components/pages/home.html",
            callback: () => {
                loadHomePage().then(() => {
                    scrollToSection("blog-section");
                });
            },
        },
        "blog-post": {
            url: "/on-the-wave/components/pages/blog-post.html",
            callback: () => {
                loadBlogPage(id).then(() => {
                    scrollToTop();
                });
            }
        },
        "contact": {
            url: "/on-the-wave/components/pages/contact.html",
            callback: () => { 
                loadContactPage().then(() => {
                    scrollToTop();
                });
            },
        },
        "tours": {
            url: "/on-the-wave/components/pages/home.html",
            callback: () => {
                loadHomePage().then(() => {
                    scrollToSection("tours-section");
                });
            },
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
            history.pushState({}, "", `#${page}${id ? `?id=${id}` : ""}`);
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