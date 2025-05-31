document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle for dashboard sidebar
    const sidebarToggle = document.createElement('div');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="ph ph-list"></i>';
    document.querySelector('.dashboard-header').appendChild(sidebarToggle);
    
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    sidebarToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if(!sidebar.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Prevent closing when clicking inside sidebar
    sidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Highlight active menu item
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    
    menuLinks.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Simple image gallery functionality
    const galleryThumbs = document.querySelectorAll('.gallery-thumbs img');
    const galleryMain = document.querySelector('.gallery-main img');
    
    if(galleryThumbs.length && galleryMain) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                galleryMain.src = this.src;
                
                // Remove active class from all thumbs
                galleryThumbs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumb
                this.classList.add('active');
            });
        });
        
        // Activate first thumb by default
        galleryThumbs[0].classList.add('active');
    }
    
    // User menu dropdown functionality
    const userMenu = document.querySelector('.user-menu');
    if(userMenu) {
        userMenu.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if(!userMenu.contains(e.target)) {
                userMenu.classList.remove('active');
            }
        });
    }
    
    // Responsive adjustments
    function handleResponsive() {
        if(window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});