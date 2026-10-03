// Web3Forms public access key for the contact form (public by design; the destination
// inbox is configured in the Web3Forms dashboard). Change it here only. See README.md.
const WEB3FORMS_ACCESS_KEY = "ae154638-5126-4d17-b209-c0dcd65b213b";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
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

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // About Me photo: hide the slot cleanly if the image is missing or fails to load
  const aboutMe = document.querySelector(".about-me");
  const photo = aboutMe && aboutMe.querySelector("img");
  if (photo && photo.complete && photo.naturalWidth === 0) aboutMe.classList.add("no-photo");

  // Subtle fade-in on scroll (progressive enhancement; skipped for reduced motion)
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const targets = document.querySelectorAll(
      ".section h2, .section-intro, .card, .pilot, .contact-form, .narrow > p, .about-me-photo, .about-me-text p"
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

  // Contact form: submit to Web3Forms via fetch
  const form = document.getElementById("inquiry-form");
  if (form) {
    const keyInput = form.querySelector('input[name="access_key"]');
    if (keyInput) keyInput.value = WEB3FORMS_ACCESS_KEY;
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById("form-status");
    const idleLabel = button ? button.textContent : "";
    const setStatus = (kind, text) => {
      if (!status) return;
      status.className = "form-status" + (kind ? " is-" + kind : "");
      status.textContent = text;
    };
    let sending = false;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (sending) return;
      if (!form.checkValidity()) {
        setStatus("", "");
        form.reportValidity();
        return;
      }
      sending = true;
      button.disabled = true;
      button.textContent = "Sending...";
      setStatus("", "");
      try {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        const data = await res.json();
        if (res.ok && data && data.success) {
          form.reset();
          if (keyInput) keyInput.value = WEB3FORMS_ACCESS_KEY;
          setStatus("success", "Thanks, your message was sent. I'll get back to you soon.");
        } else {
          setStatus("error", "Something went wrong. Please try again in a moment.");
        }
      } catch (err) {
        setStatus("error", "Something went wrong. Please try again in a moment.");
      } finally {
        sending = false;
        button.disabled = false;
        button.textContent = idleLabel;
      }
    });
  }
});
