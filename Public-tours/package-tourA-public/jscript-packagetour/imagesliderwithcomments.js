// ==========================================
// 1. DOM ELEMENTS (Pagkuha ng mga HTML parts)
// ==========================================
const slidesContainer = document.querySelector('.slides'); // Ang mahabang kahon na naglalaman ng lahat ng malalaking litrato
const allImages = document.querySelectorAll('.slide'); // Koleksyon ng lahat ng malalaking litrato
const allThumbnails = document.querySelectorAll('.thumbnail'); // Koleksyon ng lahat ng maliliit na litrato sa ibaba

// ==========================================
// 2. VARIABLES (Mga nagtatanda ng impormasyon)
// ==========================================
let index = 1; // Nagsisimula tayo sa 1 dahil ang 0 ay yung clone ng huling litrato
let autoPlayTimer; // Variable na hahawak sa ating timer para sa autoplay

// Mga elements para sa Lightbox (Yung nagpa-pop-up na malaking view)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxZoom = document.getElementById('lightboxZoom');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxPrev = document.getElementById('lightboxPrev');

// Variables para sa Drag & Drop (Pag-pan o paghila sa image)
let isDragging = false; // Taga-tanda kung nakapindot ba ang mouse
let startX, startY; // Taga-tanda kung saan unang pumindot ang user
let translateX = 0, translateY = 0; // Taga-tanda kung gaano kalayo na ang naihila

// ==========================================
// 3. LIGHTBOX FUNCTIONS
// ==========================================

// FUNCTION: Para buksan ang Lightbox
function openLightbox() {
    let correctIndex = index - 1; // Binabawas ang 1 para tumugma sa orihinal na array ng litrato

    // Guard: Kung pinindot habang nagte-teleport yung infinite loop, i-tama ang bilang
    if(correctIndex < 0) correctIndex = totalSlides - 1;
    if (correctIndex >= totalSlides) correctIndex = 0;

    // Kukunin ang source link ng tamang litrato at ilalagay sa Lightbox
    lightboxImg.src = allImages[correctIndex].src;
    lightbox.classList.add('show'); // Palilitawin ang buong lightbox background
    
    resetLightboxState(); // Siguraduhing normal size ang litrato pagkabukas
}

// FUNCTION: Para isara ang Lightbox
function closeLightbox() {
    lightbox.classList.remove('show'); // Itatago ang lightbox
    resetLightboxState(); // Ibabalik sa normal size at pwesto ang litrato
}

// FUNCTION (Helper): Tagalinis ng zoom at pwesto para di magulo sa susunod na bukas o Next/Prev
function resetLightboxState() {
    lightboxImg.classList.remove('zoomed'); // Tatanggalin ang zoomed class
    translateX = 0; // Ire-reset ang hila (X)
    translateY = 0; // Ire-reset ang hila (Y)
    lightboxImg.style.transform = `translate(0px, 0px) scale(1)`; // Ibabalik sa gitna at normal na laki
    
    // I-reset din yung icon pabalik sa Plus (+)
    const icon = lightboxZoom.querySelector('i');
    icon.classList.remove('fa-magnifying-glass-minus');
    icon.classList.add('fa-magnifying-glass-plus');
}

// ==========================================
// 4. AUTOPLAY FUNCTIONS
// ==========================================

// FUNCTION: Magsisimula ng timer na kusang pipindot ng "Next" kada 3 segundo
function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 3000); // 3000ms = 3 seconds
}

// FUNCTION: Ire-reset ang timer (Ginagamit natin 'to para hindi umusog bigla kung kakanext mo lang manually)
function resetAutoPlay() {
    clearInterval(autoPlayTimer); // Papatayin ang lumang timer
    startAutoPlay(); // Gagawa ng panibagong timer
}

// ==========================================
// 5. INFINITE LOOP SETUP (Ang Magic Clones)
// ==========================================
const totalSlides = allImages.length; // Bibilangin kung ilan lahat ang litrato

// Kukuha ng kopya (clone) ng pinaka-una at pinaka-huling litrato
const firstClone = allImages[0].cloneNode(true);
const lastClone = allImages[totalSlides - 1].cloneNode(true);

// Ilalagay ang clone ng huli sa pinaka-unahan, at clone ng una sa pinaka-hulihan
slidesContainer.appendChild(firstClone);
slidesContainer.prepend(lastClone);

