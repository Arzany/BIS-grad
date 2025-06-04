document.addEventListener('DOMContentLoaded', function() {
    // تبديل اللغة
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // تحديث الزر النشط
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // تبديل اتجاه الصفحة
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
            
            // تبديل العناصر المرئية
            document.querySelectorAll(`.${lang}`).forEach(el => {
                el.style.display = 'block';
            });
            
            document.querySelectorAll(`.${lang === 'ar' ? 'en' : 'ar'}`).forEach(el => {
                el.style.display = 'none';
            });
            
            // تحديث عنوان الصفحة
            document.title = lang === 'ar' ? 'EQUAL CHANCE - فرص متساوية' : 'EQUAL CHANCE - Equal Opportunities';
        });
    });
    
    // تنشيط القائمة المتنقلة للشاشات الصغيرة
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }
    
    // تأثير التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأثير عند التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


});
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

  function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("show");
  }

