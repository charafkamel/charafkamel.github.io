// Simple JavaScript for the personal webpage
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for simple fade-in animation
    const animatedElements = document.querySelectorAll('.project-card, .hero-sidebar, .cv-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Search functionality for projects
    const searchInput = document.querySelector('#project-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Academic tree toggle functionality (simplified)
    const semesterHeaders = document.querySelectorAll('.semester-header');
    semesterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon');
            
            if (content) {
                if (content.style.display === 'none' || content.style.display === '') {
                    content.style.display = 'block';
                    if (icon) icon.textContent = '−';
                } else {
                    content.style.display = 'none';
                    if (icon) icon.textContent = '+';
                }
            }
        });
    });

    const courseHeaders = document.querySelectorAll('.course-header');
    courseHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon');
            
            if (content) {
                if (content.style.display === 'none' || content.style.display === '') {
                    content.style.display = 'block';
                    if (icon) icon.textContent = '−';
                } else {
                    content.style.display = 'none';
                    if (icon) icon.textContent = '+';
                }
            }
        });
    });

    // CV card selection functionality
    const cvCards = document.querySelectorAll('.cv-card');
    const cvDisplay = document.querySelector('.cv-display');
    
    cvCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            cvCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update CV display content based on the selected card
            const cardType = this.getAttribute('data-type');
            updateCVDisplay(cardType);
        });
    });

    function updateCVDisplay(type) {
        if (!cvDisplay) return;
        
        let content = '';
        switch(type) {
            case 'education':
                content = '<h3>Education Details</h3><p>Detailed education information...</p>';
                break;
            case 'publications':
                content = '<h3>Publications</h3><p>Research papers and publications...</p>';
                break;
            case 'experience':
                content = '<h3>Experience</h3><p>Work experience and projects...</p>';
                break;
            default:
                content = '<p>Select a category to view details</p>';
        }
        cvDisplay.innerHTML = content;
    }
});