// I-u-usog ang slider ng isang pwesto (dahil index 1 na tayo, lampas sa clone)
slidesContainer.style.transform = `translateX(-100%)`;

// ==========================================
// 6. SLIDER CORE FUNCTIONS
// ==========================================

// FUNCTION: Taga-update ng posisyon ng litrato at kulay ng active thumbnail
function updateSlider() {
    // Inuusog ang malaking slider base sa kasalukuyang index
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    
    // Tinatanggalan ng highlight (active) ang lahat ng thumbnails
    allThumbnails.forEach(thumb => thumb.classList.remove('active'));

    // Kino-compute kung alin ang dapat ma-highlight na thumbnail
    let thumbnailIndex = index - 1;
    if(thumbnailIndex >= 0 && thumbnailIndex < totalSlides) {
        allThumbnails[thumbnailIndex].classList.add('active'); // Lalagyan ng highlight yung tama
    }
}

// EVENT: Ang "Stealthy Teleport" ng Infinite Loop (Nangyayari pagkatapos ng dulas/animation)
slidesContainer.addEventListener('transitionend', () => {
    // Kung lumampas na sa huling litrato (nasa clone na)
    if (index === totalSlides + 1){
        slidesContainer.style.transition = 'none'; // Patayin ang dulas animation
        index = 1; // Ibalik sa totoong unang litrato
        slidesContainer.style.transform = `translateX(-${index * 100}%)`; // Teleport!
    }

    // Kung umatras lampas sa unang litrato (nasa clone na)
    if(index === 0){
        slidesContainer.style.transition = 'none'; // Patayin ang dulas animation
        index = totalSlides; // Ibalik sa totoong huling litrato
        slidesContainer.style.transform = `translateX(-${index * 100}%)`; // Teleport!
    }
});

// FUNCTION: Utos para umusog pakaliwa (Next)
function nextSlide() {
    if(index >= totalSlides + 1) return; // Guard: Wag mag-next kung nagte-teleport pa
    index++; // Dagdagan ang index
    slidesContainer.style.transition = 'transform 0.5s ease-in-out'; // Buhayin ang smooth dulas
    resetAutoPlay(); // I-reset ang timer
    updateSlider(); // I-update ang screen
}

// FUNCTION: Utos para umatras pakanan (Prev)
function prevSlide() {
    if(index <= 0) return; // Guard: Wag mag-prev kung nagte-teleport pa
    index--; // Bawasan ang index
    slidesContainer.style.transition = 'transform 0.5s ease-in-out'; // Buhayin ang smooth dulas
    resetAutoPlay(); // I-reset ang timer
    updateSlider(); // I-update ang screen
}

// ==========================================
// 7. CLICK EVENTS (Mga pinipindot ng User)
// ==========================================

// Binibigyan ng Event Listener ang bawat isang maliit na litrato (Thumbnail)
allThumbnails.forEach((thumb, i ) => {
    thumb.addEventListener('click', () => {
        index = i + 1; // Ia-update ang index base sa pinindot (plus 1 dahil sa clone)
        slidesContainer.style.transition = 'transform 0.5s ease-in-out'; // Smooth dulas
        resetAutoPlay(); // I-reset ang timer
        updateSlider(); // I-update ang screen
    });
});

// Pag kinlik yung mismong malaking slider, bubukas ang Lightbox
slidesContainer.addEventListener('click', () => {
    openLightbox();
});

// Pag kinlik ang "X" sa lightbox, sasara ang Lightbox
lightboxClose.addEventListener('click', () => {
    closeLightbox();
});

