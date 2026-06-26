const droneInput = document.getElementById('drone');
const monthNameDisplay = document.getElementById('month-display');
const daysContainer = document.getElementById('days-container');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');
const bookbtn = document.querySelector('.btn-booking');
const calendarWrapper = document.querySelector('.calendar-wrapper');
const totalPriceDisplay = document.getElementById('total-price');
const cappedError = document.querySelector('.capped-error');

const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let savedStartTime = null;
let finalComputedPrice = 0;

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

function renderCalendar(month, year) {
    daysContainer.innerHTML = '';
    monthNameDisplay.textContent = months[month] + " " + year;
    let lastDay = new Date(year, month + 1, 0).getDate();
    let firstDayIndex = new Date(year, month, 1).getDay();
    let prevLastDay = new Date(year, month, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let x = 0; x < firstDayIndex; x++) {
        const blankDay = document.createElement('div');
        let dayNum = prevLastDay - firstDayIndex + x + 1;
        blankDay.textContent = dayNum;
        blankDay.classList.add('inactive-day');
        blankDay.dataset.time = new Date(year, month - 1, dayNum).getTime();
        daysContainer.appendChild(blankDay);
    }

    if (month === today.getMonth() && year === today.getFullYear()) {
        prevMonth.classList.add('disabled-btn');
    } else {
        prevMonth.classList.remove('disabled-btn');
    }

    for (let i = 1; i <= lastDay; i++) {
        const newDay = document.createElement('div');
        newDay.textContent = i;
        let thisDayTime = new Date(year, month, i).getTime();
        newDay.dataset.time = thisDayTime;

        newDay.addEventListener('click', () => {
            savedStartTime = thisDayTime;
            document.getElementById('selected-date').value = `${year}-${month + 1}-${i}`;
            if (calendarWrapper) calendarWrapper.classList.remove('error-border');
            applyHighlights();
        });

        if (thisDayTime < today.getTime()) {
            newDay.classList.add('past-day');
            newDay.title = "This date is not available";
        } else {
            newDay.title = "This date is available";
        }
        daysContainer.appendChild(newDay);
    }

    let totalCells = (firstDayIndex + lastDay > 35) ? 42 : 35;
    let nextDayCount = totalCells - (firstDayIndex + lastDay);

    for (let j = 1; j <= nextDayCount; j++) {
        const nextMonthDay = document.createElement('div');
        nextMonthDay.textContent = j;
        nextMonthDay.classList.add('next-month-day');
        nextMonthDay.title = "This date is available";
        nextMonthDay.dataset.time = new Date(year, month + 1, j).getTime();
        nextMonthDay.addEventListener('click', function () {
            nextMonth.click();
        });
        daysContainer.appendChild(nextMonthDay);
    }
    applyHighlights();
}

function applyHighlights() {
    const allDayBoxes = document.querySelectorAll('.calendar-numbers-grid div');
    let duration = parseInt(droneInput.value) || 1;

    if (duration > 45) {
        if (cappedError) cappedError.classList.add('show');
        duration = 45;
        droneInput.value = 45;
    } else if (duration <= 45) {
        if (cappedError) cappedError.classList.remove('show');
    }

    allDayBoxes.forEach(el => el.classList.remove('selected-day'));

    if (!savedStartTime) return;

    let startDateObj = new Date(savedStartTime);
    let endDateObj = new Date(savedStartTime);
    endDateObj.setDate(startDateObj.getDate() + duration - 1);
    let endTime = endDateObj.getTime();

    allDayBoxes.forEach(box => {
        let boxTime = parseInt(box.dataset.time);
        if (boxTime >= savedStartTime && boxTime <= endTime) {
            if (!box.classList.contains('past-day') && !box.classList.contains('inactive-day')) {
                box.classList.add('selected-day');
            }
        }
    });

    updateBookingDisplay();
}

function updateBookingDisplay() {
    if (!savedStartTime) {
        if (totalPriceDisplay) {
            totalPriceDisplay.textContent = "Date is required - Please choose one above";
            totalPriceDisplay.classList.remove('has-price');
        }
        return;
    }

    let duration = parseInt(droneInput.value) || 1;
    if (duration > 45) duration = 45;

    let total = 0;

    if (duration >= 1 && duration <= 7) {
        total = duration * 1500;
    } else if (duration >= 8 && duration <= 14) {
        total = duration * 1300
    } else if (duration >= 15 && duration <= 30) {
        total = duration * 1100;
    } else if (duration >= 31 && duration <= 45) {
        total = duration * 900;
    }

    finalComputedPrice = total;

    if (totalPriceDisplay) {
        totalPriceDisplay.textContent = `Booking Cost: ₱${total.toLocaleString()}`;
        totalPriceDisplay.classList.add('has-price');
    }
}

droneInput.addEventListener('input', applyHighlights);

bookbtn.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedDateStr = document.getElementById('selected-date').value;
    const durationDays = parseInt(droneInput.value) || 1;

    if (selectedDateStr === "") {
        calendarWrapper.classList.add('error-border');
        alert("Please select the options for your booking and make sure duration rules apply.");
    } else {
        calendarWrapper.classList.remove('error-border');
        const startDate = new Date(selectedDateStr);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + (durationDays - 1));

        const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
        const startFormatted = startDate.toLocaleDateString('en-US', dateOptions).replace(/\//g, '-');
        const endFormatted = endDate.toLocaleDateString('en-US', dateOptions).replace(/\//g, '-');
        const finalDateRange = `${startFormatted} to ${endFormatted}`;

        const newBooking = {
            equipmentType: "Drone Rental",
            equipment: `${durationDays} Days`,
            date: finalDateRange,
            price: finalComputedPrice,
            Image: '/rental-equipment/Drone/image/drone1.png'
        };

        let cartArray = JSON.parse(localStorage.getItem('bookingData')) || [];
        cartArray.push(newBooking);
        localStorage.setItem('bookingData', JSON.stringify(cartArray));
        window.location.href = '../../cart/cart.html';
    }
});

renderCalendar(currentMonth, currentYear);