const detailsCol = document.getElementById('booking-details-col');
const summaryCol = document.getElementById('order-summary-col');
const emptyMessage = document.getElementById('empty-cart-message');
const cartItemsContainer = document.getElementById('cart-items-container');

function renderCart() {

    const raw = localStorage.getItem('bookingData');

    if (!raw || raw === '[]') {
        detailsCol.style.display = 'none';
        summaryCol.style.display = 'none';
        emptyMessage.style.display = 'flex';
        return;
    }

    let parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
        parsed = [parsed];
        localStorage.setItem('bookingData', JSON.stringify(parsed));
    }

    detailsCol.style.display = 'block';
    summaryCol.style.display = 'block';
    emptyMessage.style.display = 'none';

    cartItemsContainer.innerHTML = '';
    let grandTotal = 0;


    parsed.forEach((booking, index) => {
        const adultQty = parseInt(booking.adults) || 0;
        const childQty = parseInt(booking.children) || 0;
        const adultPrice = parseInt(booking.priceAdult) || 1500;
        const childPrice = parseInt(booking.priceChild) || 750;

        const adultTotal = adultQty * adultPrice;
        const childTotal = childQty * childPrice;
        grandTotal += adultTotal + childTotal;

        const childRow = childQty > 0 ? `
            <div class="variant-row">
                <span class="price-col">&#8369; ${childPrice.toLocaleString()} <small>(C)</small></span>
                <span class="qty-col">${childQty}</span>
                <span class="sub-col">&#8369; ${childTotal.toLocaleString()}</span>
            </div>
        ` : '';

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div class="col-product product-info">
                    <img src="${booking.image || '/image_slider/tourA2.png'}" class="thumbnail-cart" />
                    <div class="product-text">
                        <h3>${booking.tourName || 'Port Barton Tour Package B (Private)'}</h3>
                        <p><strong>Booking Date:</strong><br>${booking.date}</p>
                    </div>
                </div>
                <div class="col-variants">
                    <div class="variant-row">
                        <span class="price-col">&#8369; ${adultPrice.toLocaleString()} <small>(A)</small></span>
                        <span class="qty-col">${adultQty}</span>
                        <span class="sub-col">&#8369; ${adultTotal.toLocaleString()}</span>
                    </div>
                    ${childRow}
                </div>
                <div class="col-action">
                    <button class="btn-trash" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    let displayTotal = grandTotal;

    const appliedCoupon = localStorage.getItem('appliedCoupon');

    if (appliedCoupon === "HORIZON10") {

        const discountAmount = grandTotal * 0.10;
        displayTotal = grandTotal - discountAmount;

        localStorage.setItem('discountedTotal', displayTotal);
    } else {
        localStorage.setItem('discountedTotal', grandTotal);
    }

    document.getElementById('cart-subtotal').textContent = grandTotal.toLocaleString();
    document.getElementById('cart-total').textContent = displayTotal.toLocaleString();

    cartItemsContainer.querySelectorAll('.btn-trash').forEach(btn => {
        btn.addEventListener('click', () => {
            removeItem(parseInt(btn.getAttribute('data-index')));
        });
    });
}

function removeItem(index) {

    let cartArray = JSON.parse(localStorage.getItem('bookingData'));

    if (!Array.isArray(cartArray)) cartArray = [cartArray];
    cartArray.splice(index, 1);
    if (cartArray.length === 0) {
        localStorage.removeItem('bookingData');
    } else {
        localStorage.setItem('bookingData', JSON.stringify(cartArray));
    }
    renderCart();
    updateCartBadge();
}

renderCart();


const proceedCheckOut = document.getElementById('checkout-btn');

proceedCheckOut.addEventListener('click', (e) => {

    e.preventDefault();

    window.location.href = '/check-out/check-out.html';

});

const couponInput = document.getElementById('coupon');
const submitBtnCoupon = document.getElementById('btn-coupon');

submitBtnCoupon.addEventListener('click', () => {

    const enteredCode = couponInput.value.toUpperCase();

    if (enteredCode === "HORIZON10") {

        localStorage.setItem('appliedCoupon', enteredCode);

        alert("Success! 10% discount applied.");

        renderCart();
    } else {
        alert("Invalid coupon code. Please try again.");
    }
    couponInput.value = "";
});