const searchInput = document.getElementById('search-input');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const resultText = document.querySelector('.result-text p');
const noResultsMsg = document.getElementById('no-results-msg');

const allCards = Array.from(document.querySelectorAll('.service-item'));

let currentPage = 0;
let itemsPerPage = 6;

function updatePageDisplay() {
    const searchString = searchInput.value.toLowerCase();

    const matchingCards = allCards.filter(card => {

        return card.textContent.toLowerCase().includes(searchString);
    });

    allCards.forEach(card => card.style.display = 'none');

    resultText.innerText = `Showing All results: ${matchingCards.length} results found`;

    if (matchingCards.length === 0) {

        noResultsMsg.style.display = 'flex';
        prevBtn.style.display='none';
        nextBtn.style.display='none';

        //prevBtn.disabled = true;
        //nextBtn.disabled = true;

    } else {
        noResultsMsg.style.display = 'none';
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const cardsToShow = matchingCards.slice(startIndex, endIndex);

        cardsToShow.forEach(card => card.style.display = 'block');

        prevBtn.disabled = (currentPage === 0);
        nextBtn.disabled = (endIndex >= matchingCards.length);

    }
}

searchInput.addEventListener('input', () => {
    currentPage = 0;
    updatePageDisplay();
});

nextBtn.addEventListener('click', () => {

    currentPage++;
    updatePageDisplay();
});

prevBtn.addEventListener('click', () => {

    if (currentPage > 0) {
        currentPage--;
        updatePageDisplay();
    }
});

updatePageDisplay();