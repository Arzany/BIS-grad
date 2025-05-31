document.addEventListener('DOMContentLoaded', function() {
    // Avatar Upload Preview
    const avatarUpload = document.getElementById('avatarUpload');
    const avatarPreview = document.getElementById('avatarPreview');
    const defaultIcon = document.querySelector('.avatar-preview .default-icon');
    
    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarPreview.src = e.target.result;
                avatarPreview.style.display = 'block';
                defaultIcon.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Gallery Upload Preview
    const galleryUpload = document.getElementById('galleryUpload');
    const galleryPreview = document.querySelector('.gallery-preview');
    
    galleryUpload.addEventListener('change', function(e) {
        galleryPreview.innerHTML = '';
        
        Array.from(e.target.files).forEach(file => {
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    galleryPreview.appendChild(img);
                }
                reader.readAsDataURL(file);
            }
        });
    });
    
    // Category Selector (simplified)
    const categoryInput = document.querySelector('.category-selector input');
    const selectedCategories = document.querySelector('.selected-categories');
    
    // Sample categories
    const categories = [
        'Graphic & Design', 'Digital Marketing', 'Programming & Tech',
        'Writing & Translation', 'Video & Animation', 'Music & Audio',
        'AI Services', 'Photography'
    ];
    
    categoryInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filtered = categories.filter(cat => 
            cat.toLowerCase().includes(searchTerm)
        );
        
        // In a real app, you would show these in a dropdown
        console.log('Filtered categories:', filtered);
    });
    
    // Form submission
    const form = document.querySelector('.profile-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Profile saved successfully!');
    });
    
    // Responsive menu toggle (for mobile)
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="icon-menu"></i> Menu';
    menuToggle.style.display = 'none';
    document.body.appendChild(menuToggle);
    
    function checkScreenSize() {
        if (window.innerWidth < 768) {
            menuToggle.style.display = 'flex';
            document.querySelector('.sidebar').style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            document.querySelector('.sidebar').style.display = 'block';
        }
    }
    
    menuToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    });
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});