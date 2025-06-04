document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const deleteBtn = document.getElementById('deleteBtn');
    const deleteModal = document.getElementById('deleteModal');
    const closeModal = document.querySelector('.close-modal');
    const passwordInput = document.getElementById('password');
    const deleteForm = document.querySelector('.delete-form');
    const modalForm = document.querySelector('.modal-form');
    
    // Show modal when delete button is clicked
    deleteBtn.addEventListener('click', function() {
        if (passwordInput.value.trim() === '') {
            alert('Please enter your password to confirm');
            return;
        }
        
        deleteModal.style.display = 'flex';
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        deleteModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
        }
    });
    
    // Prevent form submission (for demo purposes)
    deleteForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });
    
    // Handle modal form submission
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get selected reason
        const selectedReason = document.querySelector('input[name="reason"]:checked').value;
        const feedback = document.getElementById('feedback').value;
        
        // In a real app, you would send this data to the server
        console.log('Account deletion reason:', selectedReason);
        console.log('Feedback:', feedback);
        
        // Show confirmation and close modal
        alert('Your account deletion request has been submitted.');
        deleteModal.style.display = 'none';
        
        // Reset forms
        deleteForm.reset();
        modalForm.reset();
    });
    
    // Add active class to sidebar links when clicked
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
});