// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link highlighting on scroll with color transitions
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            // Add animation effect to active link
            link.style.animation = 'linkPulse 0.5s ease';
            setTimeout(() => {
                link.style.animation = '';
            }, 500);
        }
    });

    // Change navbar color based on section
    changeNavbarColorBySection(current);
});

// Function to change navbar color based on section
function changeNavbarColorBySection(sectionId) {
    const navbar = document.querySelector('.navbar');

    switch(sectionId) {
        case 'home':
            navbar.style.background = 'linear-gradient(90deg, #003d82 0%, #0056b3 50%, #0066cc 100%)';
            break;
        case 'about':
            navbar.style.background = 'linear-gradient(90deg, #0056b3 0%, #0066cc 50%, #0077dd 100%)';
            break;
        case 'services':
            navbar.style.background = 'linear-gradient(90deg, #ff6600 0%, #ff7711 50%, #ff8822 100%)';
            break;
        case 'contact':
            navbar.style.background = 'linear-gradient(90deg, #003d82 0%, #ff6600 50%, #0056b3 100%)';
            break;
        default:
            navbar.style.background = 'linear-gradient(90deg, #003d82 0%, #0056b3 50%, #0066cc 100%)';
    }
}

// Smooth scroll for navigation links with animation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Add slide-out animation to current section
            const currentSection = document.querySelector('section.active-section');
            if (currentSection) {
                currentSection.classList.add('slide-out');
                setTimeout(() => {
                    currentSection.classList.remove('active-section', 'slide-out');
                }, 300);
            }

            // Smooth scroll to target
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });

            // Add slide-in animation to target section
            setTimeout(() => {
                targetSection.classList.add('active-section', 'slide-in');
                setTimeout(() => {
                    targetSection.classList.remove('slide-in');
                }, 600);
            }, 100);

            // Change navbar color
            const sectionId = targetId.replace('#', '');
            changeNavbarColorBySection(sectionId);
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
});

// Form submission handler with animation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-button');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.style.background = 'linear-gradient(135deg, #52c234 0%, #061700 100%)';

        setTimeout(() => {
            submitBtn.textContent = '✓ Sent!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Add hover effect to service icons
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.03)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Stripe-style Scroll Animation for Services
const serviceItems = document.querySelectorAll('.service-item');
const visualItems = document.querySelectorAll('.visual-item');

if (serviceItems.length > 0 && visualItems.length > 0) {
    // Intersection Observer for service items
    const serviceObserverOptions = {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
    };

    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const serviceId = entry.target.getAttribute('data-service');

                // Remove active class from all service items
                serviceItems.forEach(item => item.classList.remove('active'));

                // Add active class to current service item
                entry.target.classList.add('active');

                // Update visual on right side
                visualItems.forEach(visual => {
                    if (visual.getAttribute('data-visual') === serviceId) {
                        visual.classList.add('active');
                    } else {
                        visual.classList.remove('active');
                    }
                });
            }
        });
    }, serviceObserverOptions);

    // Observe all service items
    serviceItems.forEach(item => {
        serviceObserver.observe(item);
    });

    // Set first service as active on load
    if (serviceItems[0]) {
        serviceItems[0].classList.add('active');
    }
}

