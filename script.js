// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Audio autoplay handling - plays once on page load/refresh
const audio = document.getElementById('background-audio');

// Function to play audio once
function playAudioOnce() {
    if (audio) {
        // Check if audio has already been played in this session
        const hasPlayed = sessionStorage.getItem('audioPlayed');
        
        if (!hasPlayed) {
            audio.play().then(() => {
                console.log('Audio playing');
                // Mark as played for this session
                sessionStorage.setItem('audioPlayed', 'true');
            }).catch((error) => {
                console.log('Autoplay blocked by browser, waiting for user interaction');
                // If autoplay is blocked, play on first user interaction
                const playOnInteraction = () => {
                    audio.play().then(() => {
                        sessionStorage.setItem('audioPlayed', 'true');
                        console.log('Audio playing after user interaction');
                    }).catch(err => console.log('Audio play failed:', err));
                    
                    // Remove listeners after playing
                    document.body.removeEventListener('click', playOnInteraction);
                    document.body.removeEventListener('touchstart', playOnInteraction);
                };
                
                document.body.addEventListener('click', playOnInteraction, { once: true });
                document.body.addEventListener('touchstart', playOnInteraction, { once: true });
            });
        }
    }
}

// Clear the session storage flag when page is refreshed/reloaded
window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('audioPlayed');
});

// Try to play audio on page load
window.addEventListener('load', () => {
    playAudioOnce();
});

// Image hover effect (desktop only)
const heroImage = document.querySelector('.hero-image');
const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (heroImage && !isMobile) {
    heroImage.addEventListener('mousemove', (e) => {
        const rect = heroImage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const rotateX = (y - 0.5) * 10;
        const rotateY = (x - 0.5) * -10;
        
        heroImage.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    heroImage.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    });
}

// Touch-friendly tap effect for mobile
if (heroImage && isMobile) {
    heroImage.addEventListener('touchstart', () => {
        heroImage.style.transform = 'scale(0.95)';
    });
    
    heroImage.addEventListener('touchend', () => {
        heroImage.style.transform = 'scale(1)';
    });
}

// Hero content animation on load
window.addEventListener('load', () => {
    // Add animation class to hero content
    const heroContent = document.querySelector('.hero-content');
    const imageContainer = document.querySelector('.image-container');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (imageContainer) {
        imageContainer.style.opacity = '0';
        imageContainer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            imageContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            imageContainer.style.opacity = '1';
            imageContainer.style.transform = 'scale(1)';
        }, 700);
    }
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully!';
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.about, .projects, .contact');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);

// Run once on page load
revealOnScroll();

// Add hover effect to project cards (if they exist)
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length > 0) {
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(20px)`;
            card.style.boxShadow = `${-angleY}px ${angleX}px 30px rgba(0, 0, 0, 0.2)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Add loading animation
window.addEventListener('load', () => {
    // Remove loading animation after content is loaded
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace('+', ''));
                if (!isNaN(number)) {
                    stat.textContent = '0+';
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const serviceStats = document.querySelector('.service-stats');
if (serviceStats) {
    statsObserver.observe(serviceStats);
}

// Add badge rotation effect on scroll
window.addEventListener('scroll', () => {
    const rankBadge = document.querySelector('.rank-badge');
    if (rankBadge) {
        const scrollPosition = window.scrollY;
        rankBadge.style.transform = `rotate(${scrollPosition * 0.5}deg)`;
    }
});

// Add typing effect to tagline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing effect on load
window.addEventListener('load', () => {
    setTimeout(() => {
        const tagline = document.querySelector('.tagline');
        if (tagline) {
            const originalText = tagline.textContent;
            typeWriter(tagline, originalText, 80);
        }
    }, 1000);
});
