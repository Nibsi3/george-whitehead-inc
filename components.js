/* ============================================================
   SHARED NAV & FOOTER — injected into every page
   ============================================================ */
(function ()
{
    'use strict';

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const NAV_HTML = `
  <header class="nav" role="banner">
    <div class="container">
      <div class="nav__inner">
        <a href="index.html" class="nav__logo" aria-label="George Whitehead Inc. — Home">
          <span class="nav__logo-main">George Whitehead Inc.</span>
          <span class="nav__logo-sub">Attorneys &amp; Conveyancers</span>
        </a>
        <nav aria-label="Primary navigation">
          <ul class="nav__links" id="nav-links">
            <li><a href="about.html"    class="nav__link" data-page="about.html">About</a></li>
            <li><a href="practice.html" class="nav__link" data-page="practice.html">Practice Areas</a></li>
            <li><a href="team.html"     class="nav__link" data-page="team.html">Our Team</a></li>
            <li><a href="contact.html"  class="nav__link" data-page="contact.html">Contact</a></li>
          </ul>
        </nav>
        <a href="contact.html" class="nav__cta" id="nav-cta">Enquire Now</a>
        <button class="nav__hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;

    const FOOTER_HTML = `
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <p class="footer__brand-name">George Whitehead Inc.</p>
          <p class="footer__brand-tag">Attorneys &amp; Conveyancers</p>
          <p class="footer__brand-desc">
            A niche legal practice delivering bespoke counsel across commercial, banking, property and construction law since 1998.
          </p>
        </div>
        <div>
          <p class="footer__col-title">Navigation</p>
          <ul class="footer__links">
            <li><a href="index.html"    class="footer__link">Home</a></li>
            <li><a href="about.html"    class="footer__link">About the Firm</a></li>
            <li><a href="practice.html" class="footer__link">Practice Areas</a></li>
            <li><a href="team.html"     class="footer__link">Our Team</a></li>
            <li><a href="contact.html"  class="footer__link">Contact</a></li>
          </ul>
        </div>
        <div>
          <p class="footer__col-title">Practice Areas</p>
          <ul class="footer__links">
            <li><a href="practice.html#commercial"    class="footer__link">Commercial &amp; Banking Law</a></li>
            <li><a href="practice.html#construction"  class="footer__link">Construction Law</a></li>
            <li><a href="practice.html#conveyancing"  class="footer__link">Property &amp; Conveyancing</a></li>
          </ul>
        </div>
        <div>
          <p class="footer__col-title">Contact</p>
          <ul class="footer__links">
            <li><a href="tel:+27448741838" class="footer__link">+27 (0)44 874 1838</a></li>
            <li><a href="mailto:george@gwinc.co.za" class="footer__link">george@gwinc.co.za</a></li>
            <li><a href="mailto:loren@gwinc.co.za"  class="footer__link">loren@gwinc.co.za</a></li>
            <li style="margin-top:0.5rem;"><span class="footer__link" style="cursor:default;">George, 6529</span></li>
            <li><span class="footer__link" style="cursor:default;">Cape Town, 7530</span></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__copy">
          &copy; 2024 <span>George Whitehead Inc.</span> All rights reserved. Registered with the Legal Practice Council, Western Cape.
        </p>
        <nav class="footer__legal" aria-label="Legal links">
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="terms-conditions.html">Terms &amp; Conditions</a>
        </nav>
      </div>
    </div>
  </footer>`;

    // Inject nav before body content
    document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
    // Inject footer at end of body
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

    // Mark active nav link
    document.querySelectorAll('.nav__link[data-page]').forEach(link =>
    {
        if (link.dataset.page === currentPage) {
            link.style.color = 'var(--clr-gold)';
            link.style.setProperty('--active', '1');
        }
    });

    // Sticky nav on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () =>
    {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(entries =>
    {
        entries.forEach(e =>
        {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor =>
    {
        anchor.addEventListener('click', function (e)
        {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }
        });
    });

    // Mobile hamburger
    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks = document.querySelector('.nav__links');
    if (hamburger) {
        hamburger.addEventListener('click', () =>
        {
            const isOpen = navLinks.classList.toggle('nav__links--open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
    }

    // Mobile nav styles
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
