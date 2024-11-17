"use strict";

// * Elements and Golobal Varibles
const html = document.documentElement;
const header = document.querySelector(".header");
const headerMenu = document.querySelector(".menu");
const menuSection = document.querySelector(".menu-section");
const discountSection = document.querySelector(".discount-section");

// filter items variables
const menuFilterList = document.querySelector(".menu__filter-list");
let mouseDown = false;
let startX, scrollLeft;

// scroll event variables
let lastScrollPos = 0;

const startDragging = e => {
  mouseDown = true;
  startX = e.pageX - menuFilterList.offsetLeft;
  scrollLeft = menuFilterList.scrollLeft;
};

const stopDragging = e => {
  mouseDown = false;
};

const move = e => {
  e.preventDefault();
  if (!mouseDown) {
    return;
  }
  const x = e.pageX - menuFilterList.offsetLeft;
  const scroll = x - startX;
  menuFilterList.scrollLeft = scrollLeft - scroll;
};

/*  Add the event listeners */
menuFilterList.addEventListener("mousemove", move, false);
menuFilterList.addEventListener("mousedown", startDragging, false);
menuFilterList.addEventListener("mouseup", stopDragging, false);
menuFilterList.addEventListener("mouseleave", stopDragging, false);

/* scroll to relate section when click on menu links */

headerMenu.addEventListener("click", e => {
  const menuLink = e.target.closest(".menu__link");
  const targetSection = document.querySelector(`#${menuLink.dataset.target}`);

  if (targetSection) {
    e.preventDefault();
    targetSection.scrollIntoView({
      behavior: "smooth",
    });

    // Hide header
    header.classList.remove('header--hide')
  }
});

/* ====================== Detect Scroll Direction =============================== */

document.addEventListener("scroll", e => {
  let currentScrollPos = html.scrollTop; // or use window.scrollY both of them is true
  if (currentScrollPos > lastScrollPos) {
    // scroll down
    header.classList.add("header--hide", "header--scrolled");
  } else {
    // scroll up
    header.classList.remove("header--hide");
  }

  // update last scroll position
  lastScrollPos = html.scrollTop;

  // when use scroll up to the top of the page
  if (html.scrollTop == 0) {
    header.classList.remove("header--scrolled");
  }
});
