// Placeholders: keep in sync with the comment block at the top of index.html
// Single place to set the contact email. While it equals PLACEHOLDER_EMAIL, the page
// shows "Email details coming soon" and hides all email links and the inquiry form.
const PLACEHOLDER_EMAIL = "hello@example.com";
const CONTACT_EMAIL = "hello@example.com";
const BOOKING_LINK = "#contact";
const BUSINESS_NAME = "Brightside AI";

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const list = document.getElementById("nav-list");
  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    list.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        list.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Apply placeholder values
  document.querySelectorAll("[data-booking]").forEach((a) => a.setAttribute("href", BOOKING_LINK));
  const emailReady = !!CONTACT_EMAIL && CONTACT_EMAIL !== PLACEHOLDER_EMAIL;
  document.querySelectorAll("[data-email]").forEach((a) => {
    if (!emailReady) return;
    a.setAttribute("href", "mailto:" + CONTACT_EMAIL);
    a.textContent = CONTACT_EMAIL;
  });
  document.querySelectorAll("[data-email-block]").forEach((el) => { el.hidden = !emailReady; });
  document.querySelectorAll("[data-email-soon]").forEach((el) => { el.hidden = emailReady; });
  const formEl = document.getElementById("inquiry-form");
  if (formEl) {
    formEl.hidden = !emailReady;
    if (emailReady) formEl.setAttribute("action", "mailto:" + CONTACT_EMAIL);
  }
  const grid = document.getElementById("contact-grid");
  if (grid) grid.classList.toggle("no-form", !emailReady);
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Subtle fade-in on scroll (progressive enhancement; skipped for reduced motion)
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const targets = document.querySelectorAll(
      ".section h2, .section-intro, .section .lead, .card, .pilot, .contact-form, .narrow > p"
    );
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
    document.documentElement.classList.add("reveal-ready");
    targets.forEach((el, i) => {
      // Content already on screen at load stays visible (no flash of hidden text)
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 3) * 70 + "ms";
      io.observe(el);
    });
  }

  // Mailto-based form (no backend)
  const form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!emailReady) return;
      const d = new FormData(form);
      const body = [
        "Name: " + d.get("Name"),
        "Email: " + d.get("Email"),
        "Organization type: " + d.get("Organization type"),
        "",
        d.get("Message"),
      ].join("\n");
      const subject = "Inquiry from " + d.get("Name") + " (" + BUSINESS_NAME + " site)";
      window.location.href =
        "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
});
