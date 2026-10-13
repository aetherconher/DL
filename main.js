/**
 * ==========================================================================
 * RAVI PORTFOLIO - CORE APPLICATION CONTROLLER
 * Theme Switcher | Scrollspy | Typing Animation | Bento Clock |
 * Skill Filters | Contact Form | 3D Tilt | Toasts & Modals
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME SWITCHER (Dark / Light Mode) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('ravi_portfolio_theme');

  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'dark'); // default dark futuristic
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} mode`, 'info');
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ravi_portfolio_theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
      themeToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    }
  }


  // --- 2. READING PROGRESS BAR & STICKY HEADER ---
  const progressBar = document.getElementById('scroll-progress');
  const header = document.querySelector('.header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // --- 3. MOBILE DRAWER NAVIGATION ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));


  // --- 4. SCROLLSPY ACTIVE SECTION TRACKER ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();


  // --- 5. DYNAMIC TYPEWRITER EFFECT ---
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const roles = [
      'First-Year CS Student @ JECRC',
      'Aspiring Software Engineer',
      'Frontend & Web Craftsman',
      'Curious Tech Explorer',
      'Passionate Learner'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2200; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Brief pause before typing next
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }


  // --- 6. LIVE IST JAIPUR TIME CLOCK ---
  const localTimeEl = document.getElementById('local-time');
  function updateJaipurTime() {
    if (!localTimeEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      localTimeEl.textContent = `${timeString} IST`;
    } catch (e) {
      localTimeEl.textContent = 'Jaipur, IST';
    }
  }
  updateJaipurTime();
  setInterval(updateJaipurTime, 1000);


  // --- 7. SKILL CATEGORY FILTER ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });


  // --- 8. ANIMATED SKILL PROGRESS BARS ---
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillSection = document.getElementById('skills');

  if (skillSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-percent');
            bar.style.width = `${progress}%`;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    observer.observe(skillSection);
  } else {
    // Fallback if IntersectionObserver not supported
    skillBars.forEach(bar => {
      const progress = bar.getAttribute('data-percent');
      bar.style.width = `${progress}%`;
    });
  }


  // --- 9. SCROLL REVEAL ANIMATIONS ---
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }


  // --- 10. 3D TILT EFFECT ON CARDS ---
  const tiltCards = document.querySelectorAll('.tilt-effect');
  if (window.innerWidth > 992) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }


  // --- 11. COPY TO CLIPBOARD BUTTONS ---
  const copyButtons = document.querySelectorAll('.copy-trigger');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      const originalHtml = btn.innerHTML;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied!
        `;
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');

        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        showToast('Failed to copy. Please copy manually.', 'info');
      }
    });
  });


  // --- 12. CONTACT FORM VALIDATION & SUBMISSION ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const messageSuccessModal = document.getElementById('message-success-modal');
  const closeSuccessModalBtn = document.getElementById('close-success-modal-btn');
  const messageCounter = document.getElementById('message-char-count');
  const messageInput = document.getElementById('form-message');

  // Character counter
  if (messageInput && messageCounter) {
    messageInput.addEventListener('input', () => {
      messageCounter.textContent = `${messageInput.value.length} / 500`;
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const captchaInput = document.getElementById('form-captcha');
      const submitBtn = document.getElementById('form-submit-btn');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        isValid = false;
      } else {
        nameInput.classList.remove('error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        isValid = false;
      } else {
        emailInput.classList.remove('error');
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
        messageInput.classList.add('error');
        isValid = false;
      } else {
        messageInput.classList.remove('error');
      }

      // Validate Captcha (3 + 4 = 7)
      if (captchaInput && captchaInput.value.trim() !== '7') {
        captchaInput.classList.add('error');
        showToast('Please solve the math verification (3 + 4 = 7)', 'info');
        isValid = false;
      } else if (captchaInput) {
        captchaInput.classList.remove('error');
      }

      if (!isValid) {
        showToast('Please fill in all required fields accurately.', 'info');
        return;
      }

      // Button Loading State
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      const messagePayload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput ? subjectInput.value : 'General Inquiry',
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      // Simulate sending to server
      setTimeout(() => {
        // Save to LocalStorage
        try {
          const existingMessages = JSON.parse(localStorage.getItem('ravi_portfolio_messages') || '[]');
          existingMessages.push(messagePayload);
          localStorage.setItem('ravi_portfolio_messages', JSON.stringify(existingMessages));
        } catch (err) {
          console.error(err);
        }

        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Reset form
        contactForm.reset();
        if (messageCounter) messageCounter.textContent = '0 / 500';

        // Show confirmation modal
        if (messageSuccessModal) {
          const summaryName = document.getElementById('summary-name');
          const summaryEmail = document.getElementById('summary-email');
          if (summaryName) summaryName.textContent = messagePayload.name;
          if (summaryEmail) summaryEmail.textContent = messagePayload.email;
          messageSuccessModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }

        showToast('Message sent successfully! Ravi will get back to you soon.', 'success');
      }, 1000);
    });
  }

  // Close Success Modal
  if (closeSuccessModalBtn && messageSuccessModal) {
    closeSuccessModalBtn.addEventListener('click', () => {
      messageSuccessModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    messageSuccessModal.addEventListener('click', (e) => {
      if (e.target === messageSuccessModal) {
        messageSuccessModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }


  // --- 13. TOAST NOTIFICATION UTILITY ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success' 
      ? `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

    toast.innerHTML = `
      ${icon}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove toast after delay
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, 3800);
  }

  // Expose toast globally
  window.showToast = showToast;
});
