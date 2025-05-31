document.addEventListener('DOMContentLoaded', function() {
    // Apply Modal
    const applyBtn = document.querySelector('.apply-btn');
    const applyModal = document.querySelector('.apply-modal');
    const closeApplyModal = document.querySelector('.apply-modal .close-modal');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            applyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeApplyModal) {
        closeApplyModal.addEventListener('click', function() {
            applyModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Video Modal
    const playBtn = document.querySelector('.play-btn');
    const videoModal = document.querySelector('.video-modal');
    const closeVideoModal = document.querySelector('.video-modal .close-modal');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', function() {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Save Job Button Toggle
    const saveBtns = document.querySelectorAll('.btn-save');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('saved');
        });
    });

    // Form Submission
    const applyForm = document.querySelector('.modal-form');
    if (applyForm) {
        applyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to your server
            alert('Application submitted successfully!');
            applyModal.classList.remove('active');
            document.body.style.overflow = '';
            this.reset();
        });
    }
});