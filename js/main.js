// ===== Frost Particle Canvas =====
(function initFrostCanvas() {
  const canvas = document.getElementById('frostCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = Math.random() * 0.3 + 0.1;
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 600 + 400;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.life++;
      if (this.y > h + 5 || this.life > this.maxLife) this.reset();
      if (this.x > w + 5) this.x = -5;
      if (this.x < -5) this.x = w + 5;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 230, 255, ${this.opacity})`;
      ctx.fill();
    }
  }
  const count = Math.min(120, Math.floor(w * h / 8000));
  for (let i = 0; i < count; i++) particles.push(new Particle());
  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();
// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}
// ===== Mobile Nav Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}
// ===== Back to Top =====
const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
// ===== Scroll Reveal Animation =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.info-card, .class-card, .dungeon-card, .prof-card, .pvp-card, .rep-card, .level-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});
// ===== Class Card Click =====
document.querySelectorAll('.class-card').forEach(card => {
  card.addEventListener('click', () => {
    const page = card.dataset.page;
    if (page) {
      window.location.href = page;
    }
  });
});
