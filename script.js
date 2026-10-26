const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
$('#year').textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = $('.menu-toggle');
const nav = $('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
$$('.nav-link').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Scroll reveal; reduced-motion users see content immediately.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 75}ms`;
    observer.observe(el);
  });
} else {
  $$('.reveal').forEach(el => el.classList.add('visible'));
}

// Highlight the navigation item matching the visible section.
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      $$('.nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
$$('main section[id]').forEach(section => sectionObserver.observe(section));

// Lightweight pointer glow and subtle hero portrait tilt on capable devices.
if (window.matchMedia('(pointer:fine)').matches && !reducedMotion) {
  document.body.classList.add('has-pointer');
  const glow = $('.cursor-glow');
  window.addEventListener('pointermove', event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
  const hero = $('.hero');
  const portrait = $('.portrait-frame');
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    portrait.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
  });
  hero.addEventListener('pointerleave', () => portrait.style.transform = 'rotateY(0) rotateX(0)');
}

// The contact form is intentionally demo-only. It validates inputs locally and
// never transmits, stores, or claims to send any personal data.
const form = $('#contactForm');
const status = $('#formStatus');
form.addEventListener('submit', event => {
  event.preventDefault();
  status.textContent = '';
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const subject = String(data.get('subject') || '').trim();
  const message = String(data.get('message') || '').trim();
  const consent = data.get('consent') === 'on';
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 2 || name.length > 80) status.textContent = 'Please enter a name between 2 and 80 characters.';
  else if (!emailLooksValid || email.length > 254) status.textContent = 'Please enter a valid email address.';
  else if (!subject) status.textContent = 'Please choose a subject.';
  else if (message.length < 10 || message.length > 2000) status.textContent = 'Your message must be between 10 and 2,000 characters.';
  else if (!consent) status.textContent = 'Please confirm that you understand this is a demo form.';
  else {
    status.textContent = 'Demo validation successful. Nothing was sent or saved. Connect a secure backend before using this form publicly.';
    form.reset();
  }
});
