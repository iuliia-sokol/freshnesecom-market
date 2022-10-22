import * as basicLightbox from 'basiclightbox';

const lightboxedImage = document.querySelectorAll('.product__img-wrapper');
lightboxedImage.forEach(image => image.addEventListener('click', openLightbox));

function openLightbox(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(
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
>${event.target.dataset.discount}</span>
 <img class="modal__image"
  srcset="${event.target.srcset}"
  src="${event.target.src}"
  data-source="${event.target.src}"
  loading="lazy"
  alt="${event.target.alt}"
  width="237"
  height="180" />
</div>
<a href="${event.target.link}" class="links-general modal__link">
 <h3 class="modal__title">${event.target.alt}</h3>
<p class="modal__description">${event.target.dataset.description}</p>
</a>
</div>
<div class="modal__price-tag">
<div class="modal__price-wrapper">
<p class="modal__new-price">${event.target.dataset.newPrice}</p>
<p class="modal__old-price">${event.target.dataset.oldPrice}</p>
</div>
<button type="button" class="buy-btn">Buy now</button>
</div>
</div>`,
    {
      onShow: instance => {
        instance.element().querySelector('.modal__close-btn').onclick =
          instance.close;
        window.addEventListener('keydown', event => {
          if (event.code === 'Escape' || event.code === 'Space') {
            instance.close();
            window.removeEventListener;
          }
        });
      },
    }
  );
  instance.show();
}
