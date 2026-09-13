const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const updatePage = () => {
  const available = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--progress', `${available > 0 ? (scrollY / available) * 100 : 0}%`);
  document.querySelector('.site-header')?.classList.toggle('scrolled', scrollY > 20);
};
updatePage();
addEventListener('scroll', updatePage, { passive: true });

const hero = document.querySelector('.hero');
if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const box = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${((event.clientX - box.left) / box.width) * 100}%`);
    hero.style.setProperty('--my', `${((event.clientY - box.top) / box.height) * 100}%`);
  });
}

const revealItems = document.querySelectorAll('.care-intro, .care-grid article, .experience-copy, .comparison figure, .result-wide, .special-copy, .poster, .guide-promo > *, .booking > *, .guide-content article');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealItems.forEach((item) => item.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12, rootMargin: '0px 0px -45px' });
  revealItems.forEach((item) => observer.observe(item));
}
