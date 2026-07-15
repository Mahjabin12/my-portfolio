const CommonUI = {
  initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", initialTheme);

    if (themeIcon) {
      themeIcon.className = initialTheme === "dark"
        ? "fa-regular fa-sun"
        : "fa-regular fa-moon";
    }

    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);

      if (themeIcon) {
        themeIcon.className = nextTheme === "dark"
          ? "fa-regular fa-sun"
          : "fa-regular fa-moon";
      }
    });
  },

  initReveal() {
    const revealItems = document.querySelectorAll(".reveal");

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

    revealItems.forEach((item) => observer.observe(item));
  },

  initScrollToTop() {
    const scrollButton = document.getElementById("scrollToTop");

    if (!scrollButton) return;

    const toggleButton = () => {
      scrollButton.classList.toggle("show", window.scrollY > 500);
    };

    toggleButton();

    window.addEventListener("scroll", toggleButton, { passive: true });

    scrollButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  },

  renderFloatingSkills(selector) {
    const container = document.querySelector(selector);

    if (!container) return;

    const skills = [
      {
        label: "Figma",
        icon: "fa-brands fa-figma",
        cx: 22,
        cy: 18,
        duration: 7.5,
        delay: 0,
        amplitude: 8
      },
      {
        label: "Canva",
        icon: "fa-solid fa-palette",
        cx: 70,
        cy: 30,
        duration: 9.2,
        delay: 0.6,
        amplitude: 10
      },
      {
        label: "Adobe XD",
        icon: "fa-solid fa-pen-nib",
        cx: 18,
        cy: 55,
        duration: 8.4,
        delay: 1.1,
        amplitude: 9
      },
      {
        label: "HTML/CSS",
        icon: "fa-solid fa-code",
        cx: 65,
        cy: 65,
        duration: 10.5,
        delay: 0.3,
        amplitude: 11
      },
      {
        label: "SEO",
        icon: "fa-solid fa-magnifying-glass",
        cx: 32,
        cy: 85,
        duration: 8.8,
        delay: 0.9,
        amplitude: 8
      }
    ];

    const path = skills
      .map((skill, index, array) => {
        if (index === 0) {
          return `M ${skill.cx} ${skill.cy}`;
        }

        const previous = array[index - 1];
        const controlY = (previous.cy + skill.cy) / 2;

        return `C ${previous.cx} ${controlY}, ${skill.cx} ${controlY}, ${skill.cx} ${skill.cy}`;
      })
      .join(" ");

    const nodes = skills
      .map((skill) => {
        return `
          <circle
            cx="${skill.cx}"
            cy="${skill.cy}"
            r="0.7"
            fill="var(--primary)"
            opacity="0.7"
          ></circle>
        `;
      })
      .join("");

    const chips = skills
      .map((skill) => {
        return `
          <div
            class="float-chip"
            style="
              top: ${skill.cy}%;
              left: ${skill.cx}%;
              --float-duration: ${skill.duration}s;
              --float-delay: ${skill.delay}s;
              --float-amp: ${skill.amplitude}px;
            "
          >
            <div class="float-chip-inner">
              <i class="${skill.icon}"></i>
              <span>${skill.label}</span>
            </div>
          </div>
        `;
      })
      .join("");

    container.innerHTML = `
      <div class="floating-skills">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          class="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="threadLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="var(--primary)" stop-opacity="0"></stop>
              <stop offset="20%" stop-color="var(--primary)" stop-opacity="0.55"></stop>
              <stop offset="80%" stop-color="var(--primary)" stop-opacity="0.55"></stop>
              <stop offset="100%" stop-color="var(--primary)" stop-opacity="0"></stop>
            </linearGradient>
          </defs>

          <path
            d="${path}"
            fill="none"
            stroke="url(#threadLine)"
            stroke-width="0.45"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          ></path>

          ${nodes}
        </svg>

        ${chips}
      </div>
    `;
  }
};



async function loadSharedFooter() {
  const footerTarget = document.getElementById("footer");

  if (!footerTarget) return;

  const isInsidePagesFolder = window.location.pathname.includes("/pages/");
  const footerPath = isInsidePagesFolder
    ? "../section/footer.html"
    : "section/footer.html";

  try {
    const response = await fetch(footerPath);

    if (!response.ok) {
      throw new Error("Footer could not be loaded");
    }

    footerTarget.innerHTML = await response.text();

    fixFooterLinks(isInsidePagesFolder);
    initRevealForSharedContent();
  } catch (error) {
    console.error(error);
  }
}

function fixFooterLinks(isInsidePagesFolder) {
  if (!isInsidePagesFolder) return;

  const footer = document.getElementById("footer");

  if (!footer) return;

  footer.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    if (href === "#home") {
      link.setAttribute("href", "../index.html#home");
    }

    if (href === "index.html") {
      link.setAttribute("href", "../index.html");
    }

    if (href.startsWith("pages/")) {
      link.setAttribute("href", href.replace("pages/", ""));
    }

    if (href.startsWith("my cv/")) {
      link.setAttribute("href", "../" + href);
    }
  });
}

function initSharedScrollToTop() {
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

function initRevealForSharedContent() {
  const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");

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