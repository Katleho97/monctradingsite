// ================= MOBILE MENU TOGGLE =================
function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  // Close mobile menu on link click
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("nav").classList.remove("active");
    });
  });

  // Initialize slideshow
  updateHeroBackground();
  startTimer();
});


// ================= HERO SLIDESHOW =================
const slides = [
  "src/slide1.jpeg",
  "src/slide2.jpeg",
  "src/slide3.jpeg"
];

let currentSlideIndex = 0;
let slideInterval;

function updateHeroBackground() {
  const heroSection = document.getElementById("hero");
  if (!heroSection) return;

  const gradient = "linear-gradient(90deg, rgba(10,10,10,.96) 0%, rgba(10,10,10,.75) 45%, rgba(10,10,10,.35) 100%)";
  heroSection.style.background = `${gradient}, url("${slides[currentSlideIndex]}") center/cover no-repeat`;
  heroSection.style.transition = "background 1s ease-in-out"; // smooth fade
}

function changeSlide(direction = 1) {
  currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
  updateHeroBackground();
}

function startTimer() {
  clearInterval(slideInterval); // prevent multiple timers
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

// Pause slideshow when hovering over hero
const heroSection = document.getElementById("hero");
heroSection?.addEventListener("mouseenter", () => clearInterval(slideInterval));
heroSection?.addEventListener("mouseleave", startTimer);

// Hero arrows
document.querySelector(".hero-prev")?.addEventListener("click", () => {
  changeSlide(-1);
  startTimer();
});

document.querySelector(".hero-next")?.addEventListener("click", () => {
  changeSlide(1);
  startTimer();
});

// Pause/Play toggle
const heroToggle = document.getElementById("hero-toggle");
let isPaused = false;

heroToggle?.addEventListener("click", () => {
  if (isPaused) {
    startTimer();
    heroToggle.textContent = "⏸ Pause";
    heroToggle.setAttribute("aria-label", "Pause Slideshow");
  } else {
    clearInterval(slideInterval);
    heroToggle.textContent = "▶ Play";
    heroToggle.setAttribute("aria-label", "Play Slideshow");
  }
  isPaused = !isPaused;
});

// Keyboard navigation for slideshow (only when no modal is open)
document.addEventListener("keydown", (e) => {
  if (projectModal.style.display !== "block" && galleryModal.style.display !== "block") {
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "ArrowRight") changeSlide(1);
  }
});


// ================= PROJECT MODAL =================
const projectModal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const projectCloseBtn = projectModal.querySelector(".close");

document.querySelectorAll(".project").forEach(project => {
  project.addEventListener("click", () => {
    const bgImage = window.getComputedStyle(project).backgroundImage;
    const urlMatch = bgImage.match(/url\("(.*?)"\)/);
    if (urlMatch) {
      projectModal.style.display = "block";
      modalImg.src = urlMatch[1];
      captionText.innerHTML = project.querySelector("h3").innerText;
    }
  });
});

projectCloseBtn.onclick = () => {
  projectModal.style.display = "none";
};

projectModal.onclick = (e) => {
  if (e.target === projectModal) {
    projectModal.style.display = "none";
  }
};


// ================= GALLERY MODAL =================
const galleryModal = document.getElementById("galleryModal");
const openGalleryBtn = document.getElementById("openGallery");
const galleryCloseBtn = galleryModal.querySelector(".close");

let galleryImages = [];
let currentIndex = 0;

openGalleryBtn.addEventListener("click", () => {
  galleryModal.style.display = "block";
  galleryImages = Array.from(galleryModal.querySelectorAll(".gallery-grid img"));
});

galleryCloseBtn.addEventListener("click", () => {
  galleryModal.style.display = "none";
});

galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    galleryModal.style.display = "none";
  }
});

galleryModal.querySelectorAll(".gallery-grid img").forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    openProjectModal(img);
  });
});

// Helper for gallery images
function openProjectModal(img) {
  projectModal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;
}
