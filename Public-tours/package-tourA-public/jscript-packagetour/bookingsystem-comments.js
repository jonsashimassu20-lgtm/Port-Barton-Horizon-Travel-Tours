// ==========================================
// 1. PAG-TARGET SA MGA HTML ELEMENTS (DOM)
// ==========================================
// Kinukuha natin ang mga input fields kung saan nagta-type ang user
const adults = document.getElementById('adults');
const children = document.getElementById('children');

// Kinukuha natin ang mga bahagi ng kalendaryo
const daysContainer = document.getElementById('days-container'); // Dito ilalagay ang mga numero ng araw
const prevMonth = document.getElementById('prev-month');         // Button para sa nakaraang buwan
const nextMonth = document.getElementById('next-month');         // Button para sa susunod na buwan
const monthNameDisplay = document.getElementById('month-display'); // Text na nagpapakita ng "JANUARY 2026" atbp.

// ==========================================
// 2. SETUP NG KALENDARYO (VARIABLES)
// ==========================================
// Array ng mga pangalan ng buwan para madaling i-display
const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST",
    "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

// Kinukuha ang eksaktong petsa, buwan, at taon ngayon
let currentDate = new Date();
let currentMonth = currentDate.getMonth();   // 0 = Jan, 1 = Feb, ..., 11 = Dec
let currentYear = currentDate.getFullYear(); // Halimbawa: 2026

// ==========================================
// 3. NAVIGATION NG KALENDARYO (BUTTONS)
// ==========================================
// Kapag kinlik ang "Next Month" button
nextMonth.addEventListener('click', function (e) {
    e.preventDefault(); // Pinipigilan ang pag-refresh ng page
    currentMonth++;     // Dinadagdagan ng 1 ang buwan
    
    // Kung lumagpas na sa Disyembre (11), ibabalik sa Enero (0) at magdadagdag ng 1 taon
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear); // I-drawing ulit ang kalendaryo gamit ang bagong buwan
});

// Kapag kinlik ang "Previous Month" button
prevMonth.addEventListener('click', function (e) {
    e.preventDefault(); // Pinipigilan ang pag-refresh ng page
    currentMonth--;     // Binabawasan ng 1 ang buwan
    
    // Kung bumaba sa Enero (0), ibabalik sa Disyembre (11) at babawasan ng 1 taon
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear); // I-drawing ulit ang kalendaryo
});

// ==========================================
// 4. ANG PUSO NG KALENDARYO (RENDERING)
// ==========================================
function renderCalendar(month, year) {
    // Nililinis muna natin ang laman ng kalendaryo para hindi magpatung-patong
    daysContainer.innerHTML = '';

    // Ina-update ang text sa itaas (Halimbawa: "MARCH 2026")
    monthNameDisplay.textContent = months[month] + " " + year;

    // Kinukuha ang kabuuang bilang ng araw sa kasalukuyang buwan (Hal: 31)
    let lastDay = new Date(year, month + 1, 0).getDate();
    
    // Inaalam kung anong araw (Sunday=0, Monday=1) magsisimula ang unang petsa ng buwan
    let firstDayIndex = new Date(year, month, 1).getDay();
    
    // Kinukuha ang kabuuang bilang ng araw sa NAKARAANG buwan
    let prevLastDay = new Date(year, month, 0).getDate();

    // -- GUMAGAWA NG BLANKONG ARAW (Para sa nakaraang buwan) --
    // Nilalagyan ng mga kulay abong numero ang unahan ng kalendaryo bago mag-petsa 1
    for (let x = 0; x < firstDayIndex; x++) {
        const blankDay = document.createElement('div');
        blankDay.textContent = prevLastDay - firstDayIndex + x + 1; // Kinocompute ang tamang petsa
        blankDay.classList.add('inactive-day'); // Nilalagyan ng CSS class para maging mukhang inactive
        daysContainer.appendChild(blankDay);    // Ipinapasok sa HTML
    }

    // -- LOGIC PARA SA KASALUKUYANG ARAW (TODAY) --
    const today = new Date();
    let todayNumber = today.getDate();
    // Tinitingnan kung ang nakabukas na buwan sa kalendaryo ay ang buwan natin ngayon
    let isCurrentMonth = (month === today.getMonth() && year === today.getFullYear());

    // Kung nasa kasalukuyang buwan tayo, idi-disable ang "prev" button para hindi makapag-book sa nakaraan
    if (month === today.getMonth() && year === today.getFullYear()) {
        prevMonth.classList.add('disabled-btn');
    } else {
        prevMonth.classList.remove('disabled-btn');
    }

    // -- GUMAGAWA NG MGA ARAW PARA SA KASALUKUYANG BUWAN --
    for (let i = 1; i <= lastDay; i++) {
        const newDay = document.createElement('div');
        newDay.textContent = i; // Inilalagay ang numero ng araw (1 hanggang 30/31)

        // Kapag may nag-click sa isang araw:
        newDay.addEventListener('click', () => {
            // Tatanggalin muna ang highlight sa lahat ng araw
            document.querySelectorAll('.calendar-numbers-grid div').forEach(el => el.classList.remove('selected-day'));
            
            // Iha-highlight ang araw na kinlik
            newDay.classList.add('selected-day');

            // I-save ang napiling petsa sa isang hidden input (Format: YYYY-MM-DD)
            document.getElementById('selected-date').value = `${year}-${month + 1}-${i}`;

            // I-update ang presyo dahil may napili nang petsa
            updateBookingDisplay();
            
            // Tanggalin ang red error border (kung meron)
            calendarWrapper.classList.remove('error-border');
        });

        // Kung ang petsa ay lumipas na (past day), hindi ito pwedeng i-click/i-book
        if (isCurrentMonth && i < todayNumber) {
            newDay.classList.add('past-day');
            newDay.title = "This date is not available";
        } else {
            newDay.title = "This date is available";
        }

        // Ipinapasok ang nabuong araw sa HTML
        daysContainer.appendChild(newDay);
    }

    // -- GUMAGAWA NG BLANKONG ARAW (Para sa susunod na buwan) --
    // Tinitiyak na pantay ang bilang ng kahon sa kalendaryo (35 o 42 cells)
    let totalCells = (firstDayIndex + lastDay > 35) ? 42 : 35;
    let nextDayCount = totalCells - (firstDayIndex + lastDay);

    // Nilalagyan ng mga petsa (1, 2, 3...) para punuan ang natitirang espasyo
    for (let j = 1; j <= nextDayCount; j++) {
        const nextMonthDay = document.createElement('div');
        nextMonthDay.textContent = j;
        nextMonthDay.classList.add('next-month-day');
        nextMonthDay.title = "This date is available";

        // Kapag kinlik ang araw ng susunod na buwan, awtomatikong lilipat ang kalendaryo
        nextMonthDay.addEventListener('click', function () {
            nextMonth.click();
        });

        daysContainer.appendChild(nextMonthDay); // Ipinapasok sa HTML
    }
}

