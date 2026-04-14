/* =============================================
   FISIODORI — Main JavaScript
   ============================================= */

const EMAIL = 'szollosi.dora13@gmail.com';

/* ── Language System ── */
function setLang(lang) {
  // Hide overlay
  const overlay = document.getElementById('lang-overlay');
  if (overlay) overlay.classList.add('hidden');

  // Toggle all lang elements
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
  document.querySelectorAll('[data-lang-i]').forEach(el => {
    el.classList.toggle('active', el.dataset.langI === lang);
  });

  // Update pills
  document.querySelectorAll('.lang-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.l === lang);
  });

  // Update HTML lang attr
  document.documentElement.lang = lang === 'hu' ? 'hu' : lang === 'es' ? 'es' : 'en';

  // Persist
  localStorage.setItem('fisiodori-lang', lang);

  // Update mailto links with lang-specific subject
  updateMailtoLinks(lang);
}

function updateMailtoLinks(lang) {
  const subjects = {
    en: 'Appointment Request – Fisiodori',
    hu: 'Időpontfoglalás – Fisiodori',
    es: 'Solicitud de cita – Fisiodori',
  };
  const bodies = {
    en: 'Hello Dóra,%0D%0A%0D%0AI would like to book a session. Please let me know your availability.%0D%0A%0D%0AThank you!',
    hu: 'Kedves Dóra,%0D%0A%0D%0AIdőpontot szeretnék foglalni. Kérem, adja meg szabad időpontjait.%0D%0A%0D%0AKöszönöm!',
    es: 'Hola Dóra,%0D%0A%0D%0AMe gustaría reservar una sesión. ¿Podría indicarme su disponibilidad?%0D%0A%0D%0A¡Muchas gracias!',
  };
  const href = `mailto:${EMAIL}?subject=${subjects[lang]}&body=${bodies[lang]}`;
  document.querySelectorAll('.mailto-link').forEach(a => a.href = href);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('fisiodori-lang');
  if (saved) {
    setLang(saved);
  } else {
    // Default: show overlay — set EN elements active so page isn't blank
    document.querySelectorAll('[data-lang="en"]').forEach(el => el.classList.add('active'));
    document.querySelectorAll('[data-lang-i="en"]').forEach(el => el.classList.add('active'));
  }

  // Hamburger menu
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      if (hamburger) hamburger.classList.remove('open');
      if (navLinks) navLinks.classList.remove('open');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Nav shadow on scroll
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(0,0,0,.08)'
        : 'none';
    }, { passive: true });
  }

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.service-card, .blog-card, .credential, .contact-card').forEach(el => {
    el.classList.add('fade-in-el');
    observer.observe(el);
  });
});

/* expose for HTML onclick */
window.setLang = setLang;
