async function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function applyTranslations() {
    applyTranslations("blog-post");
}

function renderBlogPost(blogData, id, lang) {
    const titleEl = document.getElementById("blog-title");
    const summaryEl = document.getElementById("blog-summary");
    const contentEl = document.getElementById("blog-content");
    const imageEl = document.getElementById("blog-image");

    if (!id || !blogData || !blogData[id]) {
        titleEl.textContent = lang === "uk" ? "Блог не знайдено" : "Blog post not found";
        summaryEl.textContent = "";
        contentEl.innerHTML = "";
        imageEl.style.display = "none";
        return;
    }

    const post = blogData[id];
    titleEl.textContent = post.title;
    summaryEl.textContent = post.summary;
    contentEl.innerHTML = post.content;
    imageEl.src = post.image;
    imageEl.alt = post.title;
}

async function initBlogPage() {
    const lang = localStorage.getItem("lang") || "en";
    const scriptMap = {
        en: "/on-the-wave/components/blog/blog_en.js",
        uk: "/on-the-wave/components/blog/blog_ua.js"
    };

    try {
        await loadScript(scriptMap[lang] || scriptMap.en);
        await loadScript("/on-the-wave/components/blog/blog.js");
        applyTranslations();
        const id = new URLSearchParams(window.location.search).get("id");
        renderBlogPost(window.blogData, id, lang);
    } catch (err) {
        console.error("Error loading blog post:", err);
        document.getElementById("content").innerHTML = `
            <p style='color:red;text-align:center'>Failed to load blog content.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", initBlogPage);
