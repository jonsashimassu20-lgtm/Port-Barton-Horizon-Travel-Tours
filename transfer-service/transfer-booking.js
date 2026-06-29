

// --- DOM Elements ---
const daysContainer = document.getElementById('days-container');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');
const monthNameDisplay = document.getElementById('month-display');
const transferTypeSelect = document.getElementById('transfer-type');
const passengersInput = document.getElementById('passengers');
const totalPriceDisplay = document.getElementById('total-price');
const bookBtn = document.querySelector('.btn-booking');
const calendarWrapper = document.querySelector('.calendar-wrapper');
const priceAmountDisplay = document.getElementById('price-amount');

// --- Route data from HTML ---
const bookingPage = document.getElementById('booking-page');
const routeName = bookingPage.dataset.routeName;
const privatePrice = parseInt(bookingPage.dataset.privatePrice);
const sharedPrice = parseInt(bookingPage.dataset.sharedPrice);
const routeImage = bookingPage.dataset.routeImage;

// --- Calendar state ---
const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// --- Calendar navigation ---
nextMonth.addEventListener('click', function (e) {
    e.preventDefault();
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

prevMonth.addEventListener('click', function (e) {
    e.preventDefault();
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

// --- Calendar rendering ---
function renderCalendar(month, year) {
    daysContainer.innerHTML = '';
    monthNameDisplay.textContent = months[month] + " " + year;

    let lastDay = new Date(year, month + 1, 0).getDate();
    let firstDayIndex = new Date(year, month, 1).getDay();
    let prevLastDay = new Date(year, month, 0).getDate();

    // Previous month trailing days
    for (let x = 0; x < firstDayIndex; x++) {
        const blankDay = document.createElement('div');
        blankDay.textContent = prevLastDay - firstDayIndex + x + 1;
        blankDay.classList.add('inactive-day');
        daysContainer.appendChild(blankDay);
    }

    const today = new Date();
    let todayNumber = today.getDate();
    let isCurrentMonth = (month === today.getMonth() && year === today.getFullYear());

    // Disable prev button on current month
    if (month === today.getMonth() && year === today.getFullYear()) {
        prevMonth.classList.add('disabled-btn');
    } else {
        prevMonth.classList.remove('disabled-btn');
    }

    // Current month days
    for (let i = 1; i <= lastDay; i++) {
        const newDay = document.createElement('div');
        newDay.textContent = i;

        newDay.addEventListener('click', () => {
            document.querySelectorAll('.calendar-numbers-grid div').forEach(el => el.classList.remove('selected-day'));
            newDay.classList.add('selected-day');
            document.getElementById('selected-date').value = `${year}-${month + 1}-${i}`;
            updateBookingDisplay();
            calendarWrapper.classList.remove('error-border');
        });

        if (isCurrentMonth && i < todayNumber) {
            newDay.classList.add('past-day');
            newDay.title = "This date is not available";
        } else {
            newDay.title = "This date is available";
        }

        daysContainer.appendChild(newDay);
    }

    // Next month leading days
    let totalCells = (firstDayIndex + lastDay > 35) ? 42 : 35;
    let nextDayCount = totalCells - (firstDayIndex + lastDay);

    for (let j = 1; j <= nextDayCount; j++) {
        const nextMonthDay = document.createElement('div');
        nextMonthDay.textContent = j;
        nextMonthDay.classList.add('next-month-day');
        nextMonthDay.title = "This date is available";
        nextMonthDay.addEventListener('click', function () {
            nextMonth.click();
        });
        daysContainer.appendChild(nextMonthDay);
    }
}

renderCalendar(currentMonth, currentYear);

// --- Price calculation ---
function updateBookingDisplay() {
    const dateValue = document.getElementById('selected-date').value;
    const transferType = transferTypeSelect.value;
    const numPassengers = parseInt(passengersInput.value) || 1;

    let currentPrice = (transferType === 'private') ? privatePrice : sharedPrice;

    // Update header price display
    priceAmountDisplay.textContent = `₱${currentPrice.toLocaleString()}`;

    if (dateValue === "") {
        totalPriceDisplay.textContent = "Please select a date above";
        totalPriceDisplay.classList.remove('has-price');
    } else {
        let total;
        if (transferType === 'private') {
            // Private = flat rate regardless of passengers
            total = privatePrice;
        } else {
            // Shared = price per person × passengers
            total = sharedPrice * numPassengers;
        }
        totalPriceDisplay.textContent = `Total: ₱${total.toLocaleString()}`;
        totalPriceDisplay.classList.add('has-price');
    }
}

// --- Event listeners for form changes ---
transferTypeSelect.addEventListener('change', updateBookingDisplay);
passengersInput.addEventListener('input', updateBookingDisplay);

// --- Form Validation & Initialization ---
passengersInput.setAttribute('max', '12');

// --- Book Now ---
bookBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const selectedDate = document.getElementById('selected-date').value;
    const transferType = transferTypeSelect.value;
    const numPassengers = parseInt(passengersInput.value) || 1;

    if (selectedDate === "") {
        calendarWrapper.classList.add('error-border');
        alert("Please select the date for your transfer.");
        return;
    }

    if (numPassengers < 1) {
        alert("Please enter at least 1 passenger.");
        return;
    }

    if (numPassengers > 12) {
        alert("Sorry, the maximum capacity for a single van is 12 passengers to ensure enough space for luggage. Please book an additional van for larger groups.");
        return;
    }

    // Build label
    const typeLabel = (transferType === 'private') ? 'Private' : 'Shared';
    const bookingName = `${typeLabel} Van Transfer: ${routeName}`;

    let newBooking;

    if (transferType === 'private') {
        // Private: flat rate — store as 1 adult at full price
        newBooking = {
            tourName: bookingName,
            adults: "1",
            children: "0",
            date: selectedDate,
            priceAdult: privatePrice,
            priceChild: 0,
            image: routeImage
        };
    } else {
        // Shared: per person pricing
        newBooking = {
            tourName: bookingName,
            adults: String(numPassengers),
            children: "0",
            date: selectedDate,
            priceAdult: sharedPrice,
            priceChild: 0,
            image: routeImage
        };
    }

    // Push to localStorage cart
    let cartArray = JSON.parse(localStorage.getItem('bookingData')) || [];
    cartArray.push(newBooking);
    localStorage.setItem('bookingData', JSON.stringify(cartArray));

    // Redirect to cart
    window.location.href = '/cart/cart.html';
});
