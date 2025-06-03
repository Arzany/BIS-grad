document.addEventListener('DOMContentLoaded', function () {
    // Accordion functionality (if needed)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        });
    });

    // Avatar Upload + Preview + Delete
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');
    const avatarIcon = document.querySelector('.avatar-preview .ph');

    const deleteAvatarBtn = document.createElement('button');
    deleteAvatarBtn.innerHTML = '<i class="ph ph-trash"></i> Delete Photo';
    deleteAvatarBtn.className = 'delete-avatar-btn';
    deleteAvatarBtn.style.display = 'none';
    document.querySelector('.avatar-upload-controls').appendChild(deleteAvatarBtn);

    avatarUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarPreview.src = e.target.result;
                avatarPreview.style.display = 'block';
                avatarIcon.style.display = 'none';
                deleteAvatarBtn.style.display = 'inline-flex';
            };
            reader.readAsDataURL(file);
        }
    });

    deleteAvatarBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete this photo?')) {
            avatarPreview.src = '#';
            avatarPreview.style.display = 'none';
            avatarIcon.style.display = 'block';
            avatarUpload.value = '';
            deleteAvatarBtn.style.display = 'none';
        }
    });

    // CV Upload + Display with delete button
    const cvUpload = document.getElementById('cv-upload');
    const fileListContainer = document.getElementById('file-list-container');

    cvUpload.addEventListener('change', function (e) {
        const files = e.target.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                addFileToUI(file);
            }
            cvUpload.value = '';
        }
    });

    function addFileToUI(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.style.display = 'flex';
        fileItem.style.alignItems = 'center';
        fileItem.style.justifyContent = 'space-between';
        fileItem.style.marginBottom = '10px';
        fileItem.style.border = '1px solid #ccc';
        fileItem.style.padding = '10px';
        fileItem.style.borderRadius = '6px';

        const fileExt = file.name.split('.').pop().toLowerCase();
        let fileIcon = 'ph-file';

        if (fileExt === 'pdf') fileIcon = 'ph-file-pdf';
        else if (fileExt === 'doc' || fileExt === 'docx') fileIcon = 'ph-file-doc';

        fileItem.innerHTML = `
            <div class="file-preview" style="display: flex; align-items: center; gap: 10px;">
                <i class="ph ${fileIcon}" style="font-size: 1.5rem;"></i>
                <div>
                    <span>${file.name}</span><br>
                    <strong>${fileExt.toUpperCase()}</strong>
                </div>
            </div>
            <button class="delete-btn" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                <i class="ph ph-x"></i> Delete
            </button>
        `;

        fileListContainer.appendChild(fileItem);

        fileItem.querySelector('.delete-btn').addEventListener('click', function () {
            if (confirm('Are you sure you want to delete this file?')) {
                fileItem.remove();
            }
        });
    }

    // Tags input
    const tagsInputs = document.querySelectorAll('.tags-input');
    tagsInputs.forEach(tagsInput => {
        const input = tagsInput.querySelector('input');
        const tagsContainer = tagsInput.querySelector('.tags-container');

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && input.value.trim() !== '') {
                e.preventDefault();
                addTag(input.value.trim(), tagsContainer);
                input.value = '';
            }
        });
    });

    function addTag(text, container) {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `${text} <i class="ph ph-x"></i>`;
        tag.querySelector('i').addEventListener('click', () => tag.remove());
        container.appendChild(tag);
    }

    // Form submission
    const savePublishBtn = document.getElementById('save-publish-btn');

    savePublishBtn.addEventListener('click', function () {
        const requiredFields = document.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isValid = false;

                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-msg')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-msg';
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.color = 'red';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '5px';
                    field.parentNode.insertBefore(errorMsg, field.nextSibling);
                }
            } else {
                field.style.borderColor = '';
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-msg')) {
                    field.nextElementSibling.remove();
                }
            }
        });

        const fileItems = document.querySelectorAll('.file-item');
        if (fileItems.length === 0) {
            alert('Please upload at least one CV file!');
            isValid = false;
        }

        if (isValid) {
            document.querySelectorAll('input, textarea, select').forEach(element => {
                if (element.type !== 'file') {
                    element.value = '';
                }
            });

            fileListContainer.innerHTML = '';
            cvUpload.value = '';
            avatarPreview.src = '#';
            avatarPreview.style.display = 'none';
            avatarIcon.style.display = 'block';
            avatarUpload.value = '';
            deleteAvatarBtn.style.display = 'none';

            alert('Profile saved successfully! All data has been cleared.');
        } else {
            alert('Please fill all required fields correctly!');
        }
    });
});


