const hamburger = document.getElementById('hamburger');
const navBar = document.getElementById('nav-bar');


// Toggle hamburger menu open/close
hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navBar.classList.toggle('active');
});

// 1. I-select natin lahat ng dropdown containers
const dropdowns = document.querySelectorAll('.dropdown');
document.addEventListener('DOMContentLoaded', function () {
    // 1. I-select natin lahat ng dropdown containers
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function (dropdown) {
        // Ngayon, ang hahanapin niya ay yung <span>, hindi yung <i>
        const chevron = dropdown.querySelector('.chevron-trigger');

        if (chevron) {
            // Gumamit din tayo ng 'touchstart' para mabilis ang response sa mobile
            chevron.addEventListener('click', function (e) {
                // ITO ANG PINAKA-IMPORTANTE: 
                // Pinipigilan nito na mag-propagate ang click sa parent links
                e.preventDefault();
                e.stopPropagation(); 

                // I-toggle ang open class para lumabas ang menu
                dropdown.classList.toggle('open');

                // Isara ang ibang bukas na dropdowns para hindi magpatong-patong
                dropdowns.forEach(function (other) {
                    if (other !== dropdown) {
                        other.classList.remove('open');
                    }
                });
            });
        }
    });

    // Isara kapag nag-click kahit saan sa labas
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(function (d) {
                d.classList.remove('open');
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