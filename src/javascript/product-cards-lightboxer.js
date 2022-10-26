import * as basicLightbox from 'basiclightbox';

const lightboxedCard = document.querySelectorAll('.product');
lightboxedCard.forEach(product =>
  product.addEventListener('click', openLightbox)
);

function openLightbox(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (event.target.nodeName === 'IMG') {
    onProductImageClick(event);
  }

  if (event.target.nodeName === 'BUTTON') {
    onBuyBtnClick(event);
  }
}

function onProductImageClick(event) {
  //  CREATE IMAGE SHOW WINDOW
  const instance = basicLightbox.create(
    `
   <div class="lightbox-image">
   <button
      data-map-close
      class="lightbox-image__close-btn"
      aria-label="close modal window"
    >&#10005;
    </button>
<div class="lightbox-image__img-wrapper">
 <img class="image-display lightbox-image__image"
  srcset="${event.currentTarget.dataset.srcset}"
  src="${event.currentTarget.dataset.img}"
  data-source="${event.currentTarget.dataset.img}"
  loading="lazy"
  rel="noopener noreferrer nofollow"
  alt="${event.currentTarget.dataset.title}"
  width="566"
  height="377" />
 <h3 class="lightbox-image__title">${event.currentTarget.dataset.title}</h3>
</div>
</div>`,
    {
      onShow: instance => {
        instance.element().querySelector('.lightbox-image__close-btn').onclick =
          instance.close;
        window.addEventListener('keydown', event => {
          if (event.code === 'Escape' || event.code === 'Space') {
            instance.close();
            window.removeEventListener;
          }
        });
      },
      onClose: instance => {},
    }
  );
  instance.show();

  // ADJUST SIZE OF MODAL WINDOW
  const basicLightboxContainerEl = document.querySelector(
    '.basicLightbox__placeholder'
  );
  basicLightboxContainerEl.classList.add('basicLightbox__placeholder--image');
}

function onBuyBtnClick(event) {
  //  CREATE MODAL
  const instance = basicLightbox.create(
    `
   <div class="lightbox-modal">
   <button
      data-map-close
      class="lightbox-modal__close-btn"
      aria-label="close modal window"
    >&#10005;
    </button>
<div class="lightbox-modal__data">
<div class="lightbox-modal__img-wrapper">
<span class="lightbox-modal__discount"
>${event.currentTarget.dataset.discount}</span>
 <img class="image-display lightbox-modal__image"
  srcset="${event.currentTarget.dataset.srcset}"
  src="${event.currentTarget.dataset.img}"
  data-source="${event.currentTarget.dataset.img}"
  loading="lazy"
  rel="noopener noreferrer nofollow"
  alt="${event.currentTarget.dataset.title}"
  width="237"
  height="180" />
</div>
<a href="${event.currentTarget.dataset.link}" class="links-general lightbox-modal__link">
 <h3 class="lightbox-modal__title">${event.currentTarget.dataset.title}</h3>
<p class="lightbox-modal__description">${event.currentTarget.dataset.description}</p>
</a>
</div>
<div class="lightbox-modal__price-tag">
<div class="lightbox-modal__price-wrapper">
<p class="lightbox-modal__new-price" data-price="${event.currentTarget.dataset.newPrice}">${event.currentTarget.dataset.newPrice}</p>
<p class="lightbox-modal__old-price" data-price="${event.currentTarget.dataset.oldPrice}">${event.currentTarget.dataset.oldPrice}</p>
</div>
   <div class="lightbox-modal__counter">
      <button type="button" class="lightbox-modal__counter-btn lightbox-modal__counter-decrement">-1</button>
      <span class="lightbox-modal__counter-value">0</span>
      <button type="button" class="lightbox-modal__counter-btn lightbox-modal__counter-increment">+1</button>
    </div>
<button type="button" class="buy-btn">Add to cart</button>
</div>
</div>`,
    {
      onShow: instance => {
        instance.element().querySelector('.lightbox-modal__close-btn').onclick =
          instance.close;
        window.addEventListener('keydown', event => {
          if (event.code === 'Escape' || event.code === 'Space') {
            instance.close();
            window.removeEventListener;
          }
        });
      },
      onClose: instance => {
        counterValue.value = 0;
      },
    }
  );
  instance.show();

  // // ADJUST SIZE OF MODAL WINDOW
  // const basicLightboxContainerEl = document.querySelector(
  //   '.basicLightbox__placeholder'
  // );
  // basicLightboxContainerEl.classList.add('basicLightbox__placeholder--modal');

  //  ADDING EXTRA ELEMENTS FOR PRODUCTS ON SALE

  const discount = document.querySelector('.lightbox-modal__discount');
  const discountImg = document.querySelector('.lightbox-modal__img-wrapper');
  if (discount.textContent !== '') {
    // ADD TEASER
    const discountTeaser = document.createElement('span');
    discountTeaser.classList.add('lightbox-modal__teaser');
    discountTeaser.textContent = `Hurry up! Hot offer!`;
    discountImg.appendChild(discountTeaser);

    // COUNT SAVED MONEY
    const oldPriceEl = document.querySelector('.lightbox-modal__old-price');
    const newPriceEl = document.querySelector('.lightbox-modal__new-price');
    const moneySaved = (
      parseFloat(oldPriceEl.dataset.price) -
      parseFloat(newPriceEl.dataset.price)
    ).toFixed(2);

    // ADD SAVED MONEY TEASER
    const savedMoneyTeaser = document.createElement('p');
    savedMoneyTeaser.classList.add('lightbox-modal__money-teaser');
    savedMoneyTeaser.innerHTML =
      'You save <span class="lightbox-modal__money-teaser--accent"></span> USD';
    discountImg.appendChild(savedMoneyTeaser);
    const savedMoneyAmount = document.querySelector(
      '.lightbox-modal__money-teaser--accent'
    );
    savedMoneyAmount.textContent = ` ${moneySaved}`;
  }

  // SET COUNTER
  const counterEl = document.querySelector('.lightbox-modal__counter-value');
  const decrementBtn = document.querySelector(
    '.lightbox-modal__counter-decrement'
  );
  const incrementBtn = document.querySelector(
    '.lightbox-modal__counter-increment'
  );

  incrementBtn.addEventListener('click', onIncrementClick);
  decrementBtn.addEventListener('click', onDecrementClick);

  function onIncrementClick(event) {
    counterValue.increment();
    counterEl.textContent = counterValue.value;
    decrementBtn.disabled = false;
  }

  function onDecrementClick(event) {
    counterValue.decrement();
    counterEl.textContent = counterValue.value;
    if (counterValue.value <= 0) {
      decrementBtn.disabled = true;
    }
  }
}

const counterValue = {
  value: 0,
  increment() {
    this.value += 1;
  },
  decrement() {
    if (this.value <= 0) {
      return;
    }
    this.value -= 1;
  },
};
