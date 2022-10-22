import * as basicLightbox from 'basiclightbox';

const lightboxedCard = document.querySelectorAll('.product__img-wrapper');
lightboxedCard.forEach(image => image.addEventListener('click', openLightbox));

function openLightbox(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  //  CREATE MODAL

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
<span class="modal__discount"
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
<p class="modal__new-price" data-price="${event.target.dataset.newPrice}">${event.target.dataset.newPrice}</p>
<p class="modal__old-price" data-price="${event.target.dataset.oldPrice}">${event.target.dataset.oldPrice}</p>
</div>
   <div class="counter">
      <button type="button" class="counter__btn counter__decrement">-1</button>
      <span class="counter__value">0</span>
      <button type="button" class="counter__btn counter__increment">+1</button>
    </div>
<button type="button" class="buy-btn">Add to cart</button>
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

  //  ADDING EXTRA ELEMENTS FOR PRODUCTS ON SALE

  const discount = document.querySelector('.modal__discount');
  const discountImg = document.querySelector('.modal__img-wrapper');
  if (discount.textContent !== '') {
    // ADD TEASER
    const discountTeaser = document.createElement('span');
    discountTeaser.classList.add('modal__teaser');
    discountTeaser.textContent = `Hurry up! Hot offer!`;
    discountImg.appendChild(discountTeaser);
    // COUNT SAVED MONEY
    const oldPriceEl = document.querySelector('.modal__old-price');
    const newPriceEl = document.querySelector('.modal__new-price');
    const moneySaved = (
      parseFloat(oldPriceEl.dataset.price) -
      parseFloat(newPriceEl.dataset.price)
    ).toFixed(2);

    // ADD SAVED MONEY TEASER
    const savedMoneyTeaser = document.createElement('p');
    savedMoneyTeaser.classList.add('modal__money-teaser');
    savedMoneyTeaser.innerHTML =
      'You save <span class="modal__money-teaser--accent"></span> USD';
    discountImg.appendChild(savedMoneyTeaser);
    const savedMoneyAmount = document.querySelector(
      '.modal__money-teaser--accent'
    );
    savedMoneyAmount.textContent = ` ${moneySaved}`;
  }

  // SET COUNTER

  const counterEl = document.querySelector('.counter__value');
  const decrementBtn = document.querySelector('.counter__decrement');
  const incrementBtn = document.querySelector('.counter__increment');

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
