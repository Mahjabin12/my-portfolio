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
    initFooterReveal();
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

function initFooterReveal() {
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

loadSharedFooter();
initScrollToTopButton();