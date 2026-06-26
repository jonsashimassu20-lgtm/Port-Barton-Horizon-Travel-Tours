const hamburger = document.getElementById('hamburger');
const navBar = document.getElementById('nav-bar');
const dropdowns = document.querySelectorAll('.dropdown');

// Toggle hamburger menu open/close
hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navBar.classList.toggle('active');
});

// Sa mobile, dropdown ay nag-o-open sa click, hindi sa hover
dropdowns.forEach(function (dropdown) {
    const link = dropdown.querySelector('a');

    link.addEventListener('click', function (e) {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            e.preventDefault();
            dropdown.classList.toggle('open');

            // Isara ang ibang bukas na dropdowns
            dropdowns.forEach(function (other) {
                if (other !== dropdown) {
                    other.classList.remove('open');
                }
            });
        }
    });
});

// Isara ang menu kapag nag-click sa labas
document.addEventListener('click', function (e) {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        if (!navBar.contains(e.target) && !hamburger.contains(e.target)) {
            navBar.classList.remove('active');
            hamburger.classList.remove('open');
            dropdowns.forEach(function (d) {
                d.classList.remove('open');
            });
        }
    }
});

// I-reset ang estado kapag lumaki ulit ang screen (e.g. rotate ng tablet)
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        navBar.classList.remove('active');
        hamburger.classList.remove('open');
        dropdowns.forEach(function (d) {
            d.classList.remove('open');
        });
    }
});