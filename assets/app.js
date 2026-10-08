"use strict";

const STORAGE_KEY = "avanade-fde-progress-v1";
const TIERS = { must: "Mandatory", rec: "Recommended", info: "Informational" };
const pageName = document.body.dataset.page;
const emptyProgress = () => ({ courses: [], domains: [], route: "both" });
let storageAvailable = true;
let progress = emptyProgress();
let toastTimer;

try {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (stored && typeof stored === "object") {
    progress.courses = Array.isArray(stored.courses) ? [...new Set(stored.courses.filter(index => Number.isInteger(index) && index >= 0 && index < PATHWAY.courses.length))] : [];
    progress.domains = Array.isArray(stored.domains) ? [...new Set(stored.domains.filter(index => Number.isInteger(index) && index >= 0 && index < PATHWAY.domains.length))] : [];
    progress.route = ["both", "technical", "functional"].includes(stored.route) ? stored.route : "both";
  }
} catch {
  storageAvailable = false;
}

function icon(name) { return `<i data-lucide="${name}" aria-hidden="true"></i>`; }
function refreshIcons() { if (window.lucide) window.lucide.createIcons(); }
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
function notify(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3500);
}
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
    notify("Browser storage is unavailable. Progress lasts for this page only.");
  }
  const count = document.querySelector(".progress-count");
  if (count) count.textContent = `${progress.courses.length}/37`;
}
function updateCompletion(kind, index, checked) {
  progress[kind] = checked ? [...new Set([...progress[kind], index])] : progress[kind].filter(saved => saved !== index);
  saveProgress();
}

const navItems = [
  { page: "pathway", href: "index.html#anchors", label: "The bar" },
  { page: "badge", href: "index.html#credly", label: "The badge" },
  { page: "competencies", href: "competencies.html", label: "Competencies" },
  { page: "hve", href: "hve.html", label: "HVE Core" },
  { page: "catalog", href: "catalog.html", label: "Catalog" }
];
document.getElementById("site-header").innerHTML = `<div class="container header-inner">
  <a class="brand" href="index.html" aria-label="Avanade FDE Journey home"><span class="wordmark">Avanade</span><span class="brand-divider"></span><span class="brand-label">FDE JOURNEY<span>Two routes. One destination.</span></span></a>
  <nav class="main-nav" id="main-nav" aria-label="Main navigation">${navItems.map(item => `<a href="${item.href}" ${pageName === item.page ? 'aria-current="page"' : ""}>${item.label}</a>`).join("")}</nav>
  <button class="progress-trigger" id="open-progress" aria-label="My progress" title="My progress">${icon("circle-check")}<span>My progress</span><span class="progress-count">${progress.courses.length}/37</span></button>
  <button class="icon-button theme-toggle" id="theme-toggle" role="switch" aria-checked="false" aria-label="Dark mode" title="Switch to navy and orange mode">${icon("moon")}</button>
  <button class="menu-toggle" id="menu-toggle" aria-label="Open navigation" aria-controls="main-nav" aria-expanded="false">${icon("menu")}</button>
</div>`;
document.getElementById("site-footer").innerHTML = `<div class="container">
  <div class="footer-main"><div class="footer-brand"><a class="wordmark" href="index.html">Avanade</a><p><strong>The FDE Journey</strong> &mdash; a thinking tool, not an official curriculum.<br>Built from the FDE training review, LevelUp Frontier, HVE Core &amp; the Redmond hackathon.</p></div><nav class="footer-links" aria-label="Footer navigation">${navItems.map(item => `<a href="${item.href}">${item.label}</a>`).join("")}<a href="${PATHWAY.source}" target="_blank" rel="noopener noreferrer">Original FDE Journey ${icon("arrow-up-right")}</a></nav></div>
  <div class="footer-bottom"><span>FTE badge &middot; HVE Core &middot; Avanade FDE Certified</span><span>Source captured ${PATHWAY.captured}</span></div>
</div>`;

