document.addEventListener("DOMContentLoaded", function () {
  // Toggle project details
  window.toggleDetails = function (btn, id) {
    const details = document.getElementById(id);
    if (!details) return;
    const isOpen = details.style.display === "block";
    // Hide all other details
    document.querySelectorAll(".project-details").forEach((div) => {
      div.style.display = "none";
    });
    // Reset all "Learn More" buttons
    document.querySelectorAll(".project-link").forEach((b) => {
      if (b.tagName === "BUTTON") b.textContent = "Learn More";
    });
    if (!isOpen) {
      details.style.display = "block";
      btn.textContent = "Show less";
      details.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Navbar active link switching
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Set the current year in the footer
  document.getElementById("year").textContent = new Date().getFullYear();
});

function expandProjectDetailsFromHash() {
  // Hide all details first
  document
    .querySelectorAll(".project-details")
    .forEach((el) => (el.style.display = "none"));
  // Reset all "Learn More" buttons
  document.querySelectorAll(".project-link").forEach((b) => {
    if (b.tagName === "BUTTON") b.textContent = "Learn More";
  });
  // Get hash (without #)
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const details = document.getElementById(hash);
    if (details) {
      details.style.display = "block";
      // Find the corresponding button and set its text to "Show less"
      const btn = document.querySelector(`.project-link[onclick*="${hash}"]`);
      if (btn && btn.tagName === "BUTTON") {
        btn.textContent = "Show less";
      }
      // Optional: scroll into view smoothly
      details.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

// Expand on hash change (if user clicks another project)
window.addEventListener("hashchange", expandProjectDetailsFromHash);

// Optional: If you want "Learn More" buttons to toggle as before, keep your toggleDetails function
function toggleDetails(btn, id) {
  const details = document.getElementById(id);
  const isOpen = details.style.display === "block";
  // Hide all other details
  document.querySelectorAll(".project-details").forEach((div) => {
    div.style.display = "none";
  });
  // Reset all "Learn More" buttons (match the original button text exactly)
  document.querySelectorAll(".project-link").forEach((b) => {
    if (b.tagName === "BUTTON") b.textContent = "Learn More";
  });
  if (!isOpen) {
    details.style.display = "block";
    btn.textContent = "Show less";
    details.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// Remove hash from URL on first load if present
// may not need once we upload to github
if (window.location.hash) {
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}

// Scrollspy: highlight nav link based on scroll position
document.addEventListener("scroll", function () {
  const sections = [
    { id: "home", nav: "Home" },
    { id: "projects", nav: "Projects" },
    { id: "certifications", nav: "Certifications" },
    { id: "contact", nav: "Contact" },
  ];
  let currentSection = "home";
  const scrollY = window.scrollY + 120; // Offset for nav height

  for (const section of sections) {
    const el = document.getElementById(section.id);
    if (el && el.offsetTop <= scrollY) {
      currentSection = section.id;
    }
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
