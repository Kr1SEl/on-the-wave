import { applyTranslations, getTourData, translationData } from "../lang/translations.js";
import { injectHomepageButtonsLogic } from "../controllers/buttonsController.js";
import { injectParallax } from "../main.js"

const prefLang = localStorage['prefLang'];
let prevChunksize = 0;

function createCarousel(chunkSize) {
    const tours = translationData[prefLang]["tours"]["highlights"];
    const carouselContent = document.getElementById("carouselContent");
    carouselContent.innerHTML = "";

    const tourKeys = Object.keys(tours);

    for (let i = 0; i < tourKeys.length; i += chunkSize) {
        const chunk = tourKeys.slice(i, i + chunkSize);
        const isActive = i === 0 ? "active" : "";

        const carouselItem = document.createElement("div");
        carouselItem.className = `carousel-item ${isActive}`;

        const row = document.createElement("div");
        row.className = "d-flex justify-content-center flex-wrap";

        chunk.forEach((key) => {
            const tour = tours[key];
            const tourData = getTourData(tour.id)

            const card = `
                <div class="card destination-card mx-2 my-3">
                    <img src="${tourData["hero-image"]}" class="card-img-top" alt="${tourData.title}">
                    <div class="card-body">
                        <h5 class="card-title">${tourData.title}</h5>
                        <p class="card-text">${tourData.price}</p>
                        <button id="tourPage${tour["id"]}" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-md transition duration-300">View Tour</button>
                    </div>
                </div>
            `;
            row.insertAdjacentHTML("beforeend", card);
        });

        carouselItem.appendChild(row);
        carouselContent.appendChild(carouselItem);
    }
}

function injectGalleryContent() {
    const highlights = translationData[prefLang]["highlights"];
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = "";

    const rowLayout = [3, 4, 3];
    let currentRow = 0;
    let currentItemIndex = 1;

    Object.keys(highlights).forEach((key, index) => {
        const highlight = highlights[key];
        const galleryItem = document.createElement('div');
        const itemDef = currentRow % 2 == 0 ? "odd" : "even";
        galleryItem.className = `gallery-item item-${itemDef}`;

        galleryItem.innerHTML = `
            <img src="${highlight.image}" alt="${highlight.text}">
            <div class="overlay">
                <h5>${highlight.text}</h5>
                <p>${highlight.description || ""}</p>
            </div>
        `;

        galleryGrid.appendChild(galleryItem);

        currentItemIndex++;
        if (currentItemIndex > rowLayout[currentRow]) {
            currentRow = (currentRow + 1) % rowLayout.length;
            currentItemIndex = 1;
        }
    });
}

function resizeCarousel() {
    const windowSize = window.innerWidth;
    let chunkSize;
    if (windowSize < 992) {
        chunkSize = 1;
    } else if (windowSize < 1400) {
        chunkSize = 2;
    } else {
        chunkSize = 3;
    }

    if (prevChunksize != chunkSize) {
        createCarousel(chunkSize);
        prevChunksize = chunkSize;
    }
}

export function loadHomePage() {
    return new Promise((resolve) => {
        prevChunksize = 0;
        applyTranslations("home");
        injectGalleryContent();
        resizeCarousel();
        injectParallax();
        injectHomepageButtonsLogic();

        window.removeEventListener("resize", resizeCarousel);
        window.addEventListener("resize", resizeCarousel);

        resolve();
    });
}
