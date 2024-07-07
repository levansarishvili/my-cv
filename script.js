"use strict";

// =========== Select HTML Elements ===========
const navEl = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");

// =========== Sticky Navigation ===========
const currentScrollX = window.scrollX;
const currentScrollY = window.scrollY;

if (currentScrollY > 20) {
  navEl.classList.add("sticky-nav");
}

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
