/**
* Template Name: Tulernify
* Template URL: https://tulernify.com/
* Updated: Jul 23 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1199) {
                mobileToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1199 && 
            !navList.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link based on current page
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize active link
    setActiveLink();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add loading state to navigation links
    navLinks.forEach(link => {
        if (!link.classList.contains('cta-button')) {
            link.addEventListener('click', function() {
                if (this.getAttribute('href') !== '#' && 
                    !this.getAttribute('href').startsWith('#')) {
                    this.classList.add('loading');
                    
                    // Remove loading state after navigation
                    setTimeout(() => {
                        this.classList.remove('loading');
                    }, 2000);
                }
            });
        }
    });
    
    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.innerWidth <= 1199) {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Prevent body scroll when menu is open on mobile
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (document.body.classList.contains('menu-open')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
});


// Hero Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Count up animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.dataset.count === '10' ? '+' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    };

    // Intersection Observer for stats
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const target = parseInt(numberElement.dataset.count);
                animateCounter(numberElement, target);
                observer.unobserve(numberElement);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => {
        observer.observe(number);
    });

    // Floating card hover effects
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.05)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Video lightbox initialization
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            plyr: {
                css: 'https://cdn.plyr.io/3.6.12/plyr.css',
                js: 'https://cdn.plyr.io/3.6.12/plyr.js',
                config: {
                    ratio: '16:9',
                    muted: false,
                    hideControls: true
                }
            }
        });
    }

    // CTA button animation
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            const icon = ctaButton.querySelector('i');
            icon.style.transform = 'translateX(8px)';
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            const icon = ctaButton.querySelector('i');
            icon.style.transform = '';
        });
    }

    // Typewriter effect for hero heading (optional)
    const heroHeading = document.querySelector('.hero-heading');
    if (heroHeading && window.innerWidth > 768) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing on scroll into view
        const headingObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                headingObserver.unobserve(heroHeading);
            }
        });
        
        headingObserver.observe(heroHeading);
    }

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const bgElements = document.querySelectorAll('.element');
        
        bgElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Smooth scroll for video button
    const videoBtn = document.querySelector('.video-btn');
    if (videoBtn && videoBtn.getAttribute('href').startsWith('#')) {
        videoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = videoBtn.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// ===== MAIN JAVASCRIPT FILE =====

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION =====
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 1199) {
                    mobileToggle.classList.remove('active');
                    navList.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1199 && 
                !navList.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Header scroll effect
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }
    
    // ===== HERO SECTION =====
    // Counter animation
    const heroStatNumbers = document.querySelectorAll('.hero .stat-number');
    
    if (heroStatNumbers.length > 0) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.count || element.textContent.replace(/\D/g, ''));
                    
                    let start = 0;
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    
                    const timer = setInterval(function() {
                        start += increment;
                        if (start >= target) {
                            element.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            element.textContent = Math.floor(start);
                        }
                    }, 16);
                    
                    heroObserver.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        heroStatNumbers.forEach(function(number) {
            heroObserver.observe(number);
        });
    }
    
    // ===== ABOUT SECTION =====
    const aboutStatNumbers = document.querySelectorAll('.home-about .stat-number');
    
    if (aboutStatNumbers.length > 0) {
        const aboutObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.count || element.textContent.replace(/\D/g, ''));
                    
                    let start = 0;
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    
                    const timer = setInterval(function() {
                        start += increment;
                        if (start >= target) {
                            element.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            element.textContent = Math.floor(start);
                        }
                    }, 16);
                    
                    aboutObserver.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        aboutStatNumbers.forEach(function(number) {
            aboutObserver.observe(number);
        });
    }
    
    // ===== FEATURED SUBJECTS =====
    // Card hover effects
    const subjectCards = document.querySelectorAll('.main-card, .highlight-card');
    
    subjectCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.subject-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.subject-image');
            if (image) {
                image.style.transform = '';
            }
            this.style.transform = '';
        });
    });
    
    // CTA button hover effects
    const ctaButtons = document.querySelectorAll('.card-cta, .highlight-cta, .btn-view-all, .btn-primary');
    
    ctaButtons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // Emergency banner phone click
    const emergencyBtn = document.querySelector('.btn-emergency');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(function() {
                emergencyBtn.style.transform = '';
            }, 200);
        });
    }
    
    // ===== AOS INITIALIZATION =====
    // If using AOS library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // ===== GLIGHTBOX INITIALIZATION =====
    // If using GLightbox for videos
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: false,
            autoplayVideos: true
        });
    }
    
    // ===== SMOOTH SCROLL =====
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== PREVENT BODY SCROLL WHEN MENU OPEN =====
    const menuObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (document.body.classList.contains('menu-open')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    menuObserver.observe(document.body, { attributes: true });
});

// ===== WINDOW LOAD FUNCTIONS =====
window.addEventListener('load', function() {
    // Add loaded class for animations
    document.body.classList.add('loaded');
    
    // Remove preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 300);
        }, 300);
    }
}); 
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    // Disable AOS animations for the tutor profile page while keeping hover effects
    if (document && document.body && document.body.classList.contains('tutor-profile-page')) return;

    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();
