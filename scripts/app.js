"use strict";

/* -------------------------- Elements and Golobal Varibles ------------------------------*/
const html = document.documentElement;
const body = document.body;
const header = document.querySelector(".header");
const navigationLinks = document.querySelectorAll(".navigation-link");
const burgerIcon = document.querySelector(".burger");
const mobileOffcanvas = document.querySelector(".mobile-offcanvas");
const overlay = document.querySelector(".overlay");
const menuFilterList = document.querySelector(".menu__filter-list");
let mouseDown = false;
let startX, scrollLeft;
let lastScrollPos = 0;

let offcanvasIsActive = false;
let offcanvasIsOpen;

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

// headerMenu.addEventListener("click", e => {});

navigationLinks.forEach(link => {
  link.addEventListener("click", e => {
    const menuLink = e.target.closest(".navigation-link");
    const targetSection = document.querySelector(`#${menuLink.dataset.target}`);

    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({
        behavior: "smooth",
      });

      // Hide header
      header.classList.remove("header--hide");
    }
  });
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


  console.log(html.scrollTop);

  if(Math.trunc(html.scrollTop) == 50){
    console.log('yes');
  }
  // when use scroll up to the top of the page
  if (Math.trunc(html.scrollTop) == 100 || Math.trunc(html.scrollTop) == 0) {
    header.classList.remove("header--scrolled");
  }
});

/* Mobile Offcanvase */
burgerIcon.addEventListener("click", e => {
  if (offcanvasIsActive) return;

  // open it
  mobileOffcanvas.classList.add("mobile-offcanvas--show");
  overlay.classList.add("overlay--ative");
  html.classList.add('disable-scrolling')

  offcanvasIsActive = true;
});

overlay.addEventListener("click", e => {
  // close it
  mobileOffcanvas.classList.remove("mobile-offcanvas--show");
  overlay.classList.remove("overlay--ative");
  html.classList.remove('disable-scrolling')

  offcanvasIsActive = false;
});
