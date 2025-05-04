import { loadHomePage } from "../pages/home.js";
import { loadContactPage } from "../pages/contact.js";

export async function loadPage(page) {
    const pageMappings = {
        "contact": {
            url: "/on-the-wave/components/pages/contact.html",
            callback: () => loadContactPage(),
        },
        "tours": {
            url: "/on-the-wave/components/pages/tours.html",
            callback: () => console.log("Tours page loaded!"),
        },
        "blog": {
            url: "/on-the-wave/components/pages/blog.html",
            callback: () => console.log("Blog page loaded!"),
        },
        "blog-post": {
            url: "/on-the-wave/components/pages/blog-post.html",
            callback: () => loadBlogPostPage(),
        },
        "gallery": {
            url: "/on-the-wave/components/pages/gallery.html",
            callback: () => console.log("Gallery page loaded!"),
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
            history.pushState({}, "", `${page}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            console.error('Failed to load page:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading page:', error);
    }
}


window.loadPage = loadPage;

window.onpopstate = function () {
    const pageName = window.location.pathname.split("/").pop().replace(".html", "");
    loadPage(pageName);
};
