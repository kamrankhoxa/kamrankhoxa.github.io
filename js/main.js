/**
 * main.js — Immersive 3D scene (GSAP ScrollTrigger) + section tracks
 * Depends on: window.PORTFOLIO (data.js), gsap, ScrollTrigger
 */
(function () {
  "use strict";

  const data = window.PORTFOLIO || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MAX_TILT = 10; // degrees
  const PERSPECTIVE = 800; // "depth 8" → 800px

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
  function isDesktopScene() {
    return window.innerWidth > 768 && !reduceMotion;
  }

  /* ── Content renderers ── */
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

  function initTypewriter() {
    const target = $("[data-typewriter]");
    if (!target) return;
    const full = data.typewriterText || target.textContent.trim();
    if (reduceMotion || !isDesktopScene()) {
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
    window.setTimeout(tick, 400);
  }

  /* ══════════════════════════════════════════
     3D Scene · GSAP ScrollTrigger (scrub only)
     bg @ 0.3x · mid scale · no scrolljacking
     ══════════════════════════════════════════ */
  function initScene3D() {
    const runway = $(".scene-runway");
    const stage = $("[data-scene-stage]");
    const layerBg = $('[data-layer="bg"]');
    const layerMid = $('[data-layer="mid"]');
    const midStack = $(".mid-stack");
    const layerFg = $('[data-layer="fg"]');

    if (!runway || !stage || typeof window.gsap === "undefined") return;
    if (!isDesktopScene()) return;

    window.gsap.registerPlugin(window.ScrollTrigger);

    // Soft pin without hijacking scroll — scrub interpolates frames
    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65, // buttery native-feel interpolation
        anticipatePin: 1,
      },
    });

    // Background moves at ~0.3x relative travel
    if (layerBg) {
      tl.fromTo(
        layerBg,
        { yPercent: 0 },
        { yPercent: -18, ease: "none" }, // ~0.3 of typical full travel
        0
      );
    }

    // Mid product scales smoothly
    if (midStack) {
      tl.fromTo(
        midStack,
        { scale: 0.92, yPercent: 8, opacity: 0.75 },
        { scale: 1.12, yPercent: -22, opacity: 1, ease: "none" },
        0
      );
    } else if (layerMid) {
      tl.fromTo(
        layerMid,
        { scale: 0.95 },
        { scale: 1.1, ease: "none" },
        0
      );
    }

    // Foreground rises slightly + fades toward end of runway
    if (layerFg) {
      tl.fromTo(
        layerFg,
        { yPercent: 0, opacity: 1 },
        { yPercent: -12, opacity: 0.35, ease: "none" },
        0
      );
    }
  }

  /* ══════════════════════════════════════════
     Track 3D · mouse tilt (max 10°, perspective 800)
     ══════════════════════════════════════════ */
  function initTrack3D() {
    const stage = $("[data-tilt-stage]");
    const card = $("[data-tilt-card]");
    if (!stage || !card || !isDesktopScene()) return;

    let rect = stage.getBoundingClientRect();
    let targetRX = 0;
    let targetRY = 0;
    let curRX = 0;
    let curRY = 0;
    let raf = 0;

    function measure() {
      rect = stage.getBoundingClientRect();
    }

    function onMove(e) {
      const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
      const y = (e.clientY - rect.top) / Math.max(rect.height, 1);
      // Map 0→1 to ±MAX_TILT
      targetRY = clamp((x - 0.5) * 2 * MAX_TILT, -MAX_TILT, MAX_TILT);
      targetRX = clamp((0.5 - y) * 2 * MAX_TILT, -MAX_TILT, MAX_TILT);
    }

    function onLeave() {
      targetRX = 0;
      targetRY = 0;
    }

    function frame() {
      curRX += (targetRX - curRX) * 0.12;
      curRY += (targetRY - curRY) * 0.12;
      card.style.transform =
        "perspective(" +
        PERSPECTIVE +
        "px) rotateX(" +
        curRX.toFixed(2) +
        "deg) rotateY(" +
        curRY.toFixed(2) +
        "deg) translateZ(24px)";
      raf = window.requestAnimationFrame(frame);
    }

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    measure();
    raf = window.requestAnimationFrame(frame);

    // Keep rect fresh while scrolling
    window.addEventListener(
      "scroll",
      function () {
        measure();
      },
      { passive: true }
    );

    return function destroy() {
      window.cancelAnimationFrame(raf);
    };
  }

  /* ══════════════════════════════════════════
     Section scroll-track · top → bottom
     ══════════════════════════════════════════ */
  function sectionProgress(section) {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const start = vh * 0.92;
    const end = vh * 0.18;
    return clamp((start - rect.top) / (start - end), 0, 1);
  }

  function initScrollTracks() {
    const sections = $$("[data-scroll-track]");
    if (!sections.length) return;

    if (reduceMotion) {
      sections.forEach(function (section) {
        section.style.setProperty("--scroll-progress", "1");
        $$(".track-item", section).forEach(function (item) {
          item.style.setProperty("--item-progress", "1");
        });
      });
      return;
    }

    let ticking = false;
    function update() {
      ticking = false;
      sections.forEach(function (section) {
        const p = sectionProgress(section);
        section.style.setProperty("--scroll-progress", p.toFixed(4));
        section.style.setProperty("--track-shift", ((1 - p) * 40).toFixed(2) + "px");
        $$(".track-item", section).forEach(function (item, i) {
          const delay = Math.min(0.55, i * 0.07);
          const ip = clamp((p - delay) / Math.max(0.001, 1 - delay), 0, 1);
          item.style.setProperty("--item-progress", ip.toFixed(4));
        });
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

  function initNav() {
    const nav = $("#site-nav");
    const toggle = $("[data-nav-toggle]");
    const links = $(".nav-links");
    function onScroll() {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
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

  function waitForGsap(cb) {
    if (typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined") {
      cb();
      return;
    }
    let tries = 0;
    const id = window.setInterval(function () {
      tries += 1;
      if (typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined") {
        window.clearInterval(id);
        cb();
      } else if (tries > 40) {
        window.clearInterval(id);
        cb(); // continue without GSAP — fallback still works
      }
    }, 50);
  }

  function init() {
    renderSkills();
    renderProjects();
    renderExperience();
    renderResearch();
    initTypewriter();
    initScrollTracks();
    initNav();
    setYear();
    initTrack3D();
    waitForGsap(initScene3D);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
