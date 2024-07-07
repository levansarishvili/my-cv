"use strict";

// =========== Select HTML Elements ===========

const navEl = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");

// =========== Smooth Scrolling ===========

navLinks.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    if (id === "#") {
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Scroll to the section corresponding to the clicked link
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
      });
    }
  }
});

// =========== Sticky Navigation ===========

// window.addEventListener("scroll", function () {
//   if (this.window.scrollY > 100) {
//     navEl.classList.add("sticky-nav");
//   } else {
//     navEl.classList.remove("sticky-nav");
//   }
// });

const summary = document.querySelector(".section--summary");
const navHeight = navEl.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    navEl.classList.add("sticky-nav");
  } else {
    navEl.classList.remove("sticky-nav");
  }
};

const summaryObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

summaryObserver.observe(summary);
