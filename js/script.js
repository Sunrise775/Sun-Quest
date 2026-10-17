(() => {

  "use strict";

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

  $$("#navMenu a").forEach(link =>
    link.addEventListener("click", () => setMenu(false))
  );

  addEventListener("resize", () => innerWidth > 900 && setMenu(false));

  addEventListener("keydown", event => event.key === "Escape" && setMenu(false));


  const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");

      revealObserver.unobserve(entry.target);

    });

  }, { threshold: 0.08 });

  $$(".reveal").forEach(item => revealObserver.observe(item));


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

    const y = scrollY;

    navbar?.classList.toggle("scrolled", y > 80);

    topBtn.classList.toggle("visible", y > 600);

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

    lightbox.addEventListener("click", event => event.target === lightbox && closePhoto());

    /* Keyboard */
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

      if (innerWidth < 768) {
        locationCard.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "nearest"
        });
      }

    });

  });


  const EMAILJS = {
    publicKey:  "aa1SfF9gdjowyhD-Y",
    serviceId:  "service_zq4xavx",
    templateId: "template_6rpkxj5"
  };

  const contactForm = $("#contactForm");
  const formStatus  = $("#formStatus");

  if (contactForm && formStatus) {

    const sendBtn   = $('button[type="submit"]', contactForm);
    const sendLabel = sendBtn.textContent;

    let lastSent = 0;

    const setStatus = (message, type = "") => {
      formStatus.textContent = message;
      formStatus.className   = "form-status " + type;
    };

    const notSetUp = () =>
      typeof emailjs === "undefined" ||
      Object.values(EMAILJS).some(value => value.startsWith("YOUR_"));

    if (!notSetUp()) emailjs.init({ publicKey: EMAILJS.publicKey });

    contactForm.addEventListener("submit", async event => {

      event.preventDefault();

      if (contactForm.elements.website.value) return;

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (Date.now() - lastSent < 30000) {
        setStatus("Please wait a few seconds before sending another message.", "error");
        return;
      }

      if (notSetUp()) {
        console.warn("EmailJS isn't set up yet — add your keys in script.js (section 10).");
        setStatus("Sorry, the message form isn't working right now. Please try again later.", "error");
        return;
      }

      sendBtn.disabled    = true;
      sendBtn.textContent = "Sending...";
      setStatus("");

      try {

        await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, contactForm);

        lastSent = Date.now();

        contactForm.reset();

        setStatus("Thank you! Your message was sent. I'll get back to you soon.", "success");

      } catch (error) {

        console.error("EmailJS error:", error);

        setStatus("Sorry, your message couldn't be sent. Please try again in a moment.", "error");

      } finally {

        sendBtn.disabled    = false;
        sendBtn.textContent = sendLabel;

      }

    });

  }

})();
