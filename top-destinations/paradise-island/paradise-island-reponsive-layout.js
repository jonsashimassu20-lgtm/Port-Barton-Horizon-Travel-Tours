
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navBar = document.getElementById('nav-bar');

    if (hamburger && navBar) {
        hamburger.addEventListener('click', () => {
            navBar.classList.toggle('active');
        });
    }
});