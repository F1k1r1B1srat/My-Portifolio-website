// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Contact form submission
document.querySelector(".contact-form").addEventListener("submit", async function (e) {
  e.preventDefault()

  const formStatus = document.getElementById("formStatus")
  const submitButton = this.querySelector('button[type="submit"]')
  const originalButtonText = submitButton.textContent

  // Show loading state
  submitButton.textContent = "Sending..."
  submitButton.disabled = true
  formStatus.textContent = ""
  formStatus.className = "form-status"

  try {
    // Create FormData object
    const formData = new FormData(this)

    // Send form data to PHP handler
    const response = await fetch("contact_handler.php", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      formStatus.textContent = result.message
      formStatus.className = "form-status success"
      this.reset() // Clear form on success
    } else {
      formStatus.textContent = result.message
      formStatus.className = "form-status error"
    }
  } catch (error) {
    formStatus.textContent = "Network error. Please try again later."
    formStatus.className = "form-status error"
  } finally {
    // Reset button state
    submitButton.textContent = originalButtonText
    submitButton.disabled = false

    // Hide status message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = ""
      formStatus.className = "form-status"
    }, 5000)
  }
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(63, 46, 15, 0.7)"
  } else {
    navbar.style.background = "rgba(5, 5, 4, 0.95)"
  }
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

// Gallery item hover effects
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)"
  })

  item.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })
})

// Service card animations
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)"
    this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
    this.style.boxShadow = "none"
  })
})

// Character image hover effect to switch between sticker.webp and sticker2.webp
const characterImg = document.querySelector(".character-img")
const characterCircle = document.querySelector(".character-circle")

if (characterImg && characterCircle) {
  const originalSrc = "/asset/sticker.webp"
  const hoverSrc = "/asset/sticker2.webp"

  characterCircle.addEventListener("mouseenter", () => {
    characterImg.src = hoverSrc
  })

  characterCircle.addEventListener("mouseleave", () => {
    characterImg.src = originalSrc
  })
}

// About section image hover effect to switch between sticker.webp and sticker2.webp
const aboutImg = document.querySelector(".about-image img")
const aboutImageContainer = document.querySelector(".about-image")

if (aboutImg && aboutImageContainer) {
  const originalSrc = "/asset/sticker.webp"
  const hoverSrc = "/asset/sticker2.webp"

  aboutImageContainer.addEventListener("mouseenter", () => {
    aboutImg.src = hoverSrc
  })

  aboutImageContainer.addEventListener("mouseleave", () => {
    aboutImg.src = originalSrc
  })
}

// Initialize Three.js scene for 3D background elements
function init3DBackground() {
  const canvas = document.getElementById("threejs-canvas")
  if (!canvas) return

  const scene = new window.THREE.Scene()
  const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new window.THREE.WebGLRenderer({ canvas: canvas, alpha: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0) // Transparent background

  // Create floating geometric shapes with warm colors matching the theme
  const shapes = []
  const colors = [0xff6b35, 0xd2691e, 0x8b4513, 0x2c1810] // Orange and brown tones

  // Create different geometric shapes
  const geometries = [
    new window.THREE.BoxGeometry(1, 1, 1),
    new window.THREE.SphereGeometry(0.7, 8, 6),
    new window.THREE.ConeGeometry(0.7, 1.5, 6),
    new window.THREE.OctahedronGeometry(0.8),
  ]

  // Create 15 floating shapes
  for (let i = 0; i < 15; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)]
    const material = new window.THREE.MeshBasicMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      transparent: true,
      opacity: 0.1,
    })

    const shape = new window.THREE.Mesh(geometry, material)

    // Random positioning
    shape.position.x = (Math.random() - 0.5) * 50
    shape.position.y = (Math.random() - 0.5) * 50
    shape.position.z = (Math.random() - 0.5) * 30

    // Random rotation
    shape.rotation.x = Math.random() * Math.PI
    shape.rotation.y = Math.random() * Math.PI

    // Store animation properties
    shape.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      },
      floatSpeed: Math.random() * 0.01 + 0.005,
      floatRange: Math.random() * 2 + 1,
    }

    shapes.push(shape)
    scene.add(shape)
  }

  camera.position.z = 20

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    // Animate each shape
    shapes.forEach((shape, index) => {
      // Rotation animation
      shape.rotation.x += shape.userData.rotationSpeed.x
      shape.rotation.y += shape.userData.rotationSpeed.y
      shape.rotation.z += shape.userData.rotationSpeed.z

      // Floating animation
      shape.position.y += Math.sin(Date.now() * shape.userData.floatSpeed + index) * 0.01
    })

    renderer.render(scene, camera)
  }

  animate()

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

// Initialize 3D background when page loads
window.addEventListener("load", () => {
  // Small delay to ensure Three.js is loaded
  setTimeout(init3DBackground, 100)
})
