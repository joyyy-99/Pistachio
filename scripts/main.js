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


  // —— MOBILE MENU ——
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileNav = document.getElementById('mobile-menu');
  mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });


  // —— THEME TOGGLE (DESKTOP & MOBILE) ——
  const btnDesktop = document.getElementById('theme-toggle');
  const btnMobile  = document.getElementById('theme-toggle-mobile');
  const iconDesk   = document.getElementById('theme-icon');
  const iconMob    = document.getElementById('theme-icon-mobile');

  function applyTheme(mode) {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      iconDesk.src = 'assets/icons/light-mode-icon.png';
      iconMob.src  = 'assets/icons/light-mode-icon.png';
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      iconDesk.src = 'assets/icons/dark-mode-icon.png';
      iconMob.src  = 'assets/icons/dark-mode-icon.png';
      localStorage.theme = 'light';
    }
  }

  [btnDesktop, btnMobile].forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  });

  // on load: respect saved preference or system
  if (
    localStorage.theme === 'dark' ||
    (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }


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
