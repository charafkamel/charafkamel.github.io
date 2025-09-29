// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

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
});

// Smooth Scrolling for Navigation Links
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

// Academic Tree Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tree structure
    initializeAcademicTree();
    
    // Initialize search functionality
    initializeProjectSearch();
    
    // Set initial state - expand semesters but keep courses closed
    document.querySelectorAll('.semester-header').forEach(header => {
        header.click();
    });
    
    // Do NOT auto-expand courses - keep them closed by default
});

function initializeAcademicTree() {
    // Semester toggle functionality
    document.querySelectorAll('.semester-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Toggle active state
            this.classList.toggle('active');
            content.classList.toggle('active');
            
            // Animate chevron
            const toggle = this.querySelector('.semester-toggle');
            if (isActive) {
                toggle.style.transform = 'rotate(0deg)';
            } else {
                toggle.style.transform = 'rotate(90deg)';
            }
        });
    });
    
    // Course toggle functionality
    document.querySelectorAll('.course-header').forEach(header => {
        header.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent semester toggle
            
            const projects = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Toggle active state
            this.classList.toggle('active');
            projects.classList.toggle('active');
            
            // Animate chevron
            const toggle = this.querySelector('.course-toggle');
            if (isActive) {
                toggle.style.transform = 'rotate(0deg)';
            } else {
                toggle.style.transform = 'rotate(90deg)';
            }
        });
    });
}

function initializeProjectSearch() {
    const searchInput = document.getElementById('project-search');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        searchAcademicTree(searchTerm);
    });
}

