/* SUN QUEST - place pages */
(() => {

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* Hero fade-in */
  window.addEventListener("load", () => {
    $(".place-hero-content")?.classList.add("in");
  });


  /* Mobile menu */
  const menuBtn = $("#menuBtn");
  const navMenu = $("#navMenu");

  const setMenu = open => {

    if (!menuBtn || !navMenu) return;

    navMenu.classList.toggle("show", open);

    menuBtn.setAttribute("aria-expanded", open);

    menuBtn.textContent = open ? "✕" : "☰";

    document.body.classList.toggle("menu-open", open);

  };

  menuBtn?.addEventListener("click", () =>
    setMenu(!navMenu.classList.contains("show"))
  );

  $$("#navMenu a").forEach(a =>
    a.addEventListener("click", () => setMenu(false))
  );

  addEventListener("resize", () => innerWidth > 900 && setMenu(false));

  addEventListener("keydown", e => e.key === "Escape" && setMenu(false));


  /* Reveal sections while scrolling */
  const io = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        io.unobserve(entry.target);

      }

    });

  }, { threshold: 0.08 });

  $$(".place-section").forEach(s => io.observe(s));


  /* Navbar background + back-to-top button */
  const navbar = $("#navbar");

  const topBtn = document.createElement("button");

  topBtn.id = "topBtn";
  topBtn.type = "button";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.textContent = "↑";

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

    if (!ticking) {

      ticking = true;

      requestAnimationFrame(onScroll);

    }

  }, { passive: true });

  onScroll();

})();
