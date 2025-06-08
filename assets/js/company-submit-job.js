document.addEventListener('DOMContentLoaded', function() {
    // Image Upload Preview
    function setupImageUpload(inputId, previewId) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        
        if (input && preview) {
            input.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.src = e.target.result;
                        preview.style.display = 'block';
                        preview.previousElementSibling.style.display = 'none';
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    setupImageUpload('logo', 'logo-preview');
    setupImageUpload('banner', 'banner-preview');
    
    // Tags Input Functionality
    const tagsInput = document.getElementById('tags');
    const tagsContainer = document.querySelector('.tags-container');
    
    if (tagsInput && tagsContainer) {
        tagsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const tagText = this.value.trim();
                if (tagText) {
                    addTag(tagText);
                    this.value = '';
                }
            }
        });
        
        function addTag(text) {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerHTML = `
                ${text}
                <span class="tag-remove">×</span>
            `;
            tagsContainer.appendChild(tag);
            
            tag.querySelector('.tag-remove').addEventListener('click', function() {
                tag.remove();
            });
        }
    }
    
    
    
    
    // Questions Management
    const questionsContainer = document.querySelector('.questions-list');
    
    // Add Question Button with placeholder
    const addQuestionBtn = document.querySelector('.btn-add-question');
    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', function() {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Please write your question...';
            input.className = 'question-input';
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn-remove-question';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', function() {
                questionDiv.remove();
            });
            
            questionDiv.appendChild(input);
            questionDiv.appendChild(removeBtn);
            questionsContainer.insertBefore(questionDiv, addQuestionBtn);
            
            // Focus on the new input field
            input.focus();
        });
    }
    
    // Remove All Questions Button
    const removeAllQuestionsBtn = document.createElement('button');
    removeAllQuestionsBtn.type = 'button';
    removeAllQuestionsBtn.className = 'btn-remove-all';
    removeAllQuestionsBtn.innerHTML = '<span>×</span> Remove All Questions';
    removeAllQuestionsBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to remove all questions?')) {
            const questions = questionsContainer.querySelectorAll('.question-item');
            questions.forEach(question => question.remove());
        }
    });
    
    // Add remove button next to add button
    if (addQuestionBtn) {
        addQuestionBtn.parentNode.insertBefore(removeAllQuestionsBtn, addQuestionBtn.nextSibling);
    }
    
    // Add remove buttons to existing questions
    const existingQuestions = document.querySelectorAll('.question-item');
    existingQuestions.forEach(question => {
        // Add placeholder to existing questions
        const input = question.querySelector('input');
        if (input && !input.value) {
            input.placeholder = 'Please write your question...';
            input.className = 'question-input';
        }
        
        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'btn-remove-question';
        removeBtn.innerHTML = '×';
        removeBtn.addEventListener('click', function() {
            question.remove();
        });
        question.appendChild(removeBtn);
    });
    
    // Form Submission with Reset
    // const jobForm = document.querySelector('.job-submission-form');
    // if (jobForm) {
    //     jobForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Here you would typically send the form data to the server
            
    //         // Reset form fields
    //         this.reset();
            
    //         // Clear image previews
    //         document.getElementById('logo-preview').style.display = 'none';
    //         document.getElementById('banner-preview').style.display = 'none';
    //         document.querySelector('#logo-upload .placeholder-icon').style.display = 'inline-block';
    //         document.querySelector('#banner-upload .placeholder-icon').style.display = 'inline-block';
            
    //         // Clear tags
    //         if (tagsContainer) {
    //             tagsContainer.innerHTML = '';
    //         }
            
    //         // Clear portfolio files
    //         if (portfolioPreview) {
    //             portfolioPreview.innerHTML = '';
    //         }
            
    //         // Reset questions to default with placeholders
    //         if (questionsContainer) {
    //             questionsContainer.innerHTML = `
    //                 <div class="question-item">
    //                     <input type="text" class="question-input" value="Why do you think you are a suitable candidate?" placeholder="Please write your question...">
    //                     <button type="button" class="btn-remove-question">×</button>
    //                 </div>
    //                 <div class="question-item">
    //                     <input type="text" class="question-input" value="What relevant experience do you have?" placeholder="Please write your question...">
    //                     <button type="button" class="btn-remove-question">×</button>
    //                 </div>
    //                 <div class="question-item">
    //                     <input type="text" class="question-input" value="What are your salary expectations?" placeholder="Please write your question...">
    //                     <button type="button" class="btn-remove-question">×</button>
    //                 </div>
    //             `;
                
    //             // Reattach event listeners to remove buttons
    //             document.querySelectorAll('.btn-remove-question').forEach(btn => {
    //                 btn.addEventListener('click', function() {
    //                     this.parentElement.remove();
    //                 });
    //             });
    //         }
            
    //         alert('Form submitted successfully and all data has been cleared!');
    //     });
    // }
    
    // Responsive Sidebar Toggle (for mobile)
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰ Menu';
    menuToggle.style.display = 'none';
    document.querySelector('.dashboard-header').appendChild(menuToggle);
    
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            sidebar.style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            sidebar.style.display = 'block';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    
    menuToggle.addEventListener('click', function() {
        if (sidebar.style.display === 'none' || !sidebar.style.display) {
            sidebar.style.display = 'block';
        } else {
            sidebar.style.display = 'none';
        }
    });
});