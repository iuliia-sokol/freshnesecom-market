const menuItemEl = document.querySelectorAll('.menu__item');
const subMenuEl = document.querySelectorAll('.submenu');
const subSubMenuEl = document.querySelectorAll('.sub-submenu');

console.log(menuItemEl);
menuItemEl.forEach(el => el.addEventListener('mouseover', onOpenSubMenu));

function onOpenSubMenu(event) {
  event.preventDefault();
  event.currentTarget.classList.add('menu__link--active');
  event.currentTarget.lastElementChild.ariaExpanded = true;
}

menuItemEl.forEach(el => el.addEventListener('mouseout', onCloseSubMenu));

function onCloseSubMenu(event) {
  event.currentTarget.classList.remove('menu__link--active');
  event.currentTarget.lastElementChild.ariaExpanded = false;
}

subSubMenuEl.forEach(el => el.addEventListener('mouseenter', onOpenSubSubMenu));

function onOpenSubSubMenu(event) {
  event.preventDefault();
  console.dir(event.currentTarget.parentElement);
  event.currentTarget.parentElement.classList.add('submenu__item--active');
  event.currentTarget.ariaExpanded = true;
}

subSubMenuEl.forEach(el =>
  el.addEventListener('mouseleave', onCloseSubSubMenu)
);

function onCloseSubSubMenu(event) {
  event.currentTarget.parentElement.classList.remove('submenu__item--active');
  event.currentTarget.ariaExpanded = false;
}