function searchAcademicTree(searchTerm) {
    const semesterBranches = document.querySelectorAll('.semester-branch');
    const noResults = document.getElementById('no-results');
    let hasResults = false;
    
    semesterBranches.forEach(semester => {
        const courses = semester.querySelectorAll('.course-node');
        let semesterHasResults = false;
        
        courses.forEach(course => {
            const projects = course.querySelectorAll('.project-node');
            let courseHasResults = false;
            
            projects.forEach(project => {
                const projectText = project.textContent.toLowerCase();
                const courseTitle = course.querySelector('.course-info h5').textContent.toLowerCase();
                
                const matches = searchTerm === '' || 
                              projectText.includes(searchTerm) || 
                              courseTitle.includes(searchTerm);
                
                if (matches) {
                    project.style.display = 'block';
                    courseHasResults = true;
                    hasResults = true;
                } else {
                    project.style.display = 'none';
                }
            });
            
            // Show/hide course based on whether it has matching projects
            if (courseHasResults) {
                course.style.display = 'block';
                semesterHasResults = true;
                
                // Auto-expand course if search term matches
                if (searchTerm !== '') {
                    const courseHeader = course.querySelector('.course-header');
                    const courseProjects = course.querySelector('.course-projects');
                    
                    if (!courseHeader.classList.contains('active')) {
                        courseHeader.classList.add('active');
                        courseProjects.classList.add('active');
                        courseHeader.querySelector('.course-toggle').style.transform = 'rotate(90deg)';
                    }
                }
            } else {
                course.style.display = 'none';
            }
        });
        
        // Show/hide semester based on whether it has matching courses
        if (semesterHasResults) {
            semester.style.display = 'block';
            
            // Auto-expand semester if search term matches
            if (searchTerm !== '') {
                const semesterHeader = semester.querySelector('.semester-header');
                const semesterContent = semester.querySelector('.semester-content');
                
                if (!semesterHeader.classList.contains('active')) {
                    semesterHeader.classList.add('active');
                    semesterContent.classList.add('active');
                    semesterHeader.querySelector('.semester-toggle').style.transform = 'rotate(90deg)';
                }
            }
        } else {
            semester.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    if (noResults) {
        noResults.style.display = hasResults ? 'none' : 'block';
    }
}

// Smooth expand/collapse animations
function addSmoothAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .semester-content,
        .course-projects {
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .semester-toggle,
        .course-toggle {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize smooth animations
addSmoothAnimations();

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (replace with actual submission logic)
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// CV Download Functionality
const cvDownloadBtn = document.getElementById('cv-download-btn');

cvDownloadBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Simulate CV download (replace with actual CV file path)
    alert('CV download functionality will be implemented when you add your actual CV file.');
    
    // Uncomment and modify the following lines when you have an actual CV file:
    // const link = document.createElement('a');
    // link.href = 'path/to/your/cv.pdf';
    // link.download = 'Kamel_Charaf_CV.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll to Top Functionality (Optional)
function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#2980b9';
        this.style.transform = 'translateY(-3px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#3498db';
        this.style.transform = 'translateY(0)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Update Footer Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Animate elements on scroll (Intersection Observer)
function createScrollAnimation() {
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
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .contact-item, .cv-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
createScrollAnimation();

// Preloader (Optional)
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinnerStyles = `
        .preloader-content {
            text-align: center;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .preloader-content p {
            color: #333;
            font-size: 1.1rem;
            font-weight: 500;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = spinnerStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(preloader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                styleSheet.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
createPreloader();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Your scroll handling code here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log(`
🚀 Welcome to Kamel Charaf's Portfolio
📧 Contact: kamel.charaf@epfl.ch
🔗 GitHub: github.com/charafkamel
💼 LinkedIn: linkedin.com/in/kamelcharaf

Thanks for visiting! Feel free to explore the code.
`);

// Add some interactive Easter eggs
let clickCount = 0;
document.querySelector('.hero-title').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)';
        this.style.backgroundSize = '400% 400%';
        this.style.animation = 'gradientShift 3s ease infinite';
        this.style.webkitBackgroundClip = 'text';
        this.style.webkitTextFillColor = 'transparent';
        
        // Add the animation keyframes
        if (!document.querySelector('#gradient-animation')) {
            const style = document.createElement('style');
            style.id = 'gradient-animation';
            style.textContent = `
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            this.style.background = '';
            this.style.animation = '';
            this.style.webkitBackgroundClip = '';
            this.style.webkitTextFillColor = '';
            clickCount = 0;
        }, 3000);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'P' to go to projects
    if (e.key === 'p' || e.key === 'P') {
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// CV Card Toggle Functionality
function toggleCVCard(cardId) {
    const content = document.getElementById(cardId + '-content');
    const chevron = document.getElementById(cardId + '-chevron');
    
    // Toggle the clicked card
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        chevron.classList.remove('active');
    } else {
        content.classList.add('active');
        chevron.classList.add('active');
    }
}

// About Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Counter animation for metrics
    function animateCounters() {
        const counters = document.querySelectorAll('.metric-number[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 100;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + (target === 95 ? '%' : '');
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + (target === 95 ? '%' : '');
                        }
                    }, 20);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Skill bar animations
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress, .skill-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const level = skillBar.getAttribute('data-width') || skillBar.getAttribute('data-level');
                    setTimeout(() => {
                        skillBar.style.width = level + '%';
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    // Circular progress animations
    function animateCircularProgress() {
        const circles = document.querySelectorAll('.stat-circle');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const percent = circle.getAttribute('data-percent');
                    const degrees = (percent / 100) * 360;
                    
                    setTimeout(() => {
                        circle.style.background = `conic-gradient(#3498db ${degrees}deg, #e9ecef ${degrees}deg)`;
                    }, 500);
                }
            });
        }, { threshold: 0.5 });
        
        circles.forEach(circle => observer.observe(circle));
    }
    
    // Achievement cards stagger animation
    function animateAchievementCards() {
        const cards = document.querySelectorAll('.achievement-card, .metric-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Profile image animation
    function animateProfileImage() {
        const profileImage = document.querySelector('.profile-placeholder-hero, .profile-placeholder');
        if (profileImage) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'bounceIn 1s ease-out';
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(profileImage);
        }
    }
    
    // Initialize all animations
    animateCounters();
    animateSkillBars();
    animateCircularProgress();
    animateAchievementCards();
    animateProfileImage();
});

// Add enhanced animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(enhancedStyle);