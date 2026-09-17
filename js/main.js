/**
 * main.js — Premium white/gold portfolio
 * Content rendering + typewriter + scroll reveals
 */
(function () {
  "use strict";

  var data = window.PORTFOLIO || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  function renderSkills() {
    var grid = $("[data-skills-grid]");
    if (!grid || !data.skills) return;
    data.skills.forEach(function (cat) {
      var card = el("article", "skill-card panel reveal");
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
    var wrap = $("[data-projects]");
    if (!wrap || !data.projects) return;
    data.projects.forEach(function (p) {
      var card = el("article", "project-card panel reveal");
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
    var wrap = $("[data-experience]");
    if (!wrap || !data.experience) return;
    data.experience.forEach(function (job) {
      var card = el("article", "job-card panel reveal");
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
    var wrap = $("[data-research]");
    if (!wrap || !data.research) return;
    data.research.forEach(function (item) {
      var card = el("article", "research-card panel reveal");
      card.innerHTML = "<h3>" + item.title + "</h3><p>" + item.body + "</p>";
      wrap.appendChild(card);
    });
  }

  function initTypewriter() {
    var target = $("[data-typewriter]");
    if (!target) return;
    var full = data.typewriterText || target.textContent.trim();
    if (reduceMotion) {
      target.textContent = full;
      return;
    }
    target.textContent = "";
    var i = 0;
    (function tick() {
      if (i <= full.length) {
        target.textContent = full.slice(0, i++);
        window.setTimeout(tick, 36);
      }
    })();
  }

  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
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

  function initNav() {
    var nav = $("#site-nav");
    var toggle = $("[data-nav-toggle]");
    var links = $(".nav-links");
    function onScroll() {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 20);
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

  function init() {
    renderSkills();
    renderProjects();
    renderExperience();
    renderResearch();
    initTypewriter();
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
