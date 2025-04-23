// Configuration
const SLIDE_INTERVAL = 5000; // Time between slides in milliseconds
const STAR_COUNT = 150; // Number of stars in the background

// Create stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
        starsContainer.appendChild(star);
    }
}

// DOM Elements
const startButton = document.getElementById("timer");
const mainButton = document.getElementById("main");
const galleryButton = document.getElementById("gallery");
const cuteButton = document.getElementById("cute");

const textPart = document.querySelector(".text-part");
const timerDiv = document.querySelector(".timer");
const galleryContainer = document.querySelector(".gallery-container");
const heartContainer = document.querySelector(".heart-container");
const gallerySlideshow = document.querySelector(".gallery-slideshow");
const galleryDots = document.querySelector(".gallery-dots");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const playPauseBtn = document.querySelector(".play-pause-btn");

// Gallery settings
let currentSlide = 0;
let slideInterval;
let isPlaying = true;

// Photo gallery data
const galleryImages = [
    { src: "media/photos/1.jpg" },
    { src: "media/photos/2.jpg" },
    { src: "media/photos/3.jpg" },
    { src: "media/photos/4.jpg" },
    { src: "media/photos/5.jpg" },
    { src: "media/photos/6.jpg" },
    { src: "media/photos/7.jpg" },
    { src: "media/photos/8.jpg" },
    { src: "media/photos/9.jpg" }
];

// Cute text array
const cuteTexts = [
    "mmega cie kocham ❤️",
    "adi cwel",
    "jestes mmmmmmmmmmmega slodka",
    "type shit wiesz ocb",
    "najbardziej misie podoba ze masz mega luz do mn i moge robic co chce przy tb i nie ma problem",
    "jestes mega przesliczna i naprawde nkumam jak to mozliwe ze kuzia byla taka rozchwytywana chb ze ty taka cicha myszka poprostu",
    "boneka ambalabu",
    "i mg ci nawet wybaczyc to twoje ogladanie genzie 😭 😭",
    "sorki ze nie kumam jaki masz kolor oczu i widze jakies kolory co nie istnieja ale misie mega podobajom cn.....",
    "wiem ze mega nie lubisz gadki na halowen ale dla mn bd to chb najlepsza gadka z kimkolwiek w moim zyciu 😭 😭",
    "mega essa ze sie wyjebalas na adiego i zrobilas miejsca dla mn",
    "janmg wgl mega dzieki za wszystko co mi dalas sorki jak czasami reaguje jak zjeb ale mega doceniam..........",
    "mega misie podobasz ❤️❤️❤️❤️❤️❤️❤️❤️❤️",
    "i wgl wchuj sie ciesze ze tak twoi rodzice mn lubia myslalem ze stwierdza janmg ale zjeb ale chb tez sie ciesza z mn"
];

// Relationship start date
const startDate = new Date("2025-01-27T00:00:00");

// Helper Functions
function pluralize(value, forms) {
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    if (value === 1) return `${value} ${forms[0]}`;
    if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
        return `${value} ${forms[1]}`;
    }
    return `${value} ${forms[2]}`;
}

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("time-days").textContent = pluralize(days, ["dzień", "dni", "dni"]);
    document.getElementById("time-hours").textContent = pluralize(hours, ["godzina", "godziny", "godzin"]);
    document.getElementById("time-minutes").textContent = pluralize(minutes, ["minuta", "minuty", "minut"]);
    document.getElementById("time-seconds").textContent = pluralize(seconds, ["sekunda", "sekundy", "sekund"]);
}

// Gallery Functions
function createGallery() {
    galleryImages.forEach((image, index) => {
        const slide = document.createElement("img");
        slide.src = image.src;
        slide.alt = `Gallery Image ${index + 1}`;
        slide.classList.add("gallery-slide");
        if (index === 0) slide.classList.add("active");
        gallerySlideshow.appendChild(slide);
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll(".gallery-slide");
    const captions = document.querySelectorAll(".gallery-caption");
    const dots = document.querySelectorAll(".gallery-dot");
    
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    currentSlide = index;
    
    slides.forEach(slide => slide.classList.remove("active"));
    captions.forEach(caption => caption.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));
    
    slides[index].classList.add("active");
    if (captions[index]) captions[index].style.display = "block";
    if (dots[index]) dots[index].classList.add("active");
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startGallery() {
    if (!gallerySlideshow.querySelector(".gallery-slide")) {
        createGallery();
    }
    
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function togglePlayPause() {
    if (isPlaying) {
        clearInterval(slideInterval);
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Clear all views
function clearAllViews() {
    // Hide all main views
    textPart.style.display = "none";
    timerDiv.style.display = "none";
    galleryContainer.style.display = "none";
    
    // Remove any cute text containers
    const cuteTexts = document.querySelectorAll('.cute-text');
    cuteTexts.forEach(text => text.remove());
    
    // Clear intervals
    clearInterval(timerInterval);
    clearInterval(slideInterval);
}

// Show specific view
function showView(viewName) {
    // First clear everything
    clearAllViews();
    
    // Then show the requested view
    switch(viewName) {
        case "main":
            textPart.style.display = "block";
            break;
        case "gallery":
            galleryContainer.style.display = "block";
            startGallery();
            break;
        case "timer":
            timerDiv.style.display = "block";
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
            break;
        case "cute":
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * cuteTexts.length);
            } while (randomIndex === lastCuteTextIndex);
            
            lastCuteTextIndex = randomIndex;
            const randomCuteText = cuteTexts[randomIndex];
            
            const cuteTextContainer = document.createElement('div');
            cuteTextContainer.className = 'cute-text';
            cuteTextContainer.innerHTML = `<h1>${randomCuteText}</h1>`;
            
            heartContainer.appendChild(cuteTextContainer);
            cuteTextContainer.style.display = 'block';
            break;
    }
}

// Event Listeners
let timerInterval;
let lastCuteTextIndex = -1;

mainButton.addEventListener("click", () => showView("main"));
galleryButton.addEventListener("click", () => showView("gallery"));
startButton.addEventListener("click", () => showView("timer"));
cuteButton.addEventListener("click", () => showView("cute"));

prevBtn.addEventListener("click", () => {
    prevSlide();
    clearInterval(slideInterval);
    if (isPlaying) {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }
});

nextBtn.addEventListener("click", () => {
    nextSlide();
    clearInterval(slideInterval);
    if (isPlaying) {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }
});

playPauseBtn.addEventListener("click", togglePlayPause);

// Initialize stars and app
createStars();
showView("main");

function showLoadingPage() {
    const loadingPage = document.querySelector('.loading-page');
    const progressGif = document.querySelector('.progress-gif');

    let position = -200;
    const interval = setInterval(() => {
        position += 10;
        progressGif.style.left = `${position}px`;

        if (position >= window.innerWidth) {
            clearInterval(interval);
            loadingPage.style.display = 'none';
            showView("main");
        }
    }, 20);
}

window.addEventListener('load', showLoadingPage);