// 1. Kukunin natin yung malaking image sa taas (gamit ang id na 'main-image')
const mainImage = document.getElementById('main-image');

// 2. Kukunin natin yung container ng mga thumbnails sa baba
const thumbNails = document.querySelector('.slider-thumbnails');

// 3. Pag may kinlick sa thumbnails...
thumbNails.addEventListener('click', function (event) {
    
    // Siguraduhin na ang kinlick ay mismong picture (IMG)
    if (event.target.tagName === 'IMG') {
        
        // Kunin ang 'src' (link ng picture) ng thumbnail na pinindot mo
        const pinindotNaPicture = event.target.src;
        
        // Ipalit ang picture na iyon sa malaking image sa taas!
        mainImage.src = pinindotNaPicture;
    }
});