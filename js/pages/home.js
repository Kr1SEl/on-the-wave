import { applyTranslations, getTourData, translationData } from "../lang/translations.js";
import { injectHomepageButtonsLogic, injectTourNavigationButtonLogic } from "../controllers/buttonsController.js";
import { injectParallax } from "./common.js"

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
                <div class="card destination-card mx-2 my-3 shadow-md rounded-lg overflow-hidden">
                    <img src="${tourData["hero-image"]}" class="card-img-top w-full h-48 object-cover" alt="${tourData.title}">
                    <div class="card-body p-4 flex flex-col justify-between h-full">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold text-gray-900">${tourData.title}</h3>
                            <span class="ml-4 bg-${tourData.badgeColor}-100 text-${tourData.badgeColor}-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                ${tourData.badgeName}
                            </span>
                        </div>
                        <p class="text-gray-600 mb-4">${tourData.subtitle || ""}</p>
                        <div class="flex items-center text-gray-500 mb-4 space-x-6">
                            <div class="flex items-center">
                                <i class="far fa-clock mr-2"></i>
                                <span class="text-sm">${tourData.duration}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-users mr-2"></i>
                                <span class="text-sm">${tourData["group-size"]}</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xl font-bold text-blue-600">${tourData.price}</span>
                            <button id="tourPage${tour["id"]}" 
                                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-flex items-center">
                                View Tour <i class="ml-2 fas fa-arrow-right"></i>
                            </button>
                        </div>
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
        injectTourNavigationButtonLogic();

        window.removeEventListener("resize", resizeCarousel);
        window.addEventListener("resize", resizeCarousel);

        resolve();
    });
}
