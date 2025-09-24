import { loadPage } from "./controllers/redirectController.js";
import { injectHeader, injectFooter } from "./pages/common.js";

window.addEventListener("DOMContentLoaded", () => {
    const [page, query] = window.location.hash.replace(/^#/, "").split("?");
    const params = new URLSearchParams(query);
    const id = params.get("id");

    loadPage(page || "", id);
});

document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
});


