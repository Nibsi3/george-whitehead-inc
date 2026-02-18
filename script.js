/* ============================================================
   GEORGE WHITEHEAD INC. — INTERACTIONS
   ============================================================ */

(function ()
{
  'use strict';

  /* ── Sticky Nav ── */
  const nav = document.querySelector('.nav');
  const onScroll = () =>
  {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) =>
    {
      entries.forEach((entry) =>
      {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));

  /* ── Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) =>
  {
    anchor.addEventListener('click', function (e)
    {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Hero Parallax (photo layer) ── */
  const heroPhoto = document.querySelector('.hero__photo');
  if (heroPhoto) {
    // Subtle Ken Burns scale on load
    heroPhoto.style.transition = 'transform 12s ease-out';
    heroPhoto.style.transform = 'scale(1.06)';
    requestAnimationFrame(() =>
    {
      heroPhoto.style.transform = 'scale(1.0)';
    });

    // Scroll parallax
    window.addEventListener('scroll', () =>
    {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroPhoto.style.transition = 'none';
        heroPhoto.style.transform = `scale(1.0) translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ── Mobile Nav Toggle ── */
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');
  const navCta = document.querySelector('.nav__cta');

  if (hamburger) {
    hamburger.addEventListener('click', () =>
    {
      const isOpen = navLinks.classList.toggle('nav__links--open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ── Counter Animation for Stats ── */
  const statNums = document.querySelectorAll('.stat-item__num[data-count]');
  const countObserver = new IntersectionObserver(
    (entries) =>
    {
      entries.forEach((entry) =>
      {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const start = performance.now();

          const tick = (now) =>
          {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach((el) => countObserver.observe(el));

  /* ── Form Submission (prevent default, show confirmation) ── */
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', (e) =>
    {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message Sent';
      btn.style.background = 'transparent';
      btn.style.color = 'var(--clr-gold)';
      btn.style.borderColor = 'var(--clr-gold)';
      btn.disabled = true;
      setTimeout(() =>
      {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  /* ── Mobile Nav Styles (injected) ── */
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .nav__links--open {
        display: flex !important;
        flex-direction: column;
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(8,8,8,0.98);
        backdrop-filter: blur(20px);
        align-items: center;
        justify-content: center;
        gap: 2.5rem;
        z-index: 999;
      }
      .nav__links--open .nav__link {
        font-size: 1.5rem;
        font-family: 'Cormorant Garamond', serif;
        font-weight: 300;
        letter-spacing: 0.1em;
        color: var(--clr-text);
      }
    }
  `;
  document.head.appendChild(style);

})();
