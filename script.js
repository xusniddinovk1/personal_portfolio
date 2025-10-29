// Loader functionality
window.addEventListener("load", function() {
  const loader = document.querySelector(".loader-wrapper");
  if (loader) {
    setTimeout(function() {
      loader.classList.add("hidden");
    }, 2000); // Show loader for at least 1 second
  }
});

const navLinks = document.querySelectorAll(".header__link");
const menuToggle = document.querySelector(".menu-toggle");
const headerNav = document.querySelector(".header__nav");

// Set Home link as active by default when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Remove active class from all links first
  navLinks.forEach(link => link.classList.remove("active"));
  
  // Set Home link as active (assuming it's the first link or has href="#home")
  const homeLink = document.querySelector('.header__link[href="#home"]');
  if (homeLink) {
    homeLink.classList.add("active");
  } else if (navLinks.length > 0) {
    // Fallback: make the first link active
    navLinks[0].classList.add("active");
  }
});

// Handle navigation link clicks
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    
    // Close mobile menu when a link is clicked
    if (headerNav.classList.contains("active")) {
      headerNav.classList.remove("active");
    }
  });
});

// Handle mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    headerNav.classList.toggle("active");
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  const isClickInsideNav = headerNav.contains(event.target);
  const isClickOnMenuToggle = menuToggle && menuToggle.contains(event.target);
  
  if (!isClickInsideNav && !isClickOnMenuToggle && headerNav.classList.contains("active")) {
    headerNav.classList.remove("active");
  }
});

// Auto-update active link based on scroll position
window.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5 // Trigger when 50% of the section is visible
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove("active"));
        
        // Add active class to the corresponding link
        const activeLink = document.querySelector(`.header__link[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Also update active link on scroll for browsers that don't support IntersectionObserver
  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute("id");
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});