document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider
    const testimonials = [
        {
            img: 'assets/images/avatar/IMG-1.webp',
            quote: "Choosing FreelanHub was the best decision we made for our business. Their expertise in SEO and digital marketing has significantly boosted our traffic and conversions.",
            name: "Georgina Emma",
            role: "Head of Recruitment",
            stars: 4
        },
        {
            img: 'assets/images/avatar/IMG-2.webp',
            quote: "The freelancers we found through FreelanHub have been exceptional. The quality of work and professionalism is unmatched in the industry.",
            name: "Alexander Pato",
            role: "Marketing Director",
            stars: 5
        },
        {
            img: 'assets/images/avatar/IMG-3.webp',
            quote: "As a small business owner, FreelanHub has been invaluable for finding affordable yet high-quality services. The platform is easy to use and saves me so much time.",
            name: "Leonardo Pavard",
            role: "Small Business Owner",
            stars: 5
        },
        {
            img: 'assets/images/avatar/IMG-4.webp',
            quote: "The customer support team at FreelanHub is outstanding. They've helped me resolve every issue quickly and professionally.",
            name: "Christina Anna",
            role: "Project Manager",
            stars: 4
        }
    ];
    
    let currentTestimonial = 0;
    const testimonialImg = document.getElementById('testimonial-img');
    const testimonialQuote = document.querySelector('.quote');
    const testimonialName = document.querySelector('.author h4');
    const testimonialRole = document.querySelector('.author span');
    const starsContainer = document.querySelector('.stars');
    
    function updateTestimonial(index) {
        const testimonial = testimonials[index];
        testimonialImg.src = testimonial.img;
        testimonialImg.alt = testimonial.name;
        testimonialQuote.textContent = testimonial.quote;
        testimonialName.textContent = testimonial.name;
        testimonialRole.textContent = testimonial.role;
        
        // Update stars
        starsContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.className = i < testimonial.stars ? 'ph-fill ph-star' : 'ph ph-star';
            starsContainer.appendChild(star);
        }
    }
    
    document.getElementById('prev-testimonial').addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });
    
    document.getElementById('next-testimonial').addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });
    
    // Initialize first testimonial
    updateTestimonial(0);
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    
    // Smooth scroll for anchor links
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
    
    // Mobile menu toggle (simplified version)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="ph ph-list"></i>';
    document.querySelector('.header .container').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        document.querySelector('.nav').classList.toggle('active');
    });
});