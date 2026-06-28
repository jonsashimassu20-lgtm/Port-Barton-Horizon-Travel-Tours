function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');

    const rawData = localStorage.getItem('bookingData');

    let totalItems = 0;

    if(rawData) {

        const parsedData = JSON.parse(rawData);

        totalItems = parsedData.length;
    }

    if(badge) {
        badge.innerHTML = totalItems;

        if(totalItems === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
            badge.innerHTML = totalItems;
        };
    }
}

updateCartBadge();