const themeToggle = document.getElementById("theme-toggle");
function updateThemeToggle() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeToggle.setAttribute("aria-checked", String(dark));
  themeToggle.title = dark ? "Switch to orange light mode" : "Switch to navy and orange mode";
  themeToggle.innerHTML = icon(dark ? "sun" : "moon");
  refreshIcons();
}
themeToggle.addEventListener("click", () => window.FDETheme.set(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
window.addEventListener("themechange", updateThemeToggle);
updateThemeToggle();

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.innerHTML = icon("menu");
  refreshIcons();
}
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.innerHTML = icon(isOpen ? "x" : "menu");
  refreshIcons();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    const dialog = document.getElementById("progress-dialog");
    if (dialog.open) dialog.close();
    closeMenu();
  }
});
document.getElementById("site-header").addEventListener("focusin", () => document.getElementById("site-header").classList.remove("header-hidden"));
document.addEventListener("click", event => { if (!event.composedPath().includes(document.getElementById("site-header"))) closeMenu(); });
let previousScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  document.getElementById("site-header").classList.toggle("header-hidden", currentScroll > 400 && currentScroll > previousScroll && !mainNav.classList.contains("open") && !document.activeElement.closest(".site-header"));
  previousScroll = currentScroll;
}, { passive: true });

const domainPreview = document.getElementById("domain-preview");
if (domainPreview) {
  domainPreview.innerHTML = PATHWAY.domains.map((domain, index) => `<a class="domain-tile reveal" href="competencies.html#domain-${index + 1}"><div class="domain-tile-top"><span>0${index + 1} / PRIORITY ${domain.priority}</span>${icon(domain.icon)}</div><h3>${domain.title}</h3><div class="domain-tile-bottom"><span>${domain.sub}</span>${icon("arrow-up-right")}</div></a>`).join("");
}

