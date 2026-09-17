/**
 * main.js — Scroll engine: hero parallax + section track animations
 * Depends on window.PORTFOLIO from data.js
 */
(function () {
  "use strict";

  const data = window.PORTFOLIO || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  function isMobile() {
    return window.innerWidth <= 768;
  }

  /* ══════════════════════════════════════
     Content renderers
     ══════════════════════════════════════ */
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
      const card = el("article", "skill-card glass track-item");
      card.innerHTML =
        "<h3>" +
        cat.title +
        "</h3><ul>" +
        cat.items
          .map(function (i) {
            return "<li>" + i + "</li>";
          })
          .join("") +
        "</ul>";
      grid.appendChild(card);
    });
  }

  function renderProjects() {
    const wrap = $("[data-projects]");
    if (!wrap || !data.projects) return;
    data.projects.forEach(function (p) {
      const card = el("article", "project-card glass track-item");
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
      const card = el("article", "job-card glass track-item");
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
      const card = el("article", "research-card glass track-item");
      card.innerHTML = "<h3>" + item.title + "</h3><p>" + item.body + "</p>";
      wrap.appendChild(card);
    });
  }

  /* ══════════════════════════════════════
     Typewriter
     ══════════════════════════════════════ */
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
    function tick() {
      if (i <= full.length) {
        target.textContent = full.slice(0, i);
        i += 1;
        window.setTimeout(tick, 36);
      }
    }
    window.setTimeout(tick, 350);
  }

  /* ══════════════════════════════════════
     Hero parallax — scrollY driven, no sticky dependency
     bg 0.15x · mid 0.35x · fg 1.0x
     ══════════════════════════════════════ */
  function initParallax() {
    const hero = $(".hero");
    const runway = $(".hero-runway");
    const layers = $$(".parallax-layer[data-speed]");
    const floatTags = $$(".float-tag");
    if (!hero || !layers.length) return;

    let current = { bg: 0, mid: 0, fg: 0 };
    let target = { bg: 0, mid: 0, fg: 0 };
    const ease = 0.14;

    function measure() {
      if (reduceMotion || isMobile()) {
        target.bg = target.mid = target.fg = 0;
        return;
      }

      // Use raw page scroll while hero is on screen
      const y = window.scrollY || window.pageYOffset || 0;
      const heroBottom = runway
        ? runway.offsetTop + runway.offsetHeight
        : hero.offsetTop + hero.offsetHeight;

      // Only drive while user is still in/near hero zone
      const activeY = clamp(y, 0, Math.max(heroBottom, window.innerHeight * 2));

      target.bg = activeY * 0.15;
      target.mid = activeY * 0.35;
      target.fg = activeY * 1.0;
    }

    function paint() {
      current.bg = lerp(current.bg, target.bg, ease);
      current.mid = lerp(current.mid, target.mid, ease);
      current.fg = lerp(current.fg, target.fg, ease);

      layers.forEach(function (layer) {
        const speed = parseFloat(layer.dataset.speed || "1");
        var y = 0;
        if (speed <= 0.2) y = current.bg;
        else if (speed <= 0.5) y = current.mid;
        else y = current.fg;

        // Move opposite to scroll = classic depth (layer lags / rises)
        layer.style.transform = "translate3d(0, " + (-y).toFixed(2) + "px, 0)";
      });

      floatTags.forEach(function (tag) {
        const depth = parseFloat(tag.dataset.depth || "1");
        const extra = current.mid * (depth - 1) * 0.45;
        tag.style.transform = "translate3d(0, " + (-extra).toFixed(2) + "px, 0)";
      });
    }

    function frame() {
      measure();
      paint();
      window.requestAnimationFrame(frame);
    }

    window.addEventListener(
      "scroll",
      function () {
        measure();
      },
      { passive: true }
    );
    window.addEventListener("resize", measure, { passive: true });
    measure();
    window.requestAnimationFrame(frame);
  }

  /* ══════════════════════════════════════
     Section scroll-track — top → bottom
     Progress 0→1 as each section crosses the viewport
     ══════════════════════════════════════ */
  function sectionProgress(section) {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // Start when top hits bottom of viewport; end when top hits ~20% from top
    const start = vh * 0.92;
    const end = vh * 0.18;
    const raw = (start - rect.top) / (start - end);
    return clamp(raw, 0, 1);
  }

  function initScrollTracks() {
    const sections = $$("[data-scroll-track]");
    if (!sections.length) return;

    // Stagger children
    sections.forEach(function (section) {
      const items = $$(".track-item", section);
      items.forEach(function (item, i) {
        item.style.setProperty("--i", String(i));
      });
    });

    if (reduceMotion) {
      sections.forEach(function (section) {
        section.style.setProperty("--scroll-progress", "1");
        section.classList.add("is-inview");
        $$(".track-item", section).forEach(function (item) {
          item.style.setProperty("--item-progress", "1");
        });
      });
      return;
    }

    let ticking = false;

    function update() {
      ticking = false;
      const vh = window.innerHeight || 1;

      sections.forEach(function (section) {
        const p = sectionProgress(section);
        section.style.setProperty("--scroll-progress", p.toFixed(4));
        section.classList.toggle("is-inview", p > 0.02);

        // Children animate top→bottom with staggered progress
        const items = $$(".track-item", section);
        items.forEach(function (item, i) {
          const delay = Math.min(0.55, i * 0.07);
          const ip = clamp((p - delay) / Math.max(0.001, 1 - delay), 0, 1);
          item.style.setProperty("--item-progress", ip.toFixed(4));
        });

        // Optional: parallax nudge on section background accent
        const shift = (1 - p) * 40;
        section.style.setProperty("--track-shift", shift.toFixed(2) + "px");
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ══════════════════════════════════════
     Nav
     ══════════════════════════════════════ */
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

  function setYear() {
    const node = $("[data-year]");
    if (node) node.textContent = String(new Date().getFullYear());
  }

  function init() {
    renderFloatTags();
    renderSkills();
    renderProjects();
    renderExperience();
    renderResearch();
    initTypewriter();
    initParallax();
    initScrollTracks();
    initNav();
    setYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
