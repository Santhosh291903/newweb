particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#10b981" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#10b981",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        }
    }
});

// Create floating background elements
function createFloatingElements() {
    const bg = document.getElementById('animatedBg');
    const count = 15;
    
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        const size = Math.random() * 100 + 50;
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = Math.random() * 100 + 'vh';
        
        element.style.animationDelay = Math.random() * 20 + 's';
        element.style.animationDuration = (Math.random() * 20 + 20) + 's';
        
        bg.appendChild(element);
    }
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-advance slides
    setInterval(() => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) nextSlide = 0;
        goToSlide(nextSlide);
    }, 5000);
}

// Scroll animations
function checkScroll() {
    const sections = document.querySelectorAll('section');
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    const skillCards = document.querySelectorAll('.skill-card');
    const toolCategories = document.querySelectorAll('.tools-category');
    const toolItems = document.querySelectorAll('.tool-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    const backToTop = document.getElementById('backToTop');
    
    // Section titles
    sectionTitles.forEach(title => {
        const titleTop = title.getBoundingClientRect().top;
        if (titleTop < window.innerHeight - 100) {
            title.classList.add('visible');
        }
    });
    
    // Section subtitles
    sectionSubtitles.forEach(subtitle => {
        const subtitleTop = subtitle.getBoundingClientRect().top;
        if (subtitleTop < window.innerHeight - 100) {
            subtitle.classList.add('visible');
        }
    });
    
    // About section
    if (aboutImage) {
        const aboutTop = aboutImage.getBoundingClientRect().top;
        if (aboutTop < window.innerHeight - 100) {
            aboutImage.classList.add('visible');
            aboutContent.classList.add('visible');
        }
    }
    
    // Skill cards
    skillCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        }
    });
    
    // Tool categories
    toolCategories.forEach((category, index) => {
        const categoryTop = category.getBoundingClientRect().top;
        if (categoryTop < window.innerHeight - 100) {
            setTimeout(() => {
                category.classList.add('visible');
            }, index * 200);
        }
    });
    
    // Tool items
    toolItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < window.innerHeight - 100) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        }
    });
    
    // Timeline items
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < window.innerHeight - 100) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 300);
        }
    });
    
    // Contact elements
    if (contactInfo) {
        const contactTop = contactInfo.getBoundingClientRect().top;
        if (contactTop < window.innerHeight - 100) {
            contactInfo.classList.add('visible');
            contactForm.classList.add('visible');
        }
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Progress bar
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
}

// Setup event listeners - called after sections load
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) mobileMenu.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            setTimeout(() => {
                btn.innerHTML = 'Send Message';
                btn.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (window.innerWidth <= 992) {
                    document.querySelector('.nav-links').classList.remove('active');
                }
            }
        });
    });

    // Back to top functionality
    const backToTop = document.getElementById('backToTop');
    if (backToTop) backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    checkScroll();
});

// Initialize app after sections load
function initApp() {
    createFloatingElements();
    initTestimonialSlider();
    setupEventListeners();
    checkScroll();
    
    // Add typing effect to stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });
}
document.addEventListener('sectionsLoaded', initApp);
