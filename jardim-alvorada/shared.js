/* ============================================================
   shared.js — funcionalidades compartilhadas por todas as páginas
   Importado em TODAS as páginas como primeiro script
   ============================================================ */

/* ===== NAVBAR SCROLL ===== */
(function initNavbar() {
  const nav        = document.querySelector('.nav');
  const isHeroPage = document.querySelector('.hero');   // só na homepage

  if (!nav) return;

  /* Na homepage o nav começa transparente (hero-nav) */
  if (isHeroPage) nav.classList.add('hero-nav');

  function handleScroll() {
    if (isHeroPage) {
      if (window.scrollY > 60) {
        nav.classList.remove('hero-nav');
        nav.classList.add('nav-scroll');
      } else {
        nav.classList.add('hero-nav');
        nav.classList.remove('nav-scroll');
      }
    }

    /* Parallax no hero da homepage */
    if (isHeroPage) {
      isHeroPage.style.backgroundPositionY = window.scrollY * 0.45 + 'px';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // estado inicial
})();


/* ===== MENU MOBILE ===== */
(function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (!navToggle || !navMobile) return;

  function openMenu() {
    navMobile.classList.add('open');
    navToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMobile.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    navMobile.classList.contains('open') ? closeMenu() : openMenu();
  });

  /* Fecha ao clicar em qualquer link do overlay */
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* Fecha com Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ===== FADE-UP (Intersection Observer) ===== */
(function initFadeUp() {
  const faders = document.querySelectorAll('.fade-up');
  if (!faders.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // dispara uma única vez
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  faders.forEach(el => observer.observe(el));
})();


/* ===== ACTIVE NAV LINK ===== */
(function initActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      /* Remove active estático colocado no HTML (fallback de segurança) */
      // link.classList.remove('active');
    }
  });
})();