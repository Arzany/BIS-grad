document.addEventListener('DOMContentLoaded', function() {
    // 1. عناصر DOM التي نحتاجها
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const changePasswordBtn = document.querySelector('.btn-change-password');
    const passwordForm = document.getElementById('passwordForm') || document.querySelector('.password-form');
    const verificationModal = document.getElementById('verification-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const resendBtn = document.querySelector('.btn-resend');
    const returnBtn = document.querySelector('.btn-return');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error') || document.createElement('div');

    // 2. تبديل القائمة الجانبية للجوّال
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
    }

    // 3. معالجة تغيير كلمة المرور
    if (changePasswordBtn && passwordForm) {
        changePasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على القيم من النموذج
            const email = emailInput.value;
            const oldPassword = document.getElementById('old-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // التحقق من صحة الإيميل أولاً
            if (!email) {
                showError('Please enter your email address!');
                return;
            }

            if (!isValidEmail(email)) {
                showError('Invalid email format! Example: user@example.com');
                return;
            }

            // التحقق من باقي الحقول
            if (!oldPassword || !newPassword || !confirmPassword) {
                showError('Please fill all fields!');
                return;
            }

            if (newPassword !== confirmPassword) {
                showError('Your new password does not match!');
                return;
            }

            if (newPassword === oldPassword) {
                showError('New password must be different from old password!');
                return;
            }

            // عرض نافذة التحقق
            if (verificationModal) {
                const emailDisplay = verificationModal.querySelector('.email-highlight');
                if (emailDisplay) {
                    emailDisplay.textContent = maskEmail(email);
                }
                verificationModal.style.display = 'flex';
            }

            // مسح النموذج بعد الإرسال
            passwordForm.reset();
        });
    }

    // دالة التحقق من صيغة الإيميل
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // دالة لعرض الأخطاء
    function showError(message) {
        // عرض رسالة الخطأ تحت حقل الإيميل
        if (emailError) {
            emailError.textContent = message;
            emailError.style.display = 'block';
            emailError.style.color = 'red';
            emailError.style.marginTop = '5px';
        }
        
        // عرض تنبيه
        alert(message);
        
        // إضافة حد أحمر للحقل إذا كان خطأ في الإيميل
        if (emailInput && message.includes('email')) {
            emailInput.style.borderColor = 'red';
        }
    }

    // 4. إغلاق نافذة التحقق
    if (closeModalBtn && verificationModal) {
        closeModalBtn.addEventListener('click', function() {
            verificationModal.style.display = 'none';
        });
    }

    // 5. إعادة إرسال البريد الإلكتروني
    if (resendBtn) {
        resendBtn.addEventListener('click', function() {
            alert('Your verification e-mail has been resent!');
        });
    }

    // 6. العودة للصفحة الرئيسية
    if (returnBtn) {
        returnBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // دالة مساعدة لإخفاء جزء من البريد الإلكتروني
    function maskEmail(email) {
        const atIndex = email.indexOf('@');
        if (atIndex > 3) {
            return email.substring(0, 3) + '****' + email.substring(atIndex);
        }
        return email;
    }
});