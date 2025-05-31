document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Category Tabs
    const categoryLinks = document.querySelectorAll('.category-link');
    const categoryDetails = document.querySelectorAll('.category-detail');

    categoryLinks.forEach(link => {
        link.addEventListener('click', () => {
            categoryLinks.forEach(l => l.classList.remove('active'));
            categoryDetails.forEach(d => d.classList.remove('active'));

            link.classList.add('active');
            document.getElementById(link.dataset.tab).classList.add('active');
        });
    });

    // Mobile Menu
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('.menu-mobile');
    const closeMenuBtn = document.querySelector('.menu-mobile-close');
    const navLinks = document.querySelectorAll('.nav-mobile > li > a');
    const backButtons = document.querySelectorAll('.back-btn');

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.querySelectorAll('.sub-nav-mobile').forEach(sub => sub.classList.remove('active'));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const subMenu = link.nextElementSibling;
            if (subMenu) {
                subMenu.classList.add('active');
            }
        });
    });

    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.sub-nav-mobile').classList.remove('active');
        });
    });

    // Form Validation
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[type="password"]').value;
            const confirmPassword = form.querySelector('input[id$="confirm-password"]').value;
            const checkbox = form.querySelector('input[type="checkbox"]');

            if (!email || !password || !confirmPassword) {
                alert('Please fill in all required fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            if (!checkbox.checked) {
                alert('You must agree to the Terms of Use.');
                return;
            }

            alert('Account created successfully!');
            form.reset();
        });
    });

    // Scroll to Top
    const scrollBtn = document.querySelector('.scroll-to-top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('active');
        } else {
            scrollBtn.classList.remove('active');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});