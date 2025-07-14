import { applyTranslations, getTourData, translationData } from "../lang/translations.js";
import { injectHomepageButtonsLogic } from "../controllers/buttonsController.js";

const prefLang = localStorage['prefLang'];
let prevChunksize = 0;

export async function injectParallax() {
    const headerContainer = document.getElementById('parallax');
    try {
        const response = await fetch('/on-the-wave/components/shared/parallax.html')
        if (response.ok) {
            headerContainer.innerHTML = await response.text();
        } else {
            console.error('Failed to load Parallax:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading Parallax:', error);
    }
}

function createCarousel(chunkSize) {
    const tours = translationData[prefLang]["tours"];
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
                        <button id="tourPage${tour["id"]}" class="btn btn-primary">View Tour</button>
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
