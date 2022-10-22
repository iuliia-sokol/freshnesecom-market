import * as basicLightbox from 'basiclightbox';
import { allProducts } from './products-data-editor';
// import tingle from 'tingle.js';
import { bestSellersCardsEl } from './products-markup-creator';
import { farmProductsCardsEl } from './products-markup-creator';
import { onSaleCardsEl } from './products-markup-creator';

const lightboxedImage = document.querySelectorAll('.product__img-wrapper');
console.log(lightboxedImage);
lightboxedImage.forEach(image => image.addEventListener('click', openLightbox));

function openLightbox(event) {
  event.preventDefault();
  basicLightbox
    .create(
      `
   <div class="modal">
   <button
      data-map-close
      class="modal__close-btn"
      aria-label="close modal window"
    >&#10005;
    </button>
<div class="modal__data">
<div class="modal__img-wrapper">
<span class="modal__discount animate__animated animate__heartBeat"
>${event.target.discount}</span>
 <img class="modal__image"
  srcset="${event.target.srcset}"
  src="${event.target.img}"
  data-source="${event.target.src}"
  loading="lazy"
  alt="${event.target.title}"
  width="237"
  height="180" />
</div>
<a href="${event.target.link}" class="links-general modal__link">
 <h3 class="modal__title">${event.target.title}</h3>
<p class="modal__description">${event.target.description}</p>
</a>
</div>
<div class="modal__price-tag">
<div class="modal__price-wrapper">
<p class="modal__new-price">${event.target.newPrice}</p>
<p class="modal__old-price">${event.target.oldPrice}</p>
</div>
<button type="button" class="buy-btn">Buy now</button>
</div>
</div>`
    )
    .show();
}
//   // instanciate new modal
//   let modal = new tingle.modal({
//     footer: true,
//     stickyFooter: false,
//     closeMethods: ['overlay', 'button', 'escape'],
//     closeLabel: 'Close',
//     cssClass: ['custom-class-1', 'custom-class-2'],
//     onOpen: function () {
//       console.log('modal open');
//     },
//     onClose: function () {
//       console.log('modal closed');
//     },
//     beforeClose: function () {
//       // here's goes some logic
//       // e.g. save content before closing the modal
//       return true; // close the modal
//       return false; // nothing happens
//     },
//   });

//   // set content
//   modal.setContent("<h1>here's some content</h1>");

//   // add a button
//   modal.addFooterBtn(
//     'Button label',
//     'tingle-btn tingle-btn--primary',
//     function () {
//       // here goes some logic
//       modal.close();
//     }
//   );

//   // add another button
//   modal.addFooterBtn(
//     'Dangerous action !',
//     'tingle-btn tingle-btn--danger',
//     function () {
//       // here goes some logic
//       modal.close();
//     }
//   );

//   // open modal
//   modal.open();

//   // close modal
//   modal.close();
// }

// bestSellersCardsEl.addEventListener('click', onGalleryItemClick);
// farmProductsCardsEl.addEventListener('click', onGalleryItemClick);
// onSaleCardsEl.addEventListener('click', onGalleryItemClick);

// galleryEl.onclick = () => {
//   basicLightbox
//     .create(
//       `<img width="100vw" height="100vh" src="${this.src}">
// 	`
//     )
//     .show();
// };

// document.querySelector('product__img-wrapper').onclick = () => {
//   basicLightbox
//     .create(
//       `
// 		<h1>HTML</h1>
// 		<p>HTML inside a lightbox.</p>
// 	`
//     )
//     .show();
// };

// function onGalleryItemClick(event) {
//   event.preventDefault();
//   if (event.target.nodeName !== 'IMG') {
//     return;
//   }
//   window.addEventListener('keydown', onEscKeyPress);
//     console.log(event.target.src);

//     const instance = basicLightbox.create(
//       `
// 	<h1>Not closable</h1>
// 	<p>It's not possible to close this lightbox with a click.</p>
// `).show();
// //   basicLightbox
// //     .create(`<img width="100" height="100" src="${event.target.src}">`)
// //     .show();
// // }

// function onEscKeyPress(event) {
//   if (event.code === 'Escape') {
//     const imageModal = document.querySelector('.basicLightbox');
//     imageModal.classList.remove('basicLightbox--visible');
//     window.removeEventListener('keydown', onEscKeyPress);
//   }
// }

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// let lightbox = new SimpleLightbox('.gallery a', {
//   captions: true,
//   captionPosition: 'bottom',
//   captionSelector: 'img',
//   captionType: 'attr',
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// function onGalleryItemClick(event) {
//   event.preventDefault();
//   if (event.target.nodeName !== 'IMG') {
//     return;
//   }
//   window.addEventListener('keydown', onEscKeyPress);

//   basicLightbox
//     .create(
//       `<img width="100vw" height="100vh" src="${event.target.dataset.source}">
// 	`
//     )
//     .show();
// }

// function onEscKeyPress(event) {
//   if (event.code === 'Escape') {
//     const imageModal = document.querySelector('.basicLightbox');
//     imageModal.classList.remove('basicLightbox--visible');
//     window.removeEventListener('keydown', onEscKeyPress);
//   }
// }
