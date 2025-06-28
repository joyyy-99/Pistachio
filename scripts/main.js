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

});


/* Section for menu */

let mainEl = document.getElementById("mains");
let sectionEl = document.getElementById("section-selection")

mainEl.addEventListener("click", function(){
  sectionEl.innerHTML =
  `<div id="menu-container" class="grid w-full grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 px-4 md:px-12 py-8 md:py-14">

        <!-- Column 1: Menu Items -->
        <div id="column1" class="grid grid-rows-4 gap-8">
          
          <!-- Item 1 -->
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#FAF9F6] dark:bg-gray-800 p-4 md:p-6">
            <div class="w-full sm:w-1/2">
              <img class="w-full h-56 object-cover block" src="assets/images/Menu/Mains/butter-chicken-makhani.jpg" alt="Butter Chicken Makhani">
            </div>
            <div class="w-full sm:w-1/2 flex flex-col justify-start pt-4 md:pt-8">
              <h2 class="text-center text-base text-2xl md:text-3xl font-medium mb-4">Hand Pulled Butter Chicken Makhani</h2>
              <p class="text-center text-sm md:text-base mt-2 font-inter text-gray-500">
                The most trending Indian dish across the globe which is proud of Indian cuisine! Boneless chicken cooked in tandoor served with rich makhani gravy dusted off with dehydrated fenugreek.
              </p>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#E0E0DC] dark:bg-gray-800 p-4 md:p-6">
            <div class="w-full sm:w-1/2">
              <img class="w-full h-56 object-cover block" src="assets/images/Menu/Mains/prawns-kolapuri.jpg" alt="Prawns Kolapuri">
            </div>
            <div class="w-full sm:w-1/2 flex flex-col justify-start pt-4 md:pt-8">
              <h2 class="text-center text-base text-2xl md:text-3xl font-medium mb-4">Prawns Kolapuri</h2>
              <p class = "text-center text-sm md:text-base mt-2 font-inter text-gray-500">
                A classic dish of prawns sautéed with inhouse spicy kolapuri spices.
              </p>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#FAF9F6] dark:bg-gray-800 p-4 md:p-6">
            <div class="w-full sm:w-1/2">
              <img class="w-full h-56 object-cover block" src="assets/images/Menu/Mains/masala-shrooms.jpg" alt="Masala Shrooms">
            </div>
            <div class="w-full sm:w-1/2 flex flex-col justify-start pt-4 md:pt-8">
              <h2 class="text-center text-base text-2xl md:text-3xl font-medium mb-4">Pan Toss Masala Shrooms Truffle Haze</h2>
              <p class="text-center text-sm md:text-base mt-2 font-inter text-gray-500">
                Assorted mushrooms with cream garlic truffle oil and served with aromatic truffle oil haze.
              </p>
            </div>
          </div>

          <!-- Item 4 -->
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#E0E0DC] dark:bg-gray-800 p-4 md:p-6">
            <div class="w-full sm:w-1/2">
              <img class="w-full h-56 object-cover block" src="assets/images/Menu/Mains/paneer-bhurji.jpg" alt="Paneer Bhurji">
            </div>
            <div class="w-full sm:w-1/2 flex flex-col justify-start pt-4 md:pt-8">
              <h2 class="text-center text-base text-2xl md:text-3xl font-medium mb-4">Paneer Bhurji</h2>
              <p class="text-center text-sm md:text-base mt-2 font-inter text-gray-500">
                Minced cottage cheese stir-fried with onions and tomato lightly spiced with freshly pounded coriander and chillies.
              </p>
            </div>
          </div>
        </div>

        <!-- Column 2: Side Menu -->
        <div id="column2" class="grid grid-rows-2 gap-8 content-center">
          
          <!-- Side Item 1 -->
          <div class="flex flex-col bg-[#FAF9F6] dark:bg-gray-800 p-0">
            <img src="assets/images/Menu/Mains/hyderabadi-chicken.jpg" alt="Hyderabadi Chicken" class="w-full h-48 object-cover mb-24">
            <h2 class="text-center text-base text-2xl md:text-3xl font-medium mb-10">Hyderabadi Chicken</h2>
            <p class="text-center px-5 text-sm md:text-base font-inter text-gray-500">
              Succulent chicken pieces cooked in tandoor simmered off with spices of Hyderabad.
            </p>
          </div>

          <!-- Side Item 2 -->
          <div class="flex flex-col bg-[#FAF9F6] dark:bg-gray-800 p-0">
            <img src="assets/images/Menu/Mains/amritsari.jpg" alt="Hyderabadi Chicken" class="w-full h-48 object-cover mb-24">
            <h2 class="text-center text-base text-2xl md:text-3xl font-medium mb-10">Amritsari Malai Kofta</h2>
            <p class="text-center text-sm md:text-base px-5 font-inter text-gray-500">
              Cottage cheese dumplings, khoya, raisin, nuts, green chillies, cashew gravy and can be served jain on request.
            </p>
          </div>
        </div>

      </div>`
})