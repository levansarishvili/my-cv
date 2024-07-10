"use strict";

// =========== Select HTML Elements ===========
const body = document.querySelector("body");
const header = document.querySelector(".header");
const navEl = document.querySelector(".nav");
const navLinksEl = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__link");
const homeButton = document.querySelector(".home-btn");
const burgerButton = document.querySelector(".burger-menu");

// Navigation for burger menu
const navBar = document.querySelector(".nav-bar");
const navBarItems = document.querySelectorAll(".nav-bar__item");

// =========== Smooth Scrolling ===========

header.addEventListener("click", function (e) {
  e.preventDefault();

  // I swiched event target from img element to its parent anchor element
  let target = e.target;
  if (target.tagName === "IMG") {
    target = target.parentElement;
  }

  // Check if we clicked right elements
  if (
    target.classList.contains("nav__link") ||
    target.classList.contains("home-btn")
  ) {
    const id = target.getAttribute("href");

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
const headerHeight = header.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    header.classList.add("sticky-nav");
  } else {
    header.classList.remove("sticky-nav");
  }
};

const summaryObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
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
    navEl.classList.add("nav--open");
    body.classList.add("disable-scroll");
  } else {
    burgerButton.classList.remove("burger-menu--active");
    navEl.classList.remove("nav--open");
    body.classList.remove("disable-scroll");
  }
});

// Hide Nav when nav-item is clicked
navLinks.forEach((el) => {
  el.addEventListener("click", function () {
    navEl.classList.remove("nav--open");
    burgerButton.classList.remove("burger-menu--active");
    body.classList.remove("disable-scroll");
  });
});