const domainList = document.getElementById("domain-list");
if (domainList) {
  const requestedRoute = new URLSearchParams(location.search).get("route");
  let activeRoute = ["both", "technical", "functional"].includes(requestedRoute) ? requestedRoute : progress.route;
  const renderDomains = () => {
    domainList.innerHTML = PATHWAY.domains.map((domain, index) => `<details class="domain-detail" id="domain-${index + 1}" ${location.hash === `#domain-${index + 1}` || (!location.hash && index === 0) ? "open" : ""}>
      <summary><span class="domain-number">0${index + 1}</span>${icon(domain.icon).replace('<i ', '<i class="domain-summary-icon" ')}<div class="domain-summary-text"><h2>${domain.title}</h2><p>${domain.sub}</p></div><span class="priority">${domain.priority}</span>${icon("chevron-down").replace('<i ', '<i class="detail-chevron" ')}</summary>
      <div class="domain-body"><div class="domain-destination"><div><h3>The destination &mdash; same for both routes.</h3></div><p>${domain.destination}</p></div>
      <div class="domain-route-grid" ${activeRoute !== "both" ? 'style="grid-template-columns:1fr"' : ""}>
      ${["technical", "functional"].filter(route => activeRoute === "both" || activeRoute === route).map(route => `<article class="route-lane ${route}-lane"><p class="eyebrow">${route.toUpperCase()} ROUTE</p><p><strong>Starts:</strong> ${domain[route].start}</p><p>${domain[route].build}</p></article>`).join("")}</div>
      <div class="proof-block">${icon("badge-check")}<div><h3>How you prove it &mdash; the test in the room</h3><p>${domain.proof}</p></div></div><div class="source-chips" aria-label="Learning resources">${domain.sources.map(source => `<span>${source}</span>`).join("")}</div>
      <label class="evidence-check"><input type="checkbox" data-domain="${index}" ${progress.domains.includes(index) ? "checked" : ""}> I've demonstrated this competency</label></div>
    </details>`).join("");
    document.querySelectorAll("[data-route]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.route === activeRoute)));
    document.getElementById("route-caption").textContent = activeRoute === "both" ? "Two starting points. The same standard of excellence." : `${activeRoute === "technical" ? "Technical" : "Functional"} starting point. Shared destination and proof.`;
    refreshIcons();
  };
  renderDomains();
  if (requestedRoute) { progress.route = activeRoute; saveProgress(); }
  document.querySelectorAll("[data-route]").forEach(button => button.addEventListener("click", () => {
    activeRoute = button.dataset.route;
    progress.route = activeRoute;
    saveProgress();
    const openIds = [...domainList.querySelectorAll("details[open]")].map(detail => detail.id);
    renderDomains();
    domainList.querySelectorAll("details").forEach(detail => { detail.open = openIds.includes(detail.id); });
  }));
  domainList.addEventListener("change", event => {
    if (event.target.matches("[data-domain]")) {
      updateCompletion("domains", Number(event.target.dataset.domain), event.target.checked);
      notify(event.target.checked ? "Competency evidence recorded." : "Competency evidence cleared.");
    }
  });
  window.addEventListener("hashchange", () => {
    const detail = document.getElementById(location.hash.slice(1));
    if (detail?.matches("details")) detail.open = true;
  });
  if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
}

const catalogResults = document.getElementById("catalog-results");
if (catalogResults) {
  let tier = "all";
  const search = document.getElementById("course-search");
  const sourceFilter = document.getElementById("source-filter");
  const completionFilter = document.getElementById("completion-filter");
  sourceFilter.innerHTML += [...new Set(PATHWAY.courses.map(course => course.source))].sort().map(source => `<option value="${source}">${source}</option>`).join("");
  function renderCourses() {
    const query = search.value.trim().toLowerCase();
    const matches = PATHWAY.courses.map((course, index) => ({ ...course, index })).filter(course => (tier === "all" || course.tier === tier) && (!sourceFilter.value || course.source === sourceFilter.value) && (!completionFilter.checked || !progress.courses.includes(course.index)) && `${course.title} ${course.source} ${course.meta}`.toLowerCase().includes(query));
    document.getElementById("result-count").textContent = `${matches.length} of 37 learning resources`;
    catalogResults.innerHTML = matches.length ? matches.map(course => `<article class="course-card ${progress.courses.includes(course.index) ? "completed" : ""}"><div class="course-card-header"><span class="tier ${course.tier}">${TIERS[course.tier]}</span><span class="course-source">${course.source}</span></div><h2>${course.title}</h2><p class="course-meta">${course.meta}</p><div class="course-card-footer"><label><input type="checkbox" data-course="${course.index}" ${progress.courses.includes(course.index) ? "checked" : ""}>${progress.courses.includes(course.index) ? "Completed" : "Mark complete"}</label>${course.url ? `<a class="icon-button" href="${course.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${course.title}" title="Open learning resource">${icon("arrow-up-right")}</a>` : `<button class="icon-button" data-course-info="${course.index}" aria-label="Details for ${course.title}" title="View resource details">${icon("plus")}</button>`}</div></article>`).join("") : `<div class="empty-state">${icon("search-x")}<h2>No matching resources.</h2><p>Try a different search or broaden your filters.</p><button class="button dark" id="clear-filters">Clear filters ${icon("rotate-ccw")}</button></div>`;
    refreshIcons();
  }
  document.querySelectorAll("[data-tier]").forEach(button => button.addEventListener("click", () => {
    tier = button.dataset.tier;
    document.querySelectorAll("[data-tier]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    renderCourses();
  }));
  search.addEventListener("input", renderCourses);
  sourceFilter.addEventListener("change", renderCourses);
  completionFilter.addEventListener("change", renderCourses);
  catalogResults.addEventListener("change", event => {
    if (event.target.matches("[data-course]")) {
      updateCompletion("courses", Number(event.target.dataset.course), event.target.checked);
      const checked = event.target.checked;
      const card = event.target.closest(".course-card");
      card.classList.toggle("completed", checked);
      event.target.nextSibling.textContent = checked ? "Completed" : "Mark complete";
      notify(checked ? "Learning progress saved." : "Resource marked incomplete.");
      if (completionFilter.checked) renderCourses();
    }
  });
  catalogResults.addEventListener("click", event => {
    if (event.target.closest("#clear-filters")) {
      tier = "all"; search.value = ""; sourceFilter.value = ""; completionFilter.checked = false;
      document.querySelectorAll("[data-tier]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.tier === "all")));
      renderCourses(); search.focus();
    }
    const infoButton = event.target.closest("[data-course-info]");
    if (infoButton) {
      const course = PATHWAY.courses[Number(infoButton.dataset.courseInfo)];
      const dialog = document.getElementById("progress-dialog");
      dialog.innerHTML = `<div class="dialog-heading"><h2 id="progress-title">Resource details</h2><button class="icon-button close-dialog" aria-label="Close resource details">${icon("x")}</button></div><span class="tier ${course.tier}">${TIERS[course.tier]}</span><h3 style="font-size:21px;margin-top:20px">${course.title}</h3><p class="dialog-subtitle" style="margin-top:12px">${course.source} / ${course.meta}</p><p class="storage-note">The original catalog does not supply a direct URL for this resource. Use its exact title with your learning provider. No enrollment or certification is issued by this site.</p><a class="button dark" style="margin-top:24px" href="${PATHWAY.source.replace("#anchors", "#catalog")}" target="_blank" rel="noopener noreferrer">View the original catalog ${icon("arrow-up-right")}</a>`;
      refreshIcons(); dialog.showModal();
    }
  });
  renderCourses();
}

