document.addEventListener('DOMContentLoaded', function() {
    // View Job Button functionality
    document.querySelectorAll('.view-job').forEach(button => {
        button.addEventListener('click', function() {
            const jobRow = this.closest('tr');
            const jobTitle = jobRow.querySelector('strong').textContent;
            const jobLocation = jobRow.querySelector('.job-location span').textContent;
            const createdAt = jobRow.querySelector('td:nth-child(2) p:first-child').textContent;
            const expiryDate = jobRow.querySelector('td:nth-child(2) p:last-child').textContent;
            const status = jobRow.querySelector('.status-tag').textContent;
            
            // Create and show modal with job details
            showJobDetailsModal({
                title: jobTitle,
                location: jobLocation,
                createdAt: createdAt,
                expiryDate: expiryDate,
                status: status
            });
        });
    });

    // Delete Job Button functionality
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.getAttribute('data-job-id');
            const jobTitle = this.closest('tr').querySelector('strong').textContent;
            
            // Show confirmation dialog
            if (confirm(`Are you sure you want to delete "${jobTitle}"?`)) {
                deleteJob(jobId);
            }
        });
    });

    // Mobile menu toggle
    const btnMenuDashboard = document.querySelector('.btn-menu-dashboard');
    const dashboardMenu = document.querySelector('.dashboard-menu');
    
    if (btnMenuDashboard && dashboardMenu) {
        btnMenuDashboard.addEventListener('click', function() {
            dashboardMenu.classList.toggle('active');
        });
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const panelId = this.getAttribute('aria-controls');
            document.getElementById(panelId).classList.add('active');
        });
    });
});

// Function to show job details in a modal
function showJobDetailsModal(job) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <h2>${job.title}</h2>
                <div class="job-details">
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Created:</strong> ${job.createdAt}</p>
                    <p><strong>Expires:</strong> ${job.expiryDate}</p>
                    <p><strong>Status:</strong> <span class="status-tag ${job.status.toLowerCase()}">${job.status}</span></p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add close functionality
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.querySelector('.modal-overlay').remove();
    });
}

// Function to handle job deletion via AJAX
function deleteJob(jobId) {
    fetch(`/companyjobs/${jobId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Remove the job row from the table
            const jobRow = document.querySelector(`.delete[data-job-id="${jobId}"]`).closest('tr');
            jobRow.remove();
            
            // Show success message
            alert('Job deleted successfully!');
            
            // Update the stats counters if needed
            updateStatsCounters();
        } else {
            alert('Failed to delete job: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the job');
    });
}

// Function to update stats counters (if needed)
function updateStatsCounters() {
    // You would implement this based on your actual stats counter implementation
    const postedJobsCount = document.querySelectorAll('#jobsTable tbody tr').length;
    document.querySelector('.stat-card:nth-child(1) h3').textContent = postedJobsCount;
}