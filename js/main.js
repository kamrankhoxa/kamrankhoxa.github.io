/**
 * main.js — 3D parallax engine
 * Specs:
 *  - Layers: bg 0.2x · mid 0.5x · fg 1.0x
 *  - Mouse tilt: perspective(1000px) rotateX/Y, lerp 0.1
 *  - GSAP ScrollTrigger scrub: true (bidirectional)
 *  - Mobile/touch: no listeners, static layout (html.is-static)
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

  /* ── Content renderers ── */
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
        target.textContent = full.slice(0, i);
        i += 1;
        window.setTimeout(tick, 34);
      }
    })();
  }

  /* ══════════════════════════════════════════
     Mouse-tracking 3D tilt
     perspective(1000px) · lerp 0.1 · will-change
     ══════════════════════════════════════════ */
  function initMouseTilt() {
    if (isStaticMode()) return;

    var nodes = $$("[data-tilt]");
    if (!nodes.length) return;

    var states = nodes.map(function (node) {
      return {
        el: node,
        tx: 0,
        ty: 0,
        cx: 0,
        cy: 0,
      };
    });

    var mx = 0.5;
    var my = 0.5;
    var running = true;

    function onMove(e) {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
      states.forEach(function (s) {
        var rect = s.el.getBoundingClientRect();
        var lx = (e.clientX - rect.left) / Math.max(rect.width, 1);
        var ly = (e.clientY - rect.top) / Math.max(rect.height, 1);
        // Prefer local card vector when cursor is near the element
        var inView =
          e.clientX >= rect.left - 80 &&
          e.clientX <= rect.right + 80 &&
          e.clientY >= rect.top - 80 &&
          e.clientY <= rect.bottom + 80;
        if (inView) {
          s.tx = clamp((0.5 - ly) * 2 * MAX_TILT, -MAX_TILT, MAX_TILT);
          s.ty = clamp((lx - 0.5) * 2 * MAX_TILT, -MAX_TILT, MAX_TILT);
        } else {
          s.tx = clamp((0.5 - my) * 8, -6, 6);
          s.ty = clamp((mx - 0.5) * 8, -6, 6);
        }
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
          "deg)";
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

  /* ══════════════════════════════════════════
     GSAP ScrollTrigger · scrub: true
     Layer velocities 0.2 / 0.5 / 1.0
     Spatial: scale · rotate · opacity
     ══════════════════════════════════════════ */
  function initScrollParallax() {
    if (isStaticMode()) return;
    if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
      return;
    }

    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    var runway = $("[data-parallax-runway]");
    var layerBg = $(".layer-bg");
    var layerMid = $(".layer-mid");
    var layerFg = $(".layer-fg");
    var midAsset = $(".mid-asset");
    var heroCard = $(".hero-card");

    if (runway) {
      // Master scrubbed timeline — plays forward & backward with scroll
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // exact scrub binding
        },
      });

      // Background @ 0.2x relative travel
      if (layerBg) {
        tl.fromTo(
          layerBg,
          { yPercent: 0 },
          { yPercent: -20, ease: "none" }, // 0.2 of 100
          0
        );
      }

      // Midground @ 0.5x + scale / rotate
      if (layerMid) {
        tl.fromTo(
          layerMid,
          { yPercent: 0 },
          { yPercent: -50, ease: "none" },
          0
        );
      }
      if (midAsset) {
        tl.fromTo(
          midAsset,
          { scale: 0.88, rotateY: -8, opacity: 0.35 },
          { scale: 1.18, rotateY: 12, opacity: 0.7, ease: "none" },
          0
        );
      }

      // Foreground @ 1.0x
      if (layerFg) {
        tl.fromTo(
          layerFg,
          { yPercent: 0 },
          { yPercent: -100, ease: "none" },
          0
        );
      }
      if (heroCard) {
        tl.fromTo(
          heroCard,
          { scale: 1, rotateX: 0, opacity: 1 },
          { scale: 0.92, rotateX: 8, opacity: 0.25, ease: "none" },
          0
        );
      }

      // Floating fg chips
      $$(".fg-float").forEach(function (chip, i) {
        tl.fromTo(
          chip,
          { y: 0, rotateZ: 0, opacity: 0.9 },
          {
            y: -120 - i * 40,
            rotateZ: (i % 2 === 0 ? 1 : -1) * 18,
            opacity: 0.15,
            ease: "none",
          },
          0
        );
      });
    }

    // Section layer velocities + card reveals (scrubbed)
    $$("[data-stack-section]").forEach(function (section) {
      var bg = section.querySelector(".section-bg");
      var mid = section.querySelector(".section-mid");
      var fg = section.querySelector(".section-fg");
      var cards = section.querySelectorAll('[data-scroll-anim="card"], [data-scroll-anim="fade-up"]');

      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (mid) {
        gsap.fromTo(
          mid,
          { y: 40 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      if (fg) {
        gsap.fromTo(
          fg,
          { yPercent: 10 },
          {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      cards.forEach(function (card) {
        gsap.fromTo(
          card,
          { opacity: 0.15, y: 48, rotateX: 10, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });
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
      } else if (tries > 50) {
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

    // Enhanced desktop only — strip tracking on static/mobile
    if (!isStaticMode()) {
      initMouseTilt();
      waitForGsap(initScrollParallax);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
