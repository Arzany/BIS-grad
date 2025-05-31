// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenuBtn = document.querySelector('.close-menu');

if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
}

// Sidebar Toggle for Dashboard
const sidebarToggle = document.querySelector('.sidebar-toggle');
const dashboardSidebar = document.querySelector('.dashboard-sidebar');

if (sidebarToggle && dashboardSidebar) {
    sidebarToggle.addEventListener('click', () => {
        dashboardSidebar.classList.toggle('active');
    });
}

// Search functionality for the table
function setupTableSearch() {
    const searchInput = document.querySelector('.search-form input');
    const jobTable = document.querySelector('.jobs-table tbody');
    
    if (!searchInput || !jobTable) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const rows = jobTable.querySelectorAll('tr');
        
        if (searchTerm === '') {
            // Show all rows if search is empty
            rows.forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        rows.forEach(row => {
            // Get all text content from the row
            const rowText = row.textContent.toLowerCase();
            
            if (rowText.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupTableSearch();
    
    // Other initialization code can go here
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Modal functionality
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // View Job and Delete buttons in table
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', () => {
            const viewJobModal = document.getElementById('view-job-modal');
            if (viewJobModal) {
                viewJobModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const deleteModal = document.getElementById('delete-modal');
            if (deleteModal) {
                deleteModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Confirm delete action
    const confirmDeleteBtn = document.querySelector('.btn-danger');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            const deleteModal = document.getElementById('delete-modal');
            if (deleteModal) {
                deleteModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            // Here you would add your actual delete logic
            console.log('Item deleted');
        });
    }
    
    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth >= 1200 && dashboardSidebar) {
            dashboardSidebar.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    const sortDropdown = document.querySelector('.sort-dropdown select');
    const table = document.querySelector('.jobs-table table');
    const tbody = table.querySelector('tbody');
    
    // حفظ الترتيب الأصلي للصفوف
    const originalRows = Array.from(tbody.querySelectorAll('tr'));
    
    sortDropdown.addEventListener('change', function() {
        const selectedOption = this.value;
        
        if (selectedOption === 'Sort by (default)') {
            // إعادة الترتيب الأصلي
            const currentRows = Array.from(tbody.querySelectorAll('tr'));
            currentRows.forEach(row => tbody.removeChild(row));
            originalRows.forEach(row => tbody.appendChild(row));
        } else {
            sortTable(selectedOption);
        }
    });

    function sortTable(option) {
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((rowA, rowB) => {
            let valueA, valueB;

            switch(option) {
                case 'Title (A → Z)':
                    valueA = rowA.querySelector('.job-title').textContent.toLowerCase();
                    valueB = rowB.querySelector('.job-title').textContent.toLowerCase();
                    return valueA.localeCompare(valueB);
                
                case 'Title (Z → A)':
                    valueA = rowA.querySelector('.job-title').textContent.toLowerCase();
                    valueB = rowB.querySelector('.job-title').textContent.toLowerCase();
                    return valueB.localeCompare(valueA);
                
                case 'Date (newest)':
                    valueA = new Date(rowA.cells[1].textContent);
                    valueB = new Date(rowB.cells[1].textContent);
                    return valueB - valueA;
                
                case 'Date (oldest)':
                    valueA = new Date(rowA.cells[1].textContent);
                    valueB = new Date(rowB.cells[1].textContent);
                    return valueA - valueB;
                
                case 'Cost (high to low)':
                    valueA = parseFloat(rowA.cells[2].textContent.replace(' LE.', '').trim());
                    valueB = parseFloat(rowB.cells[2].textContent.replace(' LE.', '').trim());
                    return valueB - valueA;
                
                case 'Cost (low to high)':
                    valueA = parseFloat(rowA.cells[2].textContent.replace(' LE.', '').trim());
                    valueB = parseFloat(rowB.cells[2].textContent.replace(' LE.', '').trim());
                    return valueA - valueB;
                
                default:
                    return 0;
            }
        });

        // إزالة الصفوف الحالية
        rows.forEach(row => tbody.removeChild(row));
        
        // إضافة الصفوف المرتبة
        rows.forEach(row => tbody.appendChild(row));
    }
});