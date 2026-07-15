const sections = [
  { id: "navbar", file: "section/navbar.html" },
  { id: "hero", file: "section/hero.html" },
  { id: "about", file: "section/about.html" },
  { id: "project", file: "section/project.html" },
  { id: "howWork", file: "section/howWork.html" },
  { id: "toolkit", file: "section/toolkit.html" },
  { id: "cta", file: "section/cta.html" },
  { id: "footer", file: "section/footer.html" }
];

async function loadSections() {
  for (const section of sections) {
    const target = document.getElementById(section.id);

    if (!target) continue;

    try {
      const response = await fetch(section.file);

      if (!response.ok) {
        console.warn(`Skipped: ${section.file}`);
        continue;
      }

      target.innerHTML = await response.text();
    } catch (error) {
      console.error(`Error loading ${section.file}:`, error);
    }
  }

  initNavbar();
  initThemeToggle();
  initRevealAnimation();
  initScrollToTopButton();

  // Important:
  // Do NOT call renderFloatingSkills here.
  // New hero floating chips are handled only by hero.html + CSS.
}

function initNavbar() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const header = document.getElementById("siteHeader");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.className = mobileMenu.classList.contains("hidden")
          ? "fa-solid fa-bars"
          : "fa-solid fa-xmark";
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");

        const icon = menuBtn.querySelector("i");

        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      });
    });
  }

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 8) {
      header.classList.add("border-b");
      header.style.borderColor = "var(--border)";
      header.style.background = "rgba(13, 8, 5, 0.82)";
      header.style.webkitBackdropFilter = "blur(18px)";
      header.style.backdropFilter = "blur(18px)";
    } else {
      header.classList.remove("border-b");
      header.style.background = "transparent";
      header.style.webkitBackdropFilter = "none";
      header.style.backdropFilter = "none";
    }
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });
}

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme || "dark";

  document.documentElement.setAttribute("data-theme", initialTheme);

  if (themeIcon) {
    themeIcon.className =
      initialTheme === "dark" ? "fa-regular fa-sun" : "fa-regular fa-moon";
  }

  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (themeIcon) {
      themeIcon.className =
        nextTheme === "dark" ? "fa-regular fa-sun" : "fa-regular fa-moon";
    }
  });
}

function initRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) return;

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = entry.target.dataset.delay || "0";

        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}

function initScrollToTopButton() {
  const scrollButton = document.getElementById("scrollToTop");

  if (!scrollButton) return;

  function toggleButton() {
    scrollButton.classList.toggle("show", window.scrollY > 500);
  }

  toggleButton();

  window.addEventListener("scroll", toggleButton, {
    passive: true
  });

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

loadSections();