// Pag kinlik ang Zoom button sa lightbox
lightboxZoom.addEventListener('click', () => {
    const isZoomed = lightboxImg.classList.toggle('zoomed'); // I-toggle ang state (True/False)
    const icon = lightboxZoom.querySelector('i'); // Kunin yung icon na lupa (magnifying glass)

    if(isZoomed) { // Kung pinalaki (Zoom In)
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`; // Doblehin ang laki
        icon.classList.remove('fa-magnifying-glass-plus'); // Tanggalin ang plus
        icon.classList.add('fa-magnifying-glass-minus'); // Palitan ng minus
    } else { // Kung pinaliit (Zoom Out)
        translateX = 0; // I-reset ang coordinates
        translateY = 0;
        lightboxImg.style.transform = `translate(0px, 0px) scale(1)`; // Ibalik sa normal na laki at gitna
        icon.classList.remove('fa-magnifying-glass-minus'); // Tanggalin ang minus
        icon.classList.add('fa-magnifying-glass-plus'); // Ibalik ang plus
    }
});

// Pag kinlik ang Next (Arrow Right) sa loob ng Lightbox
lightboxNext.addEventListener('click', () => {
    nextSlide(); // Pausugin ang slider sa background
    openLightbox(); // I-refresh ang litrato sa lightbox
});

// Pag kinlik ang Prev (Arrow Left) sa loob ng Lightbox
lightboxPrev.addEventListener('click', () => {
    prevSlide(); // I-atras ang slider sa background
    openLightbox(); // I-refresh ang litrato sa lightbox
});

// ==========================================
// 8. LIGHTBOX DRAG / PAN LOGIC (Pag-hila ng Image)
// ==========================================

// MAGIC LINE: Pinapatay ang default na behavior ng browser na i-save/i-drag yung image file
lightboxImg.ondragstart = () => false;

// 1. PAG PININDOT ANG MOUSE (Magsisimula ang hila)
lightboxImg.addEventListener('mousedown', (e) => {
    if(lightboxImg.classList.contains('zoomed')) { // Papayagan lang humila kung naka-zoom
        e.preventDefault(); // Iwasan ang text-highlighting
        
        isDragging = true; // Ilagay sa "Dragging Mode"
        startX = e.clientX - translateX; // Kunin ang eksaktong posisyon ng mouse pointer (X)
        startY = e.clientY - translateY; // Kunin ang eksaktong posisyon ng mouse pointer (Y)
        
        lightboxImg.style.transition = 'none'; // Patayin saglit ang animation para di mag-lag pag hinila
        lightboxImg.style.cursor = 'grabbing'; // Gawing nakasarang kamay ang cursor
        
        lightbox.classList.add('is-dragging');  // Itago ang mga buttons para malinis tingnan (Immersive view)
    }
});

// 2. PAG GINALAW ANG MOUSE (Paghila mismo)
lightboxImg.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Wag gagalaw kung hindi naman nakapindot
    
    e.preventDefault();
    
    // Kuwentahin ang bagong posisyon base sa galaw ng mouse
    translateX = e.clientX - startX; 
    translateY = e.clientY - startY;
    
    // --- THE PERFECT BOUNDARIES (Ang Pader) ---
    // Kino-compute kung kasing-laki na ba ng screen ang image
    const scaledWidth = lightboxImg.offsetWidth * 2;
    const scaledHeight = lightboxImg.offsetHeight * 2;

    // Kinukuha ang maximum limit na pwedeng ihila (nagiging 0 kung kasya naman sa screen)
    const maxX = Math.max(0, (scaledWidth - window.innerWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - window.innerHeight) / 2);

    // Harang sa Kanan at Kaliwa
    if (translateX > maxX) translateX = maxX;
    if (translateX < -maxX) translateX = -maxX;

    // Harang sa Taas at Baba
    if (translateY > maxY) translateY = maxY;
    if (translateY < -maxY) translateY = -maxY;
    // ------------------------------------------
    
    // I-apply ang panibagong posisyon sa litrato
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;
});

// 3. PAG BINITAWAN ANG MOUSE (Titigil)
const stopDrag = () => {
    isDragging = false; // Tanggalin sa "Dragging Mode"
    lightboxImg.style.transition = 'transform 0.3s ease'; // Ibalik ang smooth animation

    if(lightboxImg.classList.contains('zoomed')) {
        lightboxImg.style.cursor = 'grab'; // Gawing bukas na kamay ulit
    } else {
        lightboxImg.style.cursor = ''; // Ibalik sa normal (arrow pointer)
    }
    
    lightbox.classList.remove('is-dragging'); // Ibalik ang mga buttons na tinago kanina
};

// Ikabit ang stopDrag kapag binitawan ang mouse o lumabas sa picture ang mouse
lightboxImg.addEventListener('mouseup', stopDrag);
lightboxImg.addEventListener('mouseleave', stopDrag);

// ==========================================
// 9. INITIALIZATION (Buhayin ang Slider!)
// ==========================================
startAutoPlay(); // Tawagin ang timer para mag-umpisa ang autoplay pagka-load ng page!