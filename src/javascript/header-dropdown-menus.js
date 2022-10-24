const arrowEl = document.querySelectorAll('.menu__icon');
const menuItemEl = document.querySelectorAll('.menu__item');
const subMenuEl = document.querySelectorAll('.submenu');
const subSubMenuEl = document.querySelectorAll('.sub-submenu');

console.log(menuItemEl);
menuItemEl.forEach(el =>
  el.addEventListener('mouseover', event => {
    event.preventDefault();
    event.currentTarget.classList.add('menu__link--active');
    //   let arrow = event.currentTarget.getElementsByTagName('svg');
    //   console.log(arrow)
    // event.currentTarget.children[1].classList.add('menu__icon--active');
  })
);

menuItemEl.forEach(el => el.addEventListener('mouseout', onCloseSubMenu));

// function onOpenSubMenu(event) {
//   event.preventDefault();
//   event.currentTarget.classList.add('menu__link--active');
//   event.currentTarget.children.classList.add('menu__icon--active');

//   console.log(event.currentTarget);
//   //   subMenuEl.classList.toggle('.sub-submenu--visible');
// }

function onCloseSubMenu(event) {
  event.preventDefault();
  event.currentTarget.classList.remove('menu__link--active');
  console.log('mouseout');
}
