// scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
  // —— HERO SLIDER ——
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  let current  = 0;
  let sliderInterval = setInterval(() => showSlide(current + 1), 5000);

  function showSlide(idx) {
    // hide current
    slides[current].classList.remove('active');
    slides[current].style.opacity = 0;
    dots[current].classList.replace('opacity-100', 'opacity-50');

    // compute next
    current = (idx + slides.length) % slides.length;

    // show next
    slides[current].classList.add('active');
    slides[current].style.opacity = 1;
    dots[current].classList.replace('opacity-50', 'opacity-100');
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(sliderInterval);
      showSlide(i);
      sliderInterval = setInterval(() => showSlide(current + 1), 5000);
    });
  });

  // —— CHATBOT UI TOGGLE & CLOSE ——
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatUI     = document.getElementById('chatbot-ui');
  const chatClose  = document.getElementById('close-chatbot');

  chatToggle.addEventListener('click', () => {
    chatUI.classList.toggle('hidden');
  });
  chatClose.addEventListener('click', () => {
    chatUI.classList.add('hidden');
  });
});
