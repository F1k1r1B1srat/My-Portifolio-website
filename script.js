document.documentElement.classList.add("js")

// Mobile menu
const toggle = document.querySelector(".nav-toggle")
const menu = document.getElementById("nav-menu")
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open")
    toggle.setAttribute("aria-expanded", String(open))
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu")
  })
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open")
      toggle.setAttribute("aria-expanded", "false")
      toggle.setAttribute("aria-label", "Open menu")
    }),
  )
}

// Highlight the nav link for the section in view
const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')]
const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean)
if ("IntersectionObserver" in window && sections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`))
      })
    },
    { rootMargin: "-45% 0px -50% 0px" },
  )
  sections.forEach((s) => navObserver.observe(s))
}

// Gentle reveal on scroll
const revealTargets = document.querySelectorAll(".section-head, .feature, .card, .steps li, .timeline li, .art-grid figure")
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in")
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  )
  revealTargets.forEach((el) => {
    el.classList.add("reveal")
    revealObserver.observe(el)
  })
}

// Sticker swaps to the second drawing on hover
const sticker = document.querySelector(".sticker")
if (sticker && sticker.dataset.hover) {
  const original = sticker.getAttribute("src")
  const alt = sticker.dataset.hover
  new Image().src = alt
  const frame = sticker.closest(".sticker-frame")
  frame.addEventListener("mouseenter", () => (sticker.src = alt))
  frame.addEventListener("mouseleave", () => (sticker.src = original))
}

// Featured project screenshot tabs
document.querySelectorAll(".feature").forEach((feature) => {
  const shot = feature.querySelector(".shot")
  const img = shot && shot.querySelector("img")
  const tabs = feature.querySelectorAll(".shot-tabs button")
  if (!img || !tabs.length) return
  const srcs = shot.dataset.shots.split(",")
  const alts = [
    "Paceflow terminal dashboard prototype showing the Verdict tab: a model comparison table with colour-coded mainline reach and bug rate",
    "Paceflow terminal dashboard prototype showing the Delivery tab: commits, PR reach, mainline and merge rates per AI model",
  ]
  srcs.forEach((s) => (new Image().src = s))
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      const i = Number(tab.dataset.i)
      tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)))
      img.style.opacity = "0"
      setTimeout(() => {
        img.src = srcs[i]
        img.alt = alts[i] || img.alt
        img.style.opacity = "1"
      }, 150)
    }),
  )
})

// Contact form via EmailJS (same account, service and template as before)
const form = document.getElementById("contactForm")
const status = document.getElementById("formStatus")
let emailReady = false

function initEmail() {
  if (window.emailjs && !emailReady) {
    window.emailjs.init("57fGguTWnCl-wJIuq")
    emailReady = true
  }
  return emailReady
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const button = form.querySelector('button[type="submit"]')
    if (!initEmail()) {
      status.textContent = "The form couldn't load. Please email fikirbisrat0@gmail.com directly."
      status.className = "form-status error"
      return
    }
    const original = button.textContent
    button.textContent = "Sending…"
    button.disabled = true
    status.textContent = ""
    status.className = "form-status"

    const time = document.createElement("input")
    time.type = "hidden"
    time.name = "time"
    time.value = new Date().toLocaleString()
    form.appendChild(time)

    window.emailjs
      .sendForm("service_vf74rd3", "template_4nxhei7", form)
      .then(() => {
        status.textContent = "Thanks! Your message is on its way."
        status.className = "form-status success"
        form.reset()
      })
      .catch(() => {
        status.textContent = "That didn't send. Please try again or email fikirbisrat0@gmail.com."
        status.className = "form-status error"
      })
      .finally(() => {
        time.remove()
        button.textContent = original
        button.disabled = false
      })
  })
}

const year = document.getElementById("year")
if (year) year.textContent = new Date().getFullYear()
