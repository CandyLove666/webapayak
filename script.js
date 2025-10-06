// SAFEGUARDS for missing elements
const navLinks = document.querySelector('.nav-links');
const hamb = document.getElementById('hamb');
const nav = document.querySelector('.navbar');
const fadeEls = document.querySelectorAll('.fade-up');
const backToTop = document.getElementById('backToTop');
const playBtn = document.getElementById('playAmb');
const audio = document.getElementById('ambientAudio');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');

// HAMBURGER toggle for mobile
if (hamb && navLinks) {
  hamb.addEventListener('click', () => navLinks.classList.toggle('active'));
}

// NAV background on scroll
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);

  // back to top
  if (backToTop) backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Fade-up reveal
function reveal() {
  fadeEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// back to top smooth
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Audio play/pause toggle
if (playBtn && audio) {
  // update icon/text based on state
  function updatePlayBtn(){
    playBtn.textContent = audio.paused ? '🔊' : '🔈';
  }
  playBtn.addEventListener('click', async () => {
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
      updatePlayBtn();
    } catch(e){
      // browsers may block autoplay – show a hint
      alert('Autoplay diblokir. Klik tombol play sekali lagi atau izinkan suara pada tab ini.');
    }
  });
  updatePlayBtn();
}

// minor theme toggle (invert accent for fun)
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☼' : '☾';
    // optional: invert background veil brightness
    document.querySelector('.bg-veil').style.filter = document.body.classList.contains('light-mode')
      ? 'blur(6px) brightness(0.55) contrast(1.05)'
      : 'blur(6px) brightness(0.35) contrast(1.05)';
  });
}

// Simple contact form handler (client-side only)
if (contactForm) {
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    // basic UX: simulate sending
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Mengirim...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Terkirim ✓';
      contactForm.reset();
      setTimeout(()=>{ btn.textContent = original; btn.disabled = false; }, 1800);
    }, 1400);
  });
}

// accessibility: keyboard ESC closes mobile nav
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
});
