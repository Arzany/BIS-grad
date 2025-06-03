document.addEventListener('DOMContentLoaded', function() {
    // ========== وظيفة حذف الصفوف مع تنبيه تأكيدي ========== //
    const jobsTable = document.getElementById('jobsTable');
    if (jobsTable) {
        jobsTable.addEventListener('click', function(e) {
            const deleteBtn = e.target.closest('.action-btn.delete') || 
                            (e.target.classList.contains('ph-trash') && e.target.closest('button'));
            
            if (deleteBtn) {
                e.preventDefault();
                e.stopPropagation();
                
                const rowToDelete = deleteBtn.closest('tr');
                
                if (confirm('Are you sure you want to delete this job?')) {
                    // تأثيرات الحذف المتدرجة
                    rowToDelete.style.transition = 'all 0.3s ease';
                    rowToDelete.style.opacity = '0';
                    rowToDelete.style.height = rowToDelete.offsetHeight + 'px';
                    
                    setTimeout(() => {
                        rowToDelete.style.height = '0';
                        rowToDelete.style.paddingTop = '0';
                        rowToDelete.style.paddingBottom = '0';
                        rowToDelete.style.marginTop = '0';
                        rowToDelete.style.marginBottom = '0';
                        rowToDelete.style.borderTopWidth = '0';
                        rowToDelete.style.borderBottomWidth = '0';
                        rowToDelete.style.overflow = 'hidden';
                        
                        setTimeout(() => {
                            rowToDelete.remove();
                            updateTableCounter();
                        }, 50);
                    }, 10);
                }
            }
        });
    }

    function updateTableCounter() {
        const showingInfo = document.querySelector('.showing-info');
        if (showingInfo) {
            const remainingRows = document.querySelectorAll('#jobsTable tbody tr').length;
            showingInfo.innerHTML = `Showing <span>1</span> to <span>${remainingRows}</span> of <span>${remainingRows}</span> entries`;
        }
    }

    // ========== وظيفة البحث ========== //
    const searchInput = document.querySelector('.search-form input[type="text"]');
    const searchButton = document.querySelector('.search-form button[type="submit"]');
    
    if (searchInput && searchButton) {
        function filterJobs(searchTerm) {
            const rows = document.querySelectorAll('.job-table tbody tr');
            
            rows.forEach(row => {
                const jobTitle = row.querySelector('td:first-child strong')?.textContent.toLowerCase() || '';
                const jobLocation = row.querySelector('.job-location span:last-child')?.textContent.toLowerCase() || '';
                const jobStatus = row.querySelector('.status-tag')?.textContent.toLowerCase() || '';
                const createdDate = row.querySelector('td:nth-child(2) p:first-child')?.textContent.toLowerCase() || '';
                const expiryDate = row.querySelector('td:nth-child(2) p:last-child')?.textContent.toLowerCase() || '';
                
                const match = jobTitle.includes(searchTerm) || 
                             jobLocation.includes(searchTerm) ||
                             jobStatus.includes(searchTerm) ||
                             createdDate.includes(searchTerm) ||
                             expiryDate.includes(searchTerm);
                
                row.style.display = match ? '' : 'none';
            });
        }
        
        searchInput.addEventListener('input', function() {
            filterJobs(this.value.trim().toLowerCase());
        });
        
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            filterJobs(searchInput.value.trim().toLowerCase());
        });
    }

    // ========== القائمة المتنقلة ========== //
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // ========== قائمة Dashboard للجوال ========== //
    const menuDashboardBtn = document.querySelector('.btn-menu-dashboard');
    const dashboardMenu = document.querySelector('.dashboard-menu');
    
    if (menuDashboardBtn && dashboardMenu) {
        menuDashboardBtn.addEventListener('click', function() {
            dashboardMenu.classList.toggle('active');
        });
    }
    
    // ========== وظيفة التبويبات ========== //
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabBtns.length && tabPanels.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.parentElement.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                this.parentElement.classList.add('active');
                const panelId = this.getAttribute('aria-controls');
                document.getElementById(panelId).classList.add('active');
            });
        });
    }
    
    // ========== وظيفة Dropdown ========== //
    const selectWrappers = document.querySelectorAll('.select-wrapper');
    
    selectWrappers.forEach(wrapper => {
        const select = wrapper.querySelector('.select');
        const selected = wrapper.querySelector('.selected');
        const options = wrapper.querySelector('.options');
        const optionsList = wrapper.querySelectorAll('.options li');
        
        if (select && selected && options) {
            select.addEventListener('click', function(e) {
                e.stopPropagation();
                options.style.display = options.style.display === 'block' ? 'none' : 'block';
            });
            
            optionsList.forEach(option => {
                option.addEventListener('click', function() {
                    selected.textContent = this.textContent;
                    selected.dataset.title = this.textContent;
                    options.style.display = 'none';
                });
            });
        }
    });
    
    document.addEventListener('click', function() {
        document.querySelectorAll('.options').forEach(option => {
            option.style.display = 'none';
        });
    });
    
    // ========== وظيفة Modal ========== //
    const modalBtns = document.querySelectorAll('[data-type]');
    const modalOverllay = document.querySelector('.modal-overlay');
    
    if (modalBtns.length && modalOverllay) {
        modalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modalType = this.dataset.type;
                const modal = document.querySelector(`.modal[data-type="${modalType}"]`);
                
                if (modal) {
                    modalOverllay.style.display = 'flex';
                    modal.style.display = 'block';
                }
            });
        });
        
        const closeModalBtns = document.querySelectorAll('.close-modal, .close-popup-btn');
        
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                modalOverllay.style.display = 'none';
                document.querySelectorAll('.modal').forEach(m => {
                    m.style.display = 'none';
                });
            });
        });
        
        modalOverllay.addEventListener('click', function(e) {
            if (e.target === modalOverllay) {
                modalOverllay.style.display = 'none';
                document.querySelectorAll('.modal').forEach(m => {
                    m.style.display = 'none';
                });
            }
        });
    }
    
    // ========== وظيفة Tooltip ========== //
    const tooltipBtns = document.querySelectorAll('.action-btn');
    
    tooltipBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            }
        });
    });
});