// Tinatawag ang function para i-drawing ang kalendaryo pagka-load ng page
renderCalendar(currentMonth, currentYear);

// ==========================================
// 5. COMPUTATION NG PRESYO
// ==========================================
function updateBookingDisplay() {
    const dateValue = document.getElementById('selected-date').value;
    // Kinukuha ang bilang ng adults at children (kung walang laman, gagawing 0)
    const numAdults = parseInt(document.getElementById('adults').value) || 0;
    const numChildren = parseInt(document.getElementById('children').value) || 0;
    const displayDiv = document.getElementById('total-price');

    // Kung walang napiling petsa, maglalabas ng error message
    if (dateValue === "") {
        displayDiv.textContent = "Date is required - Please choose one above";
        displayDiv.classList.remove('has-price');
    } else {
        // PORMULA NG PRESYO: (Adults * 1500) + (Children * 750)
        // DITO MO BABAGUHIN PARA SA GOPRO RENTAL (Hal: unitPrice * rentalDays)
        const total = (numAdults * 1500) + (numChildren * 750);

        // I-di-display ang computed na presyo na may tamang comma (toLocaleString)
        displayDiv.textContent = `Booking Cost: ₱${total.toLocaleString()}`;
        displayDiv.classList.add('has-price');
    }
}

// Kapag may nagbago (nag-type/nag-adjust) sa Adults o Children, i-compute ulit ang presyo
adults.addEventListener('input', updateBookingDisplay);
children.addEventListener('input', updateBookingDisplay);

// ==========================================
// 6. BOOKING SUBMISSION & LOCALSTORAGE (CART)
// ==========================================
const bookbtn = document.querySelector('.btn-booking');
const calendarWrapper = document.querySelector('.calendar-wrapper');

// Kapag pinindot ang "Book Now" button
bookbtn.addEventListener('click', (event) => {
    event.preventDefault(); // Pinipigilan ang default form submission para tayo ang mag-handle

    const selectedDate = document.getElementById('selected-date').value;

    // VALIDATION: Kung walang petsa, bawal magpatuloy
    if (selectedDate === "") {
        calendarWrapper.classList.add('error-border'); // Nilalagyan ng red border ang kalendaryo
        alert("Please select the options for your booking and make sure duration rules apply.");
    } else {
        calendarWrapper.classList.remove('error-border');

        // 1. GAGAWA NG OBJECT (Gagawin natin itong package na ipapadala sa Cart)
        // PARA SA GOPRO, palitan mo ang properties dito (e.g., item: "GoPro Hero", duration: "3 Days")
        const newBooking = {
            tourName: "Port Barton Tour Package A", 
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value,
            date: selectedDate,
            priceAdult: 1500,
            priceChild: 750,
            image: '/image_slider/tourA2.png'
        };

        // 2. KUKUNIN ANG DATI NANG LAMAN NG CART MULA SA SYSTEM (localStorage)
        // Kung walang laman, gagawa ng blankong listahan o array []
        let cartArray = JSON.parse(localStorage.getItem('bookingData')) || [];

        // 3. IDADAGDAG ang bagong booking sa hulihan ng listahan
        cartArray.push(newBooking);

        // 4. I-SE-SAVE ULIT ang buong listahan pabalik sa localStorage bilang String
        localStorage.setItem('bookingData', JSON.stringify(cartArray));

        // 5. ILILIPAT ang user papunta sa Cart page para makita ang na-book nila
        window.location.href = '../../cart/cart.html';
    }
});