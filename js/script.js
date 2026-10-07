
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(pointer: coarse)").matches || innerWidth < 768;

 
  window.addEventListener("load", () => {
    const loader = $("#loader");
    const done = () => { loader && loader.remove(); $(".hero-content")?.classList.add("in"); };
    if (!loader) return done();
    setTimeout(() => { loader.classList.add("hide"); setTimeout(done, 600); }, reduceMotion ? 0 : 900);
  });

  $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const t = $(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }));


  const menuBtn = $("#menuBtn"), navMenu = $("#navMenu");
  const setMenu = open => {
    if (!menuBtn || !navMenu) return;
    navMenu.classList.toggle("show", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.textContent = open ? "✕" : "☰";
    document.body.classList.toggle("menu-open", open);
  };
  menuBtn?.addEventListener("click", () => setMenu(!navMenu.classList.contains("show")));
  $$("#navMenu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("resize", () => innerWidth > 860 && setMenu(false));
  addEventListener("keydown", e => e.key === "Escape" && setMenu(false));


  const sections = $$("section[id]");
  const revealIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("show"); revealIO.unobserve(e.target); }
  }), { threshold: 0.08 });
  sections.forEach(s => revealIO.observe(s));

  const links = $$("#navMenu a");
  const navIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  [$("#hero"), ...sections].filter(Boolean).forEach(s => navIO.observe(s));


  const navbar = $("#navbar"), heroVideo = $("#hero-video");
  const topBtn = document.createElement("button");
  topBtn.id = "topBtn"; topBtn.type = "button"; topBtn.setAttribute("aria-label", "Back to top"); topBtn.textContent = "↑";
  document.body.appendChild(topBtn);
  topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    navbar?.classList.toggle("scrolled", y > 80);
    topBtn.classList.toggle("visible", y > 600);
    if (heroVideo && !isTouch && !reduceMotion && y < innerHeight)
      heroVideo.style.transform = `translateY(${y * 0.15}px) scale(1.05)`;
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  
  const stats = $("#stats");
  if (stats) {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      $$(".counter").forEach(c => {
        const target = +c.dataset.target, t0 = performance.now(), dur = reduceMotion ? 1 : 1800;
        const step = now => {
          const p = Math.min((now - t0) / dur, 1);
          c.textContent = Math.floor(target * p).toLocaleString();
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.3 });
    io.observe(stats);
  }


  const imgs = $$(".gallery-card img"), lb = $("#lightbox"), lbImg = $("#lightboxImage");
  if (lb && lbImg && imgs.length) {
    let i = 0;
    const show = n => { i = (n + imgs.length) % imgs.length; lbImg.src = imgs[i].src; lbImg.alt = imgs[i].alt; lb.classList.add("show"); document.body.classList.add("menu-open"); };
    const close = () => { lb.classList.remove("show"); document.body.classList.remove("menu-open"); };
    imgs.forEach((im, n) => im.addEventListener("click", () => show(n)));
    $("#closeLightbox")?.addEventListener("click", close);
    $("#nextImage")?.addEventListener("click", () => show(i + 1));
    $("#prevImage")?.addEventListener("click", () => show(i - 1));
    lb.addEventListener("click", e => e.target === lb && close());
    addEventListener("keydown", e => {
      if (!lb.classList.contains("show")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(i + 1);
      if (e.key === "ArrowLeft") show(i - 1);
    });
    let x0 = null;
    lb.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }


  const places = {
    surigao: ["Surigao City", "My hometown and where my motorcycle journey truly began. Every ride reminds me that every great adventure starts close to home."],
    butuan: ["Siargao", "One of my favorite rides, filled with long highways and memorable moments."],
    bislig: ["Bislig", "Known for its beautiful scenery and unforgettable roads."],
    tandag: ["Albay", "A peaceful destination with relaxing coastal roads."],
    davao: ["Dinagat Island", "A major destination that challenged both rider and motorcycle."]
  };
  const spots = $$(".location"), card = $("#locationCard");
  spots.forEach(s => s.addEventListener("click", () => {
    const d = places[s.dataset.place];
    if (!d || !card) return;
    spots.forEach(o => o.classList.remove("active"));
    s.classList.add("active");
    card.innerHTML = `<h2>📍 ${d[0]}</h2><p>${d[1]}</p><a class="story-btn" href="journal.html">Read Full Story →</a>`;
  }));
})();
