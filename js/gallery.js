/*==========================================================
    SUN QUEST — GALLERY PAGE  (gallery.html)

    CONTENTS
    01  Helpers
    02  Hero intro
    03  Mobile menu
    04  Navbar + back-to-top button
    05  Fade-in while scrolling
    06  Filter buttons
    07  Lightbox (full-size viewer)
==========================================================*/

(() => {

  "use strict";


  /*------------------------------------------------------
      01  HELPERS
  ------------------------------------------------------*/

  const $  = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;


  /*------------------------------------------------------
      02  HERO INTRO
  ------------------------------------------------------*/

  $(".gallery-hero")?.classList.add("in");


  /*------------------------------------------------------
      03  MOBILE MENU
  ------------------------------------------------------*/

  const menuBtn = $("#menuBtn");
  const navMenu = $("#navMenu");

  const setMenu = open => {

    if (!menuBtn || !navMenu) return;

    navMenu.classList.toggle("show", open);

    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.textContent = open ? "✕" : "☰";

    document.body.classList.toggle("no-scroll", open);

  };

  menuBtn?.addEventListener("click", () =>
    setMenu(!navMenu.classList.contains("show"))
  );

  $$("#navMenu a").forEach(link =>
    link.addEventListener("click", () => setMenu(false))
  );

  addEventListener("resize", () => innerWidth > 900 && setMenu(false));


  /*------------------------------------------------------
      04  NAVBAR + BACK-TO-TOP BUTTON
  ------------------------------------------------------*/

  const navbar = $("#navbar");

  const topBtn = document.createElement("button");

  topBtn.id   = "topBtn";
  topBtn.type = "button";
  topBtn.textContent = "↑";
  topBtn.setAttribute("aria-label", "Back to top");

  document.body.appendChild(topBtn);

  topBtn.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  );

  let ticking = false;

  const onScroll = () => {

    navbar?.classList.toggle("scrolled", scrollY > 80);

    topBtn.classList.toggle("visible", scrollY > 600);

    ticking = false;

  };

  addEventListener("scroll", () => {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(onScroll);

  }, { passive: true });

  onScroll();


  /*------------------------------------------------------
      05  FADE-IN WHILE SCROLLING
  ------------------------------------------------------*/

  const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");

      revealObserver.unobserve(entry.target);

    });

  }, { threshold: 0.08 });

  $$(".reveal").forEach(item => revealObserver.observe(item));


  /*------------------------------------------------------
      06  FILTER BUTTONS
      Buttons are made automatically from the
      data-category word on each photo.
  ------------------------------------------------------*/

  const photos     = $$(".photo");
  const filterBar  = $("#filters");
  const photoCount = $("#photoCount");

  const visiblePhotos = () => photos.filter(photo => !photo.hidden);

  const updateCount = () => {

    if (!photoCount) return;

    const total = visiblePhotos().length;

    photoCount.textContent = total === 1 ? "Showing 1 photo" : `Showing ${total} photos`;

  };

  if (filterBar && photos.length) {

    const categories = ["All", ...new Set(photos.map(photo => photo.dataset.category).filter(Boolean))];

    categories.forEach((category, index) => {

      const count = category === "All"
        ? photos.length
        : photos.filter(photo => photo.dataset.category === category).length;

      const chip = document.createElement("button");

      chip.type = "button";
      chip.className = "chip" + (index === 0 ? " active" : "");
      chip.dataset.filter = category;
      chip.setAttribute("aria-pressed", index === 0);
      chip.innerHTML = `${category} <small>${count}</small>`;

      filterBar.appendChild(chip);

    });

    /* Hide the filter row if there is only one category */
    if (categories.length <= 2) filterBar.hidden = true;

    filterBar.addEventListener("click", event => {

      const chip = event.target.closest(".chip");

      if (!chip) return;

      $$(".chip", filterBar).forEach(other => {
        other.classList.toggle("active", other === chip);
        other.setAttribute("aria-pressed", other === chip);
      });

      photos.forEach(photo => {
        photo.hidden = !(chip.dataset.filter === "All" || photo.dataset.category === chip.dataset.filter);
      });

      updateCount();

    });

  }

  updateCount();


  /*------------------------------------------------------
      07  LIGHTBOX
      Opens the photo full size. Arrows, swipe and keyboard
      only move through the photos that are showing.
  ------------------------------------------------------*/

  const lightbox = $("#lightbox");
  const lbImage  = $("#lbImage");
  const lbTitle  = $("#lbTitle");
  const lbMeta   = $("#lbMeta");
  const lbClose  = $("#lbClose");

  if (lightbox && lbImage && photos.length) {

    let current   = 0;
    let lastFocus = null;

    const isOpen = () => lightbox.classList.contains("show");

    const showPhoto = index => {

      const list = visiblePhotos();

      if (!list.length) return;

      current = (index + list.length) % list.length;

      const photo = list[current];
      const img   = $("img", photo);

      lbImage.classList.add("loading");

      lbImage.onload = () => lbImage.classList.remove("loading");

      lbImage.src = img.currentSrc || img.src;
      lbImage.alt = img.alt;

      lbTitle.textContent = img.alt;
      lbMeta.textContent  = `${photo.dataset.category || ""}  ·  ${current + 1} / ${list.length}`;

      /* Start loading the next photo so it opens instantly */
      new Image().src = $("img", list[(current + 1) % list.length]).src;

    };

    const openLightbox = photo => {

      lastFocus = document.activeElement;

      showPhoto(visiblePhotos().indexOf(photo));

      lightbox.classList.add("show");

      document.body.classList.add("no-scroll");

      lbClose.focus();

    };

    const closeLightbox = () => {

      lightbox.classList.remove("show");

      document.body.classList.remove("no-scroll");

      lastFocus?.focus();

    };

    /* Click a photo */
    photos.forEach(photo => {

      $(".photo-btn", photo).addEventListener("click", () => openLightbox(photo));

    });

    /* Buttons */
    lbClose.addEventListener("click", closeLightbox);
    $("#lbNext").addEventListener("click", () => showPhoto(current + 1));
    $("#lbPrev").addEventListener("click", () => showPhoto(current - 1));

    /* Click the dark background to close */
    lightbox.addEventListener("click", event => {

      if (event.target === lightbox) closeLightbox();

    });

    /* Keyboard */
    addEventListener("keydown", event => {

      if (!isOpen()) return;

      if (event.key === "Escape")     closeLightbox();
      if (event.key === "ArrowRight") showPhoto(current + 1);
      if (event.key === "ArrowLeft")  showPhoto(current - 1);

    });

    /* Swipe left / right on phones */
    let startX = null;
    let startY = null;

    lightbox.addEventListener("touchstart", event => {

      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;

    }, { passive: true });

    lightbox.addEventListener("touchend", event => {

      if (startX === null) return;

      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;

      /* Only count mostly-sideways swipes */
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        showPhoto(current + (dx < 0 ? 1 : -1));
      }

      startX = startY = null;

    });

  }

})();
