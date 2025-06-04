document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    closeMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Submenu Toggle
    const navItems = document.querySelectorAll('.mobile-nav > li > a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('sub-menu')) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle('active');
            }
        });
    });
    
    // Sidebar Toggle for Mobile
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="ph ph-squares-four"></i> Menu';
    sidebarToggle.style.position = 'fixed';
    sidebarToggle.style.bottom = '20px';
    sidebarToggle.style.right = '20px';
    sidebarToggle.style.zIndex = '100';
    sidebarToggle.style.padding = '10px 15px';
    sidebarToggle.style.backgroundColor = 'var(--primary)';
    sidebarToggle.style.color = 'white';
    sidebarToggle.style.border = 'none';
    sidebarToggle.style.borderRadius = '8px';
    sidebarToggle.style.display = 'flex';
    sidebarToggle.style.alignItems = 'center';
    sidebarToggle.style.gap = '8px';
    sidebarToggle.style.cursor = 'pointer';
    
    document.body.appendChild(sidebarToggle);
    
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Gallery Thumbnail Click
    const galleryThumbs = document.querySelectorAll('.gallery-thumbs img');
    const galleryMain = document.querySelector('.gallery-main img');
    
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            galleryMain.src = this.src;
        });
    });
    
    // Favorite Button Toggle
    const favoriteBtns = document.querySelectorAll('.btn-favorite');
    
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Responsive Adjustments
    function handleResize() {
        if (window.innerWidth < 992) {
            sidebar.classList.remove('active');
            sidebarToggle.style.display = 'flex';
        } else {
            sidebar.classList.add('active');
            sidebarToggle.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Simulate active states for demo
    document.querySelectorAll('.sidebar-section a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.sidebar-section a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});