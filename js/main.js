// Phone and Facebook icon handling for mobile
const tel = document.getElementById("tel");
const fb = document.getElementById("fb");

// function handleMobileIcons(x) {
//   if (x.matches) {
//     tel.innerHTML = "<i class='fa-solid fa-phone'></i> ";
//     fb.innerHTML = "<i class='fa-brands fa-facebook-f'></i> ";
//   }
// }

var mobileMediaQuery = window.matchMedia("(max-width: 700px)");
// handleMobileIcons(mobileMediaQuery);
// mobileMediaQuery.addListener(handleMobileIcons);

// Main document ready function
document.addEventListener('DOMContentLoaded', function () {
  // Preloader
  setTimeout(function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      console.log('Preloader found, fading out...');
      preloader.style.opacity = '0';
      setTimeout(function () {
        preloader.style.display = 'none';
        console.log('Preloader hidden.');
      }, 500);
    } else {
      console.log('Preloader not found.');
    }
  }, 1500);
  // Navigation elements
  const mainNav = document.querySelector('.main-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // Sticky Navigation
  function handleStickyNav() {
    if (window.scrollY > 100) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleStickyNav);

  // Mobile Navigation Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // Mobile Dropdown Toggle
  const dropdownLinks = document.querySelectorAll('.nav-menu li.has-dropdown > a');

  dropdownLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        this.nextElementSibling.style.display =
          this.nextElementSibling.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  // Hero Slider
  const slides = document.querySelectorAll('.slider .slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Initialize slider
  if (slides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000);
  }

  // Stats Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0) {
    const options = {
      threshold: 0.5
    };

    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-count'));
          let count = 0;
          const interval = setInterval(function () {
            target.textContent = count;
            if (count >= countTo) {
              clearInterval(interval);
            }
            count += Math.ceil(countTo / 100);
            if (count > countTo) count = countTo;
          }, 20);
          statsObserver.unobserve(target);
        }
      });
    }, options);

    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
    });
  }

  // Product Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        productCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else if (card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Testimonial Slider
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const testimonialDots = document.querySelector('.testimonial-dots');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    testimonialItems.forEach(item => item.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));

    testimonialItems[index].style.display = 'block';
    dots[index].classList.add('active');
    currentTestimonial = index;
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(currentTestimonial);
  }

  if (testimonialItems.length > 0 && testimonialDots) {
    // Create dots if they don't exist
    if (testimonialDots.children.length === 0) {
      testimonialItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        testimonialDots.appendChild(dot);
      });
    }

    // Show first testimonial
    testimonialItems[0].style.display = 'block';

    // Auto slide
    setInterval(nextTestimonial, 5000);
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');

      question.addEventListener('click', function () {
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    });
  }

  // Inquiry Modal
  const inquiryBtns = document.querySelectorAll('.inquiry-btn, .inquiry-trigger');
  const inquiryModal = document.querySelector('.inquiry-modal');
  const closeModal = document.querySelector('.close-modal');

  if (inquiryBtns.length > 0 && inquiryModal) {
    inquiryBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        inquiryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    closeModal.addEventListener('click', function () {
      inquiryModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close modal when clicking outside content
    inquiryModal.addEventListener('click', function (e) {
      if (e.target === inquiryModal) {
        inquiryModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    function handleBackToTop() {
      if (window.scrollY > 500) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    }

    window.addEventListener('scroll', handleBackToTop);

    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth Scroll for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }

        const navHeight = mainNav.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form Validation
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value)) {
            isValid = false;
            field.classList.add('error');
          }
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields correctly.');
      }
    });
  });

  // Add UI elements if they don't exist
  // WhatsApp float button
  if (!document.querySelector('.whatsapp-float')) {
    const whatsappFloat = document.createElement('a');
    whatsappFloat.href = 'https://wa.me/201204090198';
    whatsappFloat.className = 'whatsapp-float';
    whatsappFloat.target = '_blank';
    whatsappFloat.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappFloat);
  }

  // Back to Top button
  if (!document.querySelector('.back-to-top')) {
    const backToTopBtn = document.createElement('a');
    backToTopBtn.href = '#';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
  }

  // Add responsive table handling
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    if (!table.parentNode.classList.contains('table-responsive')) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('table-responsive');
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

  // AOS Animation Initialization (if AOS library is included)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  // Big Showcase Slider Functionality
  initBigShowcaseSlider();
});

// Big Showcase Slider Functionality
function initBigShowcaseSlider() {
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slider-slide');
  const prevBtn = document.querySelector('.slider-nav-btn.prev-btn');
  const nextBtn = document.querySelector('.slider-nav-btn.next-btn');
  const paginationContainer = document.querySelector('.slider-pagination');

  if (!sliderTrack || slides.length === 0) return;

  let currentSlide = 0;
  let slideWidth = slides[0].getBoundingClientRect().width;
  let autoplayInterval;
  const autoplayDelay = 4000; // 4 seconds between slides

  // Create pagination dots
  if (paginationContainer && paginationContainer.children.length === 0) {
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('pagination-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      paginationContainer.appendChild(dot);
    });
  }

  const paginationDots = document.querySelectorAll('.pagination-dot');

  // Initialize first slide as active
  slides[0].classList.add('active');

  // Update dimensions on window resize
  window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    goToSlide(currentSlide);
  });

  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    // Handle edge cases
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlide = index;

    // Move slider with smooth transition
    sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    // Update active states
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');

    // Update pagination
    if (paginationDots.length > 0) {
      paginationDots.forEach(dot => dot.classList.remove('active'));
      paginationDots[currentSlide].classList.add('active');
    }

    // Update zoom effect
    updateZoomEffect();
  }

  // Add touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  sliderTrack.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderTrack.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      goToSlide(currentSlide + 1);
      resetAutoplay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      goToSlide(currentSlide - 1);
      resetAutoplay();
    }
  }

  // Start autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, autoplayDelay);
  }

  // Reset autoplay
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Initialize autoplay
  startAutoplay();

  // Pause autoplay on hover
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    sliderContainer.addEventListener('mouseleave', startAutoplay);
  }

  // Add zoom effect on active slide
  function updateZoomEffect() {
    slides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      if (img) {
        if (index === currentSlide) {
          img.classList.add('zoom-effect');
        } else {
          img.classList.remove('zoom-effect');
        }
      }
    });
  }

  // Update zoom effect when changing slides
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        updateZoomEffect();
      }
    });
  });

  slides.forEach(slide => {
    observer.observe(slide, { attributes: true });
  });

  // Initialize zoom effect
  updateZoomEffect();
}

