/**
 * main.js — Parallax + tilt + content
 * Layers: bg 0.2x · mid 0.5x · fg 1.0x
 * Mouse tilt: perspective(1000px), lerp 0.1
 * Scroll: GSAP ScrollTrigger scrub when available, else native rAF
 * Static only on ≤768px / reduced-motion
 */
(function () {
  "use strict";

  var data = window.PORTFOLIO || {};
  var LERP = 0.1;
  var MAX_TILT = 12;
  var PERSPECTIVE = 1000;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  function isStaticMode() {
    return document.documentElement.classList.contains("is-static");
  }

  /* ── Renderers ── */
  function renderSkills() {
    var grid = $("[data-skills-grid]");
    if (!grid || !data.skills) return;
    data.skills.forEach(function (cat) {
      var card = el("article", "skill-card glass");
      card.setAttribute("data-scroll-anim", "card");
      card.innerHTML =
        '<div class="tilt-inner" data-tilt><h3>' +
        cat.title +
        "</h3><ul>" +
        cat.items
          .map(function (i) {
            return "<li>" + i + "</li>";
          })
          .join("") +
        "</ul></div>";
      grid.appendChild(card);
    });
  }

  function renderProjects() {
    var wrap = $("[data-projects]");
    if (!wrap || !data.projects) return;
    data.projects.forEach(function (p) {
      var card = el("article", "project-card glass");
      card.setAttribute("data-scroll-anim", "card");
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
        '<div class="tilt-inner" data-tilt><p class="stack">' +
        p.stack +
        "</p><h3>" +
        p.name +
        "</h3><p>" +
        p.desc +
        '</p><div class="project-actions">' +
        actions +
        "</div></div>";
      wrap.appendChild(card);
    });
  }

  function renderExperience() {
    var wrap = $("[data-experience]");
    if (!wrap || !data.experience) return;
    data.experience.forEach(function (job) {
      var card = el("article", "job-card glass");
      card.setAttribute("data-scroll-anim", "card");
      card.innerHTML =
        '<div class="tilt-inner" data-tilt><div class="job-head"><span class="job-title">' +
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
        "</ul></div>";
      wrap.appendChild(card);
    });
  }

  function renderResearch() {
    var wrap = $("[data-research]");
    if (!wrap || !data.research) return;
    data.research.forEach(function (item) {
      var card = el("article", "research-card glass");
      card.setAttribute("data-scroll-anim", "card");
      card.innerHTML =
        '<div class="tilt-inner" data-tilt><h3>' +
        item.title +
        "</h3><p>" +
        item.body +
        "</p></div>";
      wrap.appendChild(card);
    });
  }

  function initTypewriter() {
    var target = $("[data-typewriter]");
    if (!target) return;
    var full = data.typewriterText || target.textContent.trim();
    if (isStaticMode()) {
      target.textContent = full;
      return;
    }
    target.textContent = "";
    var i = 0;
    (function tick() {
      if (i <= full.length) {
        target.textContent = full.slice(0, i++);
        window.setTimeout(tick, 34);
      }
    })();
  }

  /* ── Mouse tilt · lerp 0.1 · perspective 1000 ── */
  function initMouseTilt() {
    if (isStaticMode()) return;
    var nodes = $$("[data-tilt]");
    if (!nodes.length) return;

    var states = nodes.map(function (node) {
      return { el: node, tx: 0, ty: 0, cx: 0, cy: 0 };
    });
    var running = true;

    function onMove(e) {
      states.forEach(function (s) {
        var rect = s.el.getBoundingClientRect();
        var near =
          e.clientX >= rect.left - 100 &&
          e.clientX <= rect.right + 100 &&
          e.clientY >= rect.top - 100 &&
          e.clientY <= rect.bottom + 100;
        if (!near) {
          s.tx = 0;
          s.ty = 0;
          return;
        }
        var lx = (e.clientX - rect.left) / Math.max(rect.width, 1);
        var ly = (e.clientY - rect.top) / Math.max(rect.height, 1);
        s.tx = clamp((0.5 - ly) * 2 * MAX_TILT, -MAX_TILT, MAX_TILT);
        s.ty = clamp((lx - 0.5) * 2 * MAX_TILT, -MAX_TILT, MAX_TILT);
      });
    }

    function onLeave() {
      states.forEach(function (s) {
        s.tx = 0;
        s.ty = 0;
      });
    }

    function frame() {
      if (!running) return;
      states.forEach(function (s) {
        s.cx = lerp(s.cx, s.tx, LERP);
        s.cy = lerp(s.cy, s.ty, LERP);
        s.el.style.transform =
          "perspective(" +
          PERSPECTIVE +
          "px) rotateX(" +
          s.cx.toFixed(3) +
          "deg) rotateY(" +
          s.cy.toFixed(3) +
          "deg) translateZ(8px)";
      });
      window.requestAnimationFrame(frame);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    window.requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) window.requestAnimationFrame(frame);
    });
  }

  /* ── Native layer parallax (always works) ── */
  function initNativeParallax() {
    if (isStaticMode()) return;

    var runway = $("[data-parallax-runway]");
    var bg = $(".layer-bg");
    var mid = $(".layer-mid");
    var midAsset = $(".mid-asset");
    var fg = $(".layer-fg");
    var heroCard = $(".hero-card");
    if (!runway) return;

    var cur = { bg: 0, mid: 0, fg: 0, scale: 1, opacity: 1 };
    var tgt = { bg: 0, mid: 0, fg: 0, scale: 1, opacity: 1 };

    function progress() {
      var rect = runway.getBoundingClientRect();
      var total = Math.max(1, runway.offsetHeight - window.innerHeight);
      return clamp(-rect.top / total, 0, 1);
    }

    function measure() {
      var p = progress();
      // Velocities 0.2 / 0.5 / 1.0 as travel fractions of 160px base
      var travel = 160;
      tgt.bg = -p * travel * 0.2;
      tgt.mid = -p * travel * 0.5;
      tgt.fg = -p * travel * 1.0;
      tgt.scale = 1 + p * 0.18;
      tgt.opacity = 1 - p * 0.55;
    }

    function paint() {
      cur.bg = lerp(cur.bg, tgt.bg, 0.12);
      cur.mid = lerp(cur.mid, tgt.mid, 0.12);
      cur.fg = lerp(cur.fg, tgt.fg, 0.12);
      cur.scale = lerp(cur.scale, tgt.scale, 0.12);
      cur.opacity = lerp(cur.opacity, tgt.opacity, 0.12);

      if (bg) bg.style.transform = "translate3d(0," + cur.bg.toFixed(2) + "px,0)";
      if (mid) mid.style.transform = "translate3d(0," + cur.mid.toFixed(2) + "px,0)";
      if (midAsset) {
        midAsset.style.transform =
          "translate3d(8%,4%,0) scale(" + cur.scale.toFixed(3) + ")";
        midAsset.style.opacity = String(0.45 + cur.opacity * 0.4);
      }
      if (fg) fg.style.transform = "translate3d(0," + cur.fg.toFixed(2) + "px,0)";
      if (heroCard) {
        heroCard.style.opacity = String(Math.max(0.25, cur.opacity));
      }
      // floats keep CSS chip-float; they ride on layer-fg
    }

    function frame() {
      measure();
      paint();
      window.requestAnimationFrame(frame);
    }

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    measure();
    window.requestAnimationFrame(frame);
  }

  /* ── Section reveals (IntersectionObserver — lightweight) ── */
  function initSectionReveals() {
    var items = $$("[data-scroll-anim]");
    if (!items.length) return;

    if (isStaticMode() || !("IntersectionObserver" in window)) {
      items.forEach(function (n) {
        n.classList.add("is-in");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach(function (n) {
      io.observe(n);
    });
  }

  /* ── Optional GSAP enhancement for sections ── */
  function initGsapSections() {
    if (isStaticMode()) return;
    if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
      return;
    }
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    $$("[data-stack-section]").forEach(function (section) {
      var bg = section.querySelector(".section-bg");
      var fg = section.querySelector(".section-fg");
      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -6 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
      if (fg) {
        gsap.fromTo(
          fg,
          { yPercent: 8 },
          {
            yPercent: -20,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    });
  }

  function initNav() {
    var nav = $("#site-nav");
    var toggle = $("[data-nav-toggle]");
    var links = $(".nav-links");
    function onScroll() {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
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
    var node = $("[data-year]");
    if (node) node.textContent = String(new Date().getFullYear());
  }

  function waitForGsap(cb) {
    if (typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined") {
      cb();
      return;
    }
    var tries = 0;
    var id = window.setInterval(function () {
      tries += 1;
      if (typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined") {
        window.clearInterval(id);
        cb();
      } else if (tries > 40) {
        window.clearInterval(id);
      }
    }, 40);
  }

  function init() {
    renderSkills();
    renderProjects();
    renderExperience();
    renderResearch();
    initTypewriter();
    initNav();
    setYear();
    initSectionReveals();

    if (!isStaticMode()) {
      initMouseTilt();
      initNativeParallax();
      waitForGsap(initGsapSections);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
