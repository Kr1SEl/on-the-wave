import { applyTranslations } from "../lang/translations.js";

export function loadBlogPage(id){
    return new Promise((resolve) => {
        applyTranslations("blog-post", id);
        resolve();
    });
}