const progressDialog = document.getElementById("progress-dialog");
function renderProgressDialog() {
  const completedCourses = progress.courses.length;
  const completedDomains = progress.domains.length;
  progressDialog.innerHTML = `<div class="dialog-heading"><h2 id="progress-title">Your pathway. In motion.</h2><button class="icon-button close-dialog" aria-label="Close progress">${icon("x")}</button></div><p class="dialog-subtitle">Personal learning progress, not a certification assessment.</p><div class="progress-summary"><div><strong>${completedCourses}<small style="font-size:16px;color:var(--muted)"> / 37</small></strong><span>Resources completed</span><div class="progress-bar"><span style="transform:scaleX(${completedCourses / 37})"></span></div></div><div><strong>${completedDomains}<small style="font-size:16px;color:var(--muted)"> / 6</small></strong><span>Competencies demonstrated</span><div class="progress-bar"><span style="transform:scaleX(${completedDomains / 6})"></span></div></div></div>${completedCourses || completedDomains ? `<ul class="saved-list">${progress.domains.map(index => `<li>${icon("badge-check")}${PATHWAY.domains[index].title}</li>`).join("")}${progress.courses.map(index => `<li>${icon("check")}${PATHWAY.courses[index].title}</li>`).join("")}</ul>` : `<p class="dialog-subtitle">Your next chapter starts with your first resource.</p>`}<div class="dialog-actions"><a class="button dark" href="catalog.html">Keep learning ${icon("arrow-right")}</a><button class="button outline" id="export-progress">${icon("download")}Export progress</button><button class="button outline" id="reset-progress">${icon("rotate-ccw")}Reset</button></div><div class="reset-confirm" id="reset-confirm" hidden><p>Clear all saved course and competency progress on this browser?</p><button class="button dark" id="confirm-reset">Clear progress</button><button class="button outline" id="cancel-reset">Cancel</button></div><p class="storage-note">${storageAvailable ? "Saved on this browser only. No account, server, or personal data collection." : "Browser storage is unavailable. Progress is temporary on this page."} Completing this checklist does not award a badge.</p>`;
  refreshIcons();
}
document.getElementById("open-progress").addEventListener("click", () => { renderProgressDialog(); progressDialog.showModal(); });
progressDialog.addEventListener("click", event => {
  if (event.target.closest(".close-dialog")) progressDialog.close();
  if (event.target.id === "reset-progress") document.getElementById("reset-confirm").hidden = false;
  if (event.target.id === "cancel-reset") document.getElementById("reset-confirm").hidden = true;
  if (event.target.id === "confirm-reset") {
    progress = emptyProgress(); saveProgress();
    document.querySelectorAll("[data-domain], [data-course]").forEach(input => {
      input.checked = false;
      const card = input.closest(".course-card");
      if (card) { card.classList.remove("completed"); input.nextSibling.textContent = "Mark complete"; }
    });
    document.getElementById("completion-filter")?.dispatchEvent(new Event("change"));
    renderProgressDialog(); notify("Your learning progress has been cleared.");
  }
  if (event.target.closest("#export-progress")) {
    const report = { journey: "The FDE Journey", exported: new Date().toISOString(), route: progress.route, completedCourses: progress.courses.map(index => PATHWAY.courses[index].title), demonstratedCompetencies: progress.domains.map(index => PATHWAY.domains[index].title), note: "Personal progress only. Not an official certification." };
    const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }));
    const download = document.createElement("a"); download.href = url; download.download = "avanade-fde-progress.json"; download.click(); URL.revokeObjectURL(url);
    notify("Progress report exported.");
  }
});

