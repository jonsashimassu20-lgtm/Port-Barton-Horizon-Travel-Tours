const slidesContainer = document.querySelector('.slides');
const allImages = document.querySelectorAll('.slide');
const allThumbnails = document.querySelectorAll('.thumbnail');

let index = 1;
let autoPlayTimer;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxZoom = document.getElementById('lightboxZoom');

let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;



function openLightbox() {
    let correctIndex = index - 1;

    if(correctIndex < 0) correctIndex = totalSlides - 1;
    if (correctIndex >= totalSlides) correctIndex = 0;

    lightboxImg.src = allImages[correctIndex].src;
    lightbox.classList.add('show');
    
    // TATAWAGIN NATIN ITO PARA LAGING NORMAL SIZE PAG NAG-NEXT/PREV
    resetLightboxState();
}

function closeLightbox() {
    lightbox.classList.remove('show');
    resetLightboxState(); // Tatawagin ulit para malinis pagkapasara
}
// HELPER FUNCTION: Nagre-reset ng zoom at pwesto para malinis palagi
function resetLightboxState() {
    lightboxImg.classList.remove('zoomed');
    translateX = 0;
    translateY = 0;
    lightboxImg.style.transform = `translate(0px, 0px) scale(1)`;
    
    const icon = lightboxZoom.querySelector('i');
    icon.classList.remove('fa-magnifying-glass-minus');
    icon.classList.add('fa-magnifying-glass-plus');
}
//-------------------------------------------------------------
function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 3000);
}

function resetAutoPlay(){
    clearInterval(autoPlayTimer);
    startAutoPlay();
}

const totalSlides = allImages.length;

const firstClone = allImages[0].cloneNode(true);
const lastClone = allImages[totalSlides - 1].cloneNode(true);

slidesContainer.appendChild(firstClone);
slidesContainer.prepend(lastClone);

slidesContainer.style.transform = `translateX(-100%)`;

function updateSlider() {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    allThumbnails.forEach(thumb => thumb.classList.remove('active'));

    let thumbnailIndex = index - 1;

    if(thumbnailIndex >= 0 && thumbnailIndex < totalSlides) {
        allThumbnails[thumbnailIndex].classList.add('active');
    }
}

