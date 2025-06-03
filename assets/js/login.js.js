document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Here you would typically send this data to your server
            console.log('Login attempt:', { email, password, remember });
            
            // For demo purposes, just show an alert
            alert('Login form submitted! In a real app, this would send data to your server.');
            
            // Redirect to dashboard after successful login
            // window.location.href = 'dashboard.html';
        });
    }
    
    // Handle window resize to adjust mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mainNav) mainNav.style.display = 'flex';
        } else {
            if (mainNav) mainNav.style.display = 'none';
        }
    });
    
    // Initialize mobile menu state
    if (window.innerWidth <= 768 && mainNav) {
        mainNav.style.display = 'none';
    }
});