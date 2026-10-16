(() => {

  "use strict";


  /*------------------------------------------------------
      01  HELPERS
  ------------------------------------------------------*/

  const $  = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch      = matchMedia("(pointer: coarse)").matches || innerWidth < 768;


  window.addEventListener("load", () => {

    const loader = $("#loader");

    const startHero = () => {
      loader?.remove();
      $(".hero-content")?.classList.add("in");
    };

    if (!loader) return startHero();

    setTimeout(() => {

      loader.classList.add("hide");

      setTimeout(startHero, 600);

    }, reduceMotion ? 0 : 1600);

  });




  $$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const target = $(link.getAttribute("href"));

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });

    });

  });




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

  /* Close the menu after choosing a link, on resize, or with Escape */
  $$("#navMenu a").forEach(link =>
    link.addEventListener("click", () => setMenu(false))
  );

  addEventListener("resize", () => innerWidth > 900 && setMenu(false));

  addEventListener("keydown", event => event.key === "Escape" && setMenu(false));




  /* Fade each chapter in the first time it comes into view */
  const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");

      revealObserver.unobserve(entry.target);

    });

  }, { threshold: 0.08 });

  $$(".reveal").forEach(item => revealObserver.observe(item));


  /* Highlight the menu link of the section you're reading */
  const menuLinks = $$("#navMenu a");

  const activeObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      menuLinks.forEach(link =>
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
      );

    });

  }, { rootMargin: "-45% 0px -50% 0px" });

  [$("#hero"), ...$$("section[id]")]
    .filter(Boolean)
    .forEach(section => activeObserver.observe(section));


 

  const navbar    = $("#navbar");
  const heroVideo = $("#hero-video");

  /* Back-to-top button */
  const topBtn = document.createElement("button");

  topBtn.id   = "topBtn";
  topBtn.type = "button";
  topBtn.textContent = "↑";
  topBtn.setAttribute("aria-label", "Back to top");

  document.body.appendChild(topBtn);

  topBtn.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  );

  /* One light scroll handler for everything */
  let ticking = false;

  const onScroll = () => {

    const y = scrollY;

    navbar?.classList.toggle("scrolled", y > 80);

    topBtn.classList.toggle("visible", y > 600);

    /* Parallax only on desktop */
    if (heroVideo && !isTouch && !reduceMotion && y < innerHeight) {
      heroVideo.style.transform = `translateY(${y * 0.15}px) scale(1.05)`;
    }

    ticking = false;

  };

  addEventListener("scroll", () => {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(onScroll);

  }, { passive: true });

  onScroll();



  const stats = $("#stats");

  if (stats) {

    const counterObserver = new IntersectionObserver(([entry]) => {

      if (!entry.isIntersecting) return;

      counterObserver.disconnect();

      $$(".counter").forEach(counter => {

        const target   = +counter.dataset.target;
        const duration = reduceMotion ? 1 : 1800;
        const start    = performance.now();

        const step = now => {

          const progress = Math.min((now - start) / duration, 1);

          counter.textContent = Math.floor(target * progress).toLocaleString();

          if (progress < 1) requestAnimationFrame(step);

        };

        requestAnimationFrame(step);

      });

    }, { threshold: 0.3 });

    counterObserver.observe(stats);

  }



  const photos      = $$(".gallery-card img");
  const lightbox    = $("#lightbox");
  const lightboxImg = $("#lightboxImage");

  if (lightbox && lightboxImg && photos.length) {

    let current = 0;

    const showPhoto = index => {

      current = (index + photos.length) % photos.length;

      lightboxImg.src = photos[current].src;
      lightboxImg.alt = photos[current].alt;

      lightbox.classList.add("show");

      document.body.classList.add("no-scroll");

    };

    const closePhoto = () => {

      lightbox.classList.remove("show");

      document.body.classList.remove("no-scroll");

    };

    photos.forEach((photo, index) =>
      photo.addEventListener("click", () => showPhoto(index))
    );

    $("#closeLightbox")?.addEventListener("click", closePhoto);
    $("#nextImage")?.addEventListener("click", () => showPhoto(current + 1));
    $("#prevImage")?.addEventListener("click", () => showPhoto(current - 1));

    /* Click the dark background to close */
    lightbox.addEventListener("click", event => event.target === lightbox && closePhoto());

   
    addEventListener("keydown", event => {

      if (!lightbox.classList.contains("show")) return;

      if (event.key === "Escape")     closePhoto();
      if (event.key === "ArrowRight") showPhoto(current + 1);
      if (event.key === "ArrowLeft")  showPhoto(current - 1);

    });

    
    let touchStartX = null;

    lightbox.addEventListener("touchstart", event => {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", event => {

      if (touchStartX === null) return;

      const distance = event.changedTouches[0].clientX - touchStartX;

      if (Math.abs(distance) > 50) {
        showPhoto(current + (distance < 0 ? 1 : -1));
      }

      touchStartX = null;

    });

  }


  

  const places = {

    surigao: [
      "Surigao City",
      "My hometown and where my motorcycle journey truly began. Every ride reminds me that every great adventure starts close to home.",
      "places/surigao.html"
    ],

    butuan: [
      "Siargao",
      "One of my favorite rides, filled with long highways and memorable moments.",
      "places/siargao.html"
    ],

    bislig: [
      "Bislig",
      "Known for its beautiful scenery and unforgettable roads.",
      "places/bislig.html"
    ],

    tandag: [
      "Albay",
      "A peaceful destination with relaxing coastal roads.",
      "places/albay.html"
    ],

    davao: [
      "Dinagat Island",
      "A major destination that challenged both rider and motorcycle.",
      "places/dinagat.html"
    ]

  };

  const locations    = $$(".location");
  const locationCard = $("#locationCard");

  locations.forEach(button => {

    button.addEventListener("click", () => {

      const place = places[button.dataset.place];

      if (!place || !locationCard) return;

      locations.forEach(other => other.classList.remove("active"));

      button.classList.add("active");

      locationCard.innerHTML = `
        <h2>📍 ${place[0]}</h2>
        <p>${place[1]}</p>
        <a class="story-btn" href="${place[2]}">Read Full Story →</a>
      `;

      /* On phones the card is below the buttons — make sure it is seen */
      if (innerWidth < 768) {
        locationCard.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "nearest"
        });
      }

    });

  });

})();
