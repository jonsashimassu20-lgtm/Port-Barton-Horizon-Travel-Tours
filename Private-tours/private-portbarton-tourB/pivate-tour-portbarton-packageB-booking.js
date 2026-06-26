const adults = document.getElementById('adults');
const children = document.getElementById('children');

const daysContainer = document.getElementById('days-container');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');
const monthNameDisplay = document.getElementById('month-display');

const months = [" JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST",
    "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]


let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();


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


    for (let x = 0; x < firstDayIndex; x++) {
        const blankDay = document.createElement('div');
        blankDay.textContent = prevLastDay - firstDayIndex + x + 1;
        blankDay.classList.add('inactive-day');

        daysContainer.appendChild(blankDay);
    }


    const today = new Date();
    let todayNumber = today.getDate();

    let isCurrentMonth = (month === today.getMonth() && year === today.getFullYear());

    if (month === today.getMonth() && year === today.getFullYear()) {
        prevMonth.classList.add('disabled-btn');
    } else {
        prevMonth.classList.remove('disabled-btn');
    }


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


function updateBookingDisplay() {

    const dateValue = document.getElementById('selected-date').value;
    const numAdults = parseInt(document.getElementById('adults').value) || 0;
    const numChildren = parseInt(document.getElementById('children').value) || 0;
    const displayDiv = document.getElementById('total-price');

    if (dateValue === "") {
        displayDiv.textContent = "Date is required - Please choose one above";
        displayDiv.classList.remove('has-price');
    } else {
        const total = (numAdults * 4000) + (numChildren * 2000);

        displayDiv.textContent = `Booking Cost: ₱${total.toLocaleString()}`;
        displayDiv.classList.add('has-price');
    }
}
adults.addEventListener('input', updateBookingDisplay);
children.addEventListener('input', updateBookingDisplay);

const bookbtn = document.querySelector('.btn-booking');
const calendarWrapper = document.querySelector('.calendar-wrapper');

bookbtn.addEventListener('click', (event) => {
    event.preventDefault();

    const selectedDate = document.getElementById('selected-date').value;

    if (selectedDate === "") {
        calendarWrapper.classList.add('error-border');
        alert("Please select the options for your booking and make sure duration rules apply.");
    } else {
        calendarWrapper.classList.remove('error-border');

        // 1. I-setup ang BAGONG booking
        const newBooking = {
            tourName: "Port Barton Tour Package B (Private)", // Maganda itong idagdag para sa cart label
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value,
            date: selectedDate,
            priceAdult: 4000,
            priceChild: 2000,
            image: '/Public-tours/package-tourB-public/images/package-tourB3.jpg'
        };

        // 2. KUNIN ang lumang listahan (Array) mula sa localStorage. 
        // Kung walang laman, gagawa tayo ng empty array `[]`
        let cartArray = JSON.parse(localStorage.getItem('bookingData')) || [];

        // 3. IDAGDAG (push) ang bagong booking sa listahan
        cartArray.push(newBooking);

        // 4. I-SAVE ulit ang BUONG listahan pabalik sa localStorage
        localStorage.setItem('bookingData', JSON.stringify(cartArray));

        // 5. I-redirect sa cart
        window.location.href = '../../cart/cart.html';
    }
});