slidesContainer.addEventListener('transitionend', () => {
    if (index === totalSlides + 1){
        slidesContainer.style.transition = 'none';
        index = 1;
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    if(index === 0){
        slidesContainer.style.transition = 'none';
        index = totalSlides;
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    }
});


function nextSlide(){
    if(index >= totalSlides + 1) return;
    index++;
    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
    resetAutoPlay();
    updateSlider();
}

function prevSlide(){
    if(index <= 0) return;
    index--;
    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
    resetAutoPlay();
    updateSlider();
}

allThumbnails.forEach((thumb, i ) => {
    thumb.addEventListener('click', () => {
        index = i + 1;
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        resetAutoPlay();
        updateSlider();
    });
});

slidesContainer.addEventListener('click', () => {
    openLightbox();
});

lightboxClose.addEventListener('click', () => {
    closeLightbox();
});

lightboxZoom.addEventListener('click', () => {
    const isZoomed = lightboxImg.classList.toggle('zoomed');
    const icon = lightboxZoom.querySelector('i'); // Kukunin natin yung icon element

    if(isZoomed) {
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;
        // Palitan ang icon ng minus (-)
        icon.classList.remove('fa-magnifying-glass-plus');
        icon.classList.add('fa-magnifying-glass-minus');
    } else {
        translateX = 0;
        translateY = 0;
        lightboxImg.style.transform = `translate(0px, 0px) scale(1)`;
        // Ibalik sa plus (+)
        icon.classList.remove('fa-magnifying-glass-minus');
        icon.classList.add('fa-magnifying-glass-plus');
    }
});

const lightboxNext = document.getElementById('lightboxNext');
const lightboxPrev = document.getElementById('lightboxPrev');

lightboxNext.addEventListener('click', () => {
    nextSlide();
    openLightbox();
    
});

lightboxPrev.addEventListener('click', () => {
    prevSlide();
    openLightbox();
});

// MAGIC LINE: Pinapatay ang default image dragging ng browser
lightboxImg.ondragstart = () => false;

// 1. PAG PININDOT ANG MOUSE (Magsisimula ang hila)
lightboxImg.addEventListener('mousedown', (e) => {
    if(lightboxImg.classList.contains('zoomed')) {
        e.preventDefault();
        
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        
        lightboxImg.style.transition = 'none';
        lightboxImg.style.cursor = 'grabbing';
        
        // DADAGDAG NATIN ITO: Itago ang mga buttons!
        lightbox.classList.add('is-dragging'); 
    }
});

// 2. PAG GINALAW ANG MOUSE (Rubber Band Pader)
lightboxImg.addEventListener('mousemove', (e) => {
    if (!isDragging) return; 
    
    e.preventDefault();
    
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    
    const scaledWidth = lightboxImg.offsetWidth * 2;
    const scaledHeight = lightboxImg.offsetHeight * 2;

    const maxX = Math.max(0, (scaledWidth - window.innerWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - window.innerHeight) / 2);

    // --- THE RUBBER BAND EFFECT ---
    const friction = 0.2; // Gaano katigas ang goma? (20% lang ng normal speed pag lumampas)

    // X-Axis (Kanan at Kaliwa)
    if (translateX > maxX) {
        translateX = maxX + ((translateX - maxX) * friction); // Babanatin pero mabigat
    } else if (translateX < -maxX) {
        translateX = -maxX + ((translateX + maxX) * friction);
    }

    // Y-Axis (Taas at Baba)
    if (translateY > maxY) {
        translateY = maxY + ((translateY - maxY) * friction); // Babanatin pero mabigat
    } else if (translateY < -maxY) {
        translateY = -maxY + ((translateY + maxY) * friction);
    }
    // ------------------------------
    
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;
});

// 3. PAG BINITAWAN ANG MOUSE (Titigil)
// 3. PAG BINITAWAN ANG MOUSE
// 3. PAG BINITAWAN ANG MOUSE (Titigil at Mag-i-Snap Back)
const stopDrag = () => {
    isDragging = false;
    lightboxImg.style.transition = 'transform 0.3s ease'; // Ito yung magpapa-smooth bounce pabalik!

    if(lightboxImg.classList.contains('zoomed')) {
        lightboxImg.style.cursor = 'grab';

        // --- RUBBER BAND SNAP BACK CHECK ---
        // Susukatin ulit natin yung limitasyon
        const scaledWidth = lightboxImg.offsetWidth * 2;
        const scaledHeight = lightboxImg.offsetHeight * 2;
        const maxX = Math.max(0, (scaledWidth - window.innerWidth) / 2);
        const maxY = Math.max(0, (scaledHeight - window.innerHeight) / 2);

        // Kung nakalampas nung binitawan, ibalik sa sakto (Snap back!)
        if (translateX > maxX) translateX = maxX;
        if (translateX < -maxX) translateX = -maxX;
        if (translateY > maxY) translateY = maxY;
        if (translateY < -maxY) translateY = -maxY;

        // I-apply ang pag-bounce pabalik
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;
        // -----------------------------------

    } else {
        lightboxImg.style.cursor = '';
    }
    
    lightbox.classList.remove('is-dragging'); 
};
const lightboxFullscreen = document.getElementById('lightboxFullscreen');

// UTOS PARA MAG-FULLSCREEN
lightboxFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        // I-full screen ang lightbox
        lightbox.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
        lightboxFullscreen.querySelector('i').classList.replace('fa-expand', 'fa-compress');
    } else {
        // I-exit ang full screen
        document.exitFullscreen();
        lightboxFullscreen.querySelector('i').classList.replace('fa-compress', 'fa-expand');
    }
});

// LISTENER: Kung sakaling pinindot ng user ang "ESC" key para lumabas
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        lightboxFullscreen.querySelector('i').classList.replace('fa-compress', 'fa-expand');
    }
});

lightboxImg.addEventListener('mouseup', stopDrag);
lightboxImg.addEventListener('mouseleave', stopDrag);

startAutoPlay();
