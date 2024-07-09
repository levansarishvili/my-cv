"use strict";

// =========== Select HTML Elements ===========
const body = document.querySelector("body");
const navEl = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const burgerButton = document.querySelector(".burger-menu");

// Navigation for burger menu
const navBar = document.querySelector(".nav-bar");
const navBarItems = document.querySelectorAll(".nav-bar__item");

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

const summarySec = document.querySelector(".section--summary");
const navHeight = navEl.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

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

summaryObserver.observe(summarySec);

// =========== Reveal Sections ===========
const allRevealSections = document.querySelectorAll(".section--reveal");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  //   Stop observing
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allRevealSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// =========== Burger Menu ===========
burgerButton.addEventListener("click", function () {
  if (!burgerButton.classList.contains("burger-menu--active")) {
    burgerButton.classList.add("burger-menu--active");
    navBar.classList.add("nav-bar--active");
    body.classList.add("disable-scroll");
  } else {
    burgerButton.classList.remove("burger-menu--active");
    navBar.classList.remove("nav-bar--active");
    body.classList.remove("disable-scroll");
  }
});

// Hide nav-bar when nav-bar item is clicked
navBarItems.forEach((el) => {
  el.addEventListener("click", function () {
    navBar.classList.remove("nav-bar--active");
    burgerButton.classList.remove("burger-menu--active");
    body.classList.remove("disable-scroll");
  });
});
