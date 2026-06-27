const toursContainer = document.querySelector('.tours-from-cart');
const totalContainer = document.querySelector('.total-title');
const subtotalContainer = document.querySelector('.subtotal-title');

const savedCart = JSON.parse(localStorage.getItem('bookingData')) || [];

const rawBookingData = localStorage.getItem('bookingData');


function loadCheckout() {
    if (rawBookingData === null || rawBookingData === '[]') {

        window.location.href = '../cart/cart.html';
    }
    return;
}
loadCheckout();

let grandTotal = 0;
// ── I-loop ang cart para i-display ang bawat item ──
savedCart.forEach(tour => {
    let tourTotalPrice = 0;
    let descriptionHTML = "";
    let displayName = "";

    // 1. Tignan kung GoPro Rental o Tour Package
    if (tour.equipmentType === "GoPro Rental" || tour.equipmentType === "Motorcycle Rental" 
        || tour.equipmentType === "Drone Rental" || tour.equipmentType === "Vios(sedan) Rental" 
    || tour.equipmentType === "Hilux(pick up) Rental" || tour.equipmentType === "Fortuner(suv) Rental") {
        // LOGIC PARA SA GOPRO
        tourTotalPrice = parseInt(tour.price) || 0;
        displayName = tour.equipmentType;

        // Kunin ang number of days (i-strip ang "Days" text)
        const days = parseInt(tour.equipment) || 0;
        const rate = getRateLabel(days, tour.equipmentType); // Gamitin ang function sa baba

        // Ipakita ang Rate per Day sa halip na Adults/Children
        descriptionHTML = `<small style="display: block;">Rate: ${rate} <br> Duration: ${tour.equipment}</small>`;

    } else {
        // LOGIC PARA SA TOUR PACKAGE (Existing logic mo)
        const adultQty = parseInt(tour.adults) || 0;
        const childQty = parseInt(tour.children) || 0;
        const adultPrice = parseInt(tour.priceAdult) || 1500;
        const childPrice = parseInt(tour.priceChild) || 750;

        tourTotalPrice = (adultQty * adultPrice) + (childQty * childPrice);
        descriptionHTML = `<small>(${adultQty} Adults, ${childQty} Children)</small>`;
        displayName = tour.tourName || 'Port Barton Tour Package A';
    }

    grandTotal += tourTotalPrice;

    let imageFit = "cover";

    if(tour.equipmentType === "Vios(sedan) Rental" || tour.equipmentType === "Hilux(pick up) Rental" 
        || tour.equipmentType === "Fortuner(suv) Rental" ) {
        imageFit = "contain";
    }

    // 2. I-render ang row
    let itemRow = document.createElement('div');
    itemRow.style.display = 'flex';
    itemRow.style.justifyContent = 'space-between';

    itemRow.innerHTML = `
        <div class="product-name" style="flex: 3; display: flex; align-items: center; gap: 5px; font-size: 11px;  color: #555; padding-top: 15px; border-bottom: 0.5px solid #e5e7eb; padding-bottom: 15px;">
            <img src="${tour.image || tour.Image || '/image_slider/tourA2.png'}" 
                 style="width: 50px; height: 50px; border-radius: 6px; object-fit: ${imageFit};" 
                 alt="Product Image">
            <div>
                <p style="margin: 0; font-weight: 600; color: #111;">${displayName}</p>
                <small style="display: block; color: #111;">Booking Date: ${tour.date}</small>
                ${descriptionHTML}
            </div>
        </div>
        <div class="sub-total" style="flex: 1; display: flex; align-items: center; justify-content: flex-end; color: #e51111; border-bottom: 0.5px solid #e5e7eb;">
            <p style="margin: 0;">₱${tourTotalPrice.toLocaleString()}</p>
        </div>
    `;

    toursContainer.appendChild(itemRow);
});

// I-display ang subtotal at total
if (subtotalContainer) {
    subtotalContainer.innerHTML = `<p>Subtotal:</p><p>₱${grandTotal.toLocaleString()}</p>`;
}
if (totalContainer) {
    totalContainer.innerHTML = `<p>Total:</p><p>₱${grandTotal.toLocaleString()}</p>`;
}

// Siguraduhing nandito pa rin ang function na ito sa dulo
function getRateLabel(days, equipmentType) {
        if (equipmentType === "GoPro Rental") {

        if (days >= 1 && days <= 7) return "₱500/day";
        if (days >= 8 && days <= 14) return "₱450/day";
        if (days >= 15 && days <= 30) return "₱400/day";
        return "₱350/day"; // Para sa 31 hanggang 45 days

    } else if (equipmentType === "Motorcycle Rental") {

        if (days >= 1 && days <= 7) return "₱800/day";
        if (days >= 8 && days <= 14) return "₱700/day";
        if (days >= 15 && days <= 30) return "₱600/day";
        return "₱500/day";

    } else if (equipmentType === "Drone Rental") {

        if (days >= 1 && days <= 7) return "₱1,500/day";
        if (days >= 8 && days <= 14) return "₱1,300/day";
        if (days >= 15 && days <= 30) return "₱1,100/day";
        return "₱900/day";
        
    } else if(equipmentType === "Vios(sedan) Rental") {

        if (days >= 1 && days <= 7) return "₱1,500/day";
        if (days >= 8 && days <= 14) return "₱1,400/day";
        if (days >= 15 && days <= 30) return "₱1,300/day";
        return "₱1,200/day";
    } else if (equipmentType === "Fortuner(suv) Rental") { 

        if (days >= 1 && days <= 7) return "₱3,500/day";
        if (days >= 8 && days <= 14) return "₱3,300/day";
        if (days >= 15 && days <= 30) return "₱3,100/day";
        return "₱2,800/day";
    }
}