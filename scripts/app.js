"use strict";

let mouseDown = false;
let startX, scrollLeft;
const menuFilterList = document.querySelector('.menu__filter-list');

const startDragging = (e) => {
  mouseDown = true;
  startX = e.pageX - menuFilterList.offsetLeft;
  scrollLeft = menuFilterList.scrollLeft;
}

const stopDragging = (e) => {
  mouseDown = false;
}

const move = (e) => {
  e.preventDefault();
  if(!mouseDown) { return; }
  const x = e.pageX - menuFilterList.offsetLeft;
  const scroll = x - startX;
  menuFilterList.scrollLeft = scrollLeft - scroll;
}

/*  Add the event listeners */
menuFilterList.addEventListener('mousemove', move, false);
menuFilterList.addEventListener('mousedown', startDragging, false);
menuFilterList.addEventListener('mouseup', stopDragging, false);
menuFilterList.addEventListener('mouseleave', stopDragging, false);