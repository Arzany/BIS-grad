document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const methodTabs = document.querySelectorAll('.method-tab');
    
    methodTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            methodTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically show/hide the appropriate form content
            // For this example, we're just toggling the UI state
        });
    });
    
    // Pagination functionality
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === '>') {
                // Handle next page logic
                return;
            }
            
            // Remove active class from all buttons
            pageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically load the appropriate page of data
            // For this example, we're just toggling the UI state
        });
    });
    
    // Form submission
    const payoutForm = document.querySelector('.payout-form');
    
    if (payoutForm) {
        payoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                // Form is valid, proceed with submission
                alert('Payout method added successfully!');
                // Here you would typically send the data to your backend
            }
        });
    }
    
    function validateForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isValid = false;
                
                // Reset border color when user starts typing
                field.addEventListener('input', function() {
                    this.style.borderColor = '#dee2e6';
                });
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields.');
        }
        
        return isValid;
    }
    
    // Mobile menu toggle (if you add a mobile menu button)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
});