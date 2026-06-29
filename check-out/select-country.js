// ============================================================
// Grab lahat ng elements na kailangan
// ============================================================
const countryWrapper    = document.getElementById('country-wrapper');
const countryDisplay    = document.getElementById('country-display');
const countryDisplayTxt = document.getElementById('country-display-text');
const countrySearch     = document.getElementById('country-search');
const countryList       = document.getElementById('country-list');
const countryInput      = document.getElementById('country-input'); // hidden input
const stateSelect       = document.getElementById('state-county');

// Dito natin itatago ang lahat ng country + states mula sa API
// Format: { "Philippines": ["Metro Manila", "Palawan", ...], ... }
let countryData = {};

// Lahat ng country names para sa filtering ng search
let allCountries = [];

// ============================================================
// Toggle — buksan/isara ang dropdown kapag na-click ang display
// ============================================================
countryDisplay.addEventListener('click', function () {
    countryWrapper.classList.toggle('open');

    // Focus sa search box kapag binuksan
    if (countryWrapper.classList.contains('open')) {
        countrySearch.focus();
    }
});

// ============================================================
// Isara ang dropdown kapag nag-click sa labas
// ============================================================
document.addEventListener('click', function (e) {
    if (!countryWrapper.contains(e.target)) {
        countryWrapper.classList.remove('open');
    }
});

// ============================================================
// Search — i-filter ang listahan habang nagta-type
// ============================================================
countrySearch.addEventListener('input', function () {
    const query = countrySearch.value.toLowerCase();

    // Ipakita lang yung mga country na naglalaman ng na-type
    const filtered = allCountries.filter(name =>
        name.toLowerCase().includes(query)
    );

    renderCountryList(filtered);
});

// ============================================================
// I-render ang listahan ng countries sa <ul>
// ============================================================
function renderCountryList(countries) {
    countryList.innerHTML = ''; // i-clear muna

    countries.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;

        // Markahan kung ito ang currently selected
        if (name === countryInput.value) {
            li.classList.add('selected');
        }

        // Kapag pinili ang isang country
        li.addEventListener('click', function () {
            selectCountry(name);
        });

        countryList.appendChild(li);
    });
}

// ============================================================
// Kapag pumili ng country — i-update ang display at i-load states
// ============================================================
function selectCountry(name) {
    countryDisplayTxt.textContent = name;
    countryDisplayTxt.style.color = '#111';

    countryInput.value = name;

    // ✅ idagdag ito — i-clear ang error agad pag may napili na
    countrySelectErrorMsg.classList.remove('show');
    countryLabel.classList.remove('error-text');
    selectDisplayErrorMsg.classList.remove('error-input'); // ito display wrapper or search input mo, depende saan mo nilagay error styling

    countryWrapper.classList.remove('open');
    countrySearch.value = '';

    loadStates(name);
}

// ============================================================
// I-populate ang State dropdown base sa napiling country
// ============================================================
function loadStates(countryName) {
    stateSelect.innerHTML = '<option value="" disabled selected>Select state...</option>';

    const states = countryData[countryName];

    if (states && states.length > 0) {
        stateSelect.disabled = false;
        states.forEach(function (stateName) {
            const option = document.createElement('option');
            option.value = stateName;
            option.textContent = stateName;
            stateSelect.appendChild(option);
        });
    } else {
        // ✅ gamitin natin "N/A" bilang valid value, hindi empty string
        stateSelect.innerHTML = ''; // i-clear muna, wag na gamitin yung "Select state..." placeholder
        const option = document.createElement('option');
        option.value = 'N/A';
        option.textContent = 'No states available';
        option.selected = true; // ✅ awtomatikong naselect
        stateSelect.appendChild(option);
        stateSelect.disabled = true; // optional: i-disable buong select kasi wala namang choice
    }
}

// ============================================================
// Fetch lahat ng countries + states mula sa API
// ============================================================
fetch('https://countriesnow.space/api/v0.1/countries/states')
    .then(response => response.json())
    .then(result => {
        const countries = result.data;

        countries.forEach(country => {
            // I-save ang states — kunin lang ang name string bawat state
            countryData[country.name] = country.states.map(s => s.name);

            // I-collect ang lahat ng country names para sa search
            allCountries.push(country.name);
        });

        // I-render ang buong listahan sa simula
        renderCountryList(allCountries);
    })
    .catch(error => {
        console.error('Hindi ma-fetch ang countries:', error);
    });