refreshIcons();
if (window.gsap) {
  const motion = gsap.matchMedia();
  motion.add("(prefers-reduced-motion: no-preference)", context => {
    const animatedElements = document.querySelectorAll(".hero-content > :not(.hero-bottom), .page-intro h1, .intro-row p, .intro-stat");
    const entry = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (animatedElements.length) entry.from(animatedElements, { y: 30, opacity: 0, duration: .95, stagger: .1, clearProps: "all" });
    const heroImage = document.querySelector(".hero-image");
    if (heroImage) entry.from(heroImage, { scale: 1.045, duration: 1.5, clearProps: "all" }, 0);

    let observer;
    context.add("reveal", elements => {
      gsap.fromTo(elements, { y: 26, opacity: .15 }, { y: 0, opacity: 1, duration: .8, stagger: .07, ease: "power3.out", clearProps: "all" });
    });
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting);
        if (visible.length) context.reveal(visible.map(entry => entry.target));
        visible.forEach(entry => observer.unobserve(entry.target));
      }, { threshold: .12 });
      document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
    }

    const readingProgress = document.createElement("div");
    readingProgress.className = "reading-progress";
    readingProgress.setAttribute("aria-hidden", "true");
    document.body.appendChild(readingProgress);
    const setProgress = gsap.quickSetter(readingProgress, "scaleX");
    let frame = 0;
    function updateReadingProgress() {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0);
    }
    function requestProgressUpdate() { if (!frame) frame = requestAnimationFrame(updateReadingProgress); }
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(requestProgressUpdate) : null;
    resizeObserver?.observe(document.querySelector("main"));
    updateReadingProgress();
    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      cancelAnimationFrame(frame);
      readingProgress.remove();
    };
  });
  motion.add("(hover: hover) and (pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
    const cleanups = [];
    document.querySelectorAll(".route-card, .badge-display").forEach(card => {
      const reflection = document.createElement("span");
      reflection.className = "glass-reflection";
      reflection.setAttribute("aria-hidden", "true");
      card.appendChild(reflection);
      const shiftReflection = gsap.quickTo(reflection, "xPercent", { duration: .65, ease: "power3.out" });
      function move(event) {
        const box = card.getBoundingClientRect();
        const horizontal = (event.clientX - box.left) / box.width - .5;
        shiftReflection(horizontal * 60);
      }
      function reset() { shiftReflection(0); }
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", reset);
      cleanups.push(() => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", reset);
        shiftReflection.tween.kill();
        reflection.remove();
      });
    });
    return () => cleanups.forEach(cleanup => cleanup());
  });
}