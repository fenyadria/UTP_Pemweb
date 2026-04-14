(function () {
  'use strict';

  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  function initActiveNav() {
    const path    = window.location.pathname.split('/').pop() || 'index.html';
    const links   = document.querySelectorAll('.nav-links a');
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    bars.forEach(bar => observer.observe(bar));
  }

  function initProjectFilter() {
    const tabs  = document.querySelectorAll('.tab-btn');
    const items = document.querySelectorAll('.project-item');
    if (!tabs.length || !items.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter || 'all';

        items.forEach(item => {
          if (filter === 'all' || item.dataset.cat === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  function initContactForm() {
    const form       = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');
    const submitBtn  = document.querySelector('.submit-btn');
    if (!form) return;

    function validateField(id, msg) {
      const field = document.getElementById(id);
      if (!field) return true;
      const wrapper = field.closest('.field');
      const errEl   = wrapper && wrapper.querySelector('.field-error');
      const val     = field.value.trim();

      if (!val) {
        wrapper && wrapper.classList.add('has-error');
        if (errEl) errEl.textContent = msg;
        return false;
      }
      if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        wrapper && wrapper.classList.add('has-error');
        if (errEl) errEl.textContent = 'Masukkan alamat email yang valid.';
        return false;
      }
      wrapper && wrapper.classList.remove('has-error');
      return true;
    }

    ['name','email','subject','message'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        el.closest('.field') && el.closest('.field').classList.remove('has-error');
      });
    });

    submitBtn && submitBtn.addEventListener('click', () => {
      const v1 = validateField('name',    'Nama tidak boleh kosong.');
      const v2 = validateField('email',   'Email tidak boleh kosong.');
      const v3 = validateField('message', 'Pesan tidak boleh kosong.');

      if (!v1 || !v2 || !v3) return;

      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        successMsg.classList.add('show');
      }, 1200);
    });
  }

  function initScrollReveal() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => {
      el.style.animationPlayState = 'paused';
      io.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initActiveNav();
    initSkillBars();
    initProjectFilter();
    initContactForm();
    initScrollReveal();
  });

})();