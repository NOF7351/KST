// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const navbar = document.querySelector('custom-navbar');
    const mobileBtn = navbar.shadowRoot.querySelector('.mobile-menu-btn');
    const navLinks = navbar.shadowRoot.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        navLinks.style.display = isOpen ? 'none' : 'flex';

        // Change icon
        const icon = mobileBtn.querySelector('i');
        if (isOpen) {
            icon.setAttribute('data-feather', 'menu');
        } else {
            icon.setAttribute('data-feather', 'x');
        }
        feather.replace();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    const icon = mobileBtn.querySelector('i');
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            }
        });
    });
    // Add shadow to navbar on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('custom-navbar');
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});