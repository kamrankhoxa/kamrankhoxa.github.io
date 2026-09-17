/**
 * main.js — Parallax, typewriter, scroll reveals, DOM rendering
 * Depends on window.PORTFOLIO from data.js
 */
(function () {
  "use strict";

  const data = window.PORTFOLIO || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  /* ── Helpers ── */
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* ── Render content from data.js ── */
  function renderFloatTags() {
    const layer = $("[data-float-tags]");
    if (!layer || !data.floatTags) return;

    data.floatTags.forEach(function (tag) {
      const node = el("span", "float-tag", tag.label);
      node.style.left = tag.x + "%";
      node.style.top = tag.y + "%";
      node.dataset.depth = String(tag.depth || 1);
      layer.appendChild(node);
    });
  }

  function renderSkills() {
    const grid = $("[data-skills-grid]");
    if (!grid || !data.skills) return;

    data.skills.forEach(function (cat) {
      const card = el("article", "skill-card glass reveal");
      card.innerHTML =
        "<h3>" +
        cat.title +
        "</h3><ul>" +
        cat.items.map(function (i) {
          return "<li>" + i + "</li>";
        }).join("") +
        "</ul>";
      grid.appendChild(card);
    });
  }

  function renderProjects() {
    const wrap = $("[data-projects]");
    if (!wrap || !data.projects) return;

    data.projects.forEach(function (p, i) {
      const card = el("article", "project-card glass");
      card.style.transitionDelay = (i % 3) * 0.08 + "s";

      var actions = "";
      if (p.live) {
        actions +=
          '<a class="btn btn-primary" href="' +
          p.live +
          '" target="_blank" rel="noopener noreferrer">Live</a>';
      }
      if (p.code) {
        actions +=
          '<a class="btn btn-ghost" href="' +
          p.code +
          '" target="_blank" rel="noopener noreferrer">Code</a>';
      }

      card.innerHTML =
        '<p class="stack">' +
        p.stack +
        "</p><h3>" +
        p.name +
        "</h3><p>" +
        p.desc +
        '</p><div class="project-actions">' +
        actions +
        "</div>";
      wrap.appendChild(card);
    });
  }

  function renderExperience() {
    const wrap = $("[data-experience]");
    if (!wrap || !data.experience) return;

    data.experience.forEach(function (job) {
      const card = el("article", "job-card glass reveal");
      card.innerHTML =
        '<div class="job-head"><span class="job-title">' +
        job.role +
        ' · <a href="' +
        job.url +
        '" target="_blank" rel="noopener noreferrer">' +
        job.company +
        '</a></span><span class="job-meta">' +
        job.meta +
        "</span></div><ul>" +
        job.bullets
          .map(function (b) {
            return "<li>" + b + "</li>";
          })
          .join("") +
        "</ul>";
      wrap.appendChild(card);
    });
  }

  function renderResearch() {
    const wrap = $("[data-research]");
    if (!wrap || !data.research) return;

    data.research.forEach(function (item) {
      const card = el("article", "research-card glass reveal");
      card.innerHTML = "<h3>" + item.title + "</h3><p>" + item.body + "</p>";
      wrap.appendChild(card);
    });
  }

  /* ── Typewriter ── */
  function initTypewriter() {
    const target = $("[data-typewriter]");
    if (!target) return;

    const full = data.typewriterText || target.textContent.trim();
    if (reduceMotion) {
      target.textContent = full;
      return;
    }

    target.textContent = "";
    let i = 0;
    const speed = 38;

    function tick() {
      if (i <= full.length) {
        target.textContent = full.slice(0, i);
        i += 1;
        window.setTimeout(tick, speed);
      }
    }
    window.setTimeout(tick, 400);
  }

  /* ── Sticky multi-layer parallax (smooth lerp + translateY) ──
     Progress 0→1 across .hero-runway. Each layer moves at data-speed:
     bg 0.15x · mid 0.35x · fg 1x
  */
  function initParallax() {
    const runway = $(".hero-runway");
    const layers = $$(".parallax-layer[data-speed]");
    const floatTags = $$(".float-tag");
    if (!runway || !layers.length) return;

    // Travel distance (px) at full speed (1x) across the runway
    const TRAVEL = 420;
    const LERP = 0.12; // lower = silkier

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = 0;
    let running = true;

    function readProgress() {
      if (reduceMotion || isMobile()) return 0;
      const rect = runway.getBoundingClientRect();
      const total = Math.max(1, runway.offsetHeight - window.innerHeight);
      // How far we've scrolled through the runway
      const scrolled = clamp(-rect.top, 0, total);
      return scrolled / total;
    }

    function apply(progress) {
      if (reduceMotion || isMobile()) {
        layers.forEach(function (layer) {
          layer.style.transform = "translate3d(0, 0, 0)";
        });
        floatTags.forEach(function (tag) {
          tag.style.transform = "translate3d(0, 0, 0)";
        });
        return;
      }

      layers.forEach(function (layer) {
        const speed = parseFloat(layer.dataset.speed || "1");
        // Negative = rise upward as user scrolls down
        const y = -(progress * TRAVEL * speed);
        layer.style.transform = "translate3d(0, " + y.toFixed(2) + "px, 0)";
      });

      // Per-tag depth multiplier on top of mid layer
      floatTags.forEach(function (tag) {
        const depth = parseFloat(tag.dataset.depth || "1");
        const y = -(progress * TRAVEL * 0.35 * (depth - 1) * 0.85);
        tag.style.transform = "translate3d(0, " + y.toFixed(2) + "px, 0)";
      });
    }

    function tick() {
      targetProgress = readProgress();
      currentProgress = lerp(currentProgress, targetProgress, reduceMotion ? 1 : LERP);

      // Snap when close enough to save work
      if (Math.abs(targetProgress - currentProgress) < 0.0008) {
        currentProgress = targetProgress;
      }

      apply(currentProgress);

      if (running) rafId = window.requestAnimationFrame(tick);
    }

    function onResize() {
      targetProgress = readProgress();
      if (isMobile() || reduceMotion) {
        currentProgress = targetProgress;
        apply(0);
      }
    }

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) rafId = window.requestAnimationFrame(tick);
    });

    rafId = window.requestAnimationFrame(tick);
  }

  /* ── Scroll-triggered reveals (IntersectionObserver) ── */
  function initReveals() {
    const items = $$(".reveal, .project-card");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (n) {
        n.classList.add("is-visible");
      });
      return;
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (n) {
      io.observe(n);
    });
  }

  /* ── Nav ── */
  function initNav() {
    const nav = $("#site-nav");
    const toggle = $("[data-nav-toggle]");
    const links = $(".nav-links");

    function onScroll() {
      if (!nav) return;
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        const open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        links.classList.toggle("is-open", !open);
      });

      $$("a", links).forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          links.classList.remove("is-open");
        });
      });
    }
  }

  /* ── Year ── */
  function setYear() {
    const node = $("[data-year]");
    if (node) node.textContent = String(new Date().getFullYear());
  }

  /* ── Boot ── */
  function init() {
    renderFloatTags();
    renderSkills();
    renderProjects();
    renderExperience();
    renderResearch();
    initTypewriter();
    initParallax();
    initReveals();
    initNav();
    setYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
