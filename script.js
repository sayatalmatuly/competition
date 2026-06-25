const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
const nav = document.getElementById('nav');
const scrollHint = document.querySelector('.hero__scroll-hint');

function closeMenu() {
  burger?.classList.remove('open');
  navLinks?.classList.remove('open');
  document.body.style.overflow = '';
}

burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav?.classList.toggle('scrolled', y > 40);
  if (scrollHint) scrollHint.style.opacity = y > 80 ? '0' : '1';
});

const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  if (link.getAttribute('href') === page) link.classList.add('nav__active');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    target.classList.add('visible');
    target.querySelectorAll('.skills__bar-fill').forEach(fill => {
      fill.style.width = fill.dataset.width + '%';
    });
    observer.unobserve(target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section__title, .section__inner > *, .hero .btn, .reveal').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
