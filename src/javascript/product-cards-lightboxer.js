import * as basicLightbox from 'basiclightbox';
import { allProducts } from './product-class-creator';
import { getSelectedItem } from './product-class-creator';
import { shoppingCart } from './shopping-cart';
import { refs } from './shopping-cart';

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

// ON IMAGE CLICK

function onProductImageClick(event) {
  const selectedProduct = getSelectedItem(event, allProducts);

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
  srcset="${selectedProduct.srcset}"
  src="${selectedProduct.img}"
  data-source="${selectedProduct.img}"
  loading="lazy"
  rel="noopener noreferrer nofollow"
  alt="${selectedProduct.title}"
  width="566"
  height="377" />
 <h3 class="lightbox-image__title">${selectedProduct.title}</h3>
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

// ON BUY BTN CLICK

function onBuyBtnClick(event) {
  const selectedProduct = getSelectedItem(event, allProducts);

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
>${selectedProduct.discount}</span>
 <img class="image-display lightbox-modal__image"
  srcset="${selectedProduct.srcset}"
  src="${selectedProduct.img}"
  data-source="${selectedProduct.img}"
  loading="lazy"
  rel="noopener noreferrer nofollow"
  alt="${selectedProduct.title}"
  width="237"
  height="180" />
</div>
<a href="${selectedProduct.link}" class="links-general lightbox-modal__link">
 <h3 class="lightbox-modal__title">${selectedProduct.title}</h3>
<p class="lightbox-modal__description">${selectedProduct.description}</p>
<p class="lightbox-modal__measure">Price per 1 ${selectedProduct.measure}</p>
</a>
</div>
<div class="lightbox-modal__price-tag">
<div class="lightbox-modal__price-wrapper">
<p class="lightbox-modal__new-price">${selectedProduct.newPrice}</p>
<p class="lightbox-modal__old-price">${selectedProduct.oldPrice}</p>
</div>
   <div class="lightbox-modal__counter">
      <button type="button" class="lightbox-modal__counter-btn lightbox-modal__counter-decrement">-1</button>
      <span class="lightbox-modal__counter-value">1</span>
      <button type="button" class="lightbox-modal__counter-btn lightbox-modal__counter-increment">+1</button>
    </div>
<button type="button" class="buy-btn  add-to-cart-btn "
data-id="${selectedProduct.id}"
data-quantity=1 data-saved-money="">Add to cart</button>
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
        counterValue.value = 1;
        incrementBtn.removeEventListener('click', onIncrementClick);
        decrementBtn.removeEventListener('click', onDecrementClick);
        addToCartBtnEl.removeEventListener('click', onAddToCartBtnClick);
      },
    }
  );
  instance.show();

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
    const moneySaved = (
      parseFloat(selectedProduct.oldPrice) -
      parseFloat(selectedProduct.newPrice)
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

  function onIncrementClick() {
    counterValue.increment();
    decrementBtn.disabled = false;
    addToCartBtnEl.disabled = false;
    selectedProduct.quantity = counterValue.value;
    counterEl.textContent = selectedProduct.quantity;
    addToCartBtnEl.classList.remove('buy-btn--disabled');
    selectedProduct.total = (
      selectedProduct.quantity * parseFloat(selectedProduct.newPrice)
    ).toFixed(2);
  }

  function onDecrementClick() {
    counterValue.decrement();
    selectedProduct.quantity = counterValue.value;
    counterEl.textContent = selectedProduct.quantity;
    selectedProduct.total = (
      selectedProduct.quantity * parseFloat(selectedProduct.newPrice)
    ).toFixed(2);
    if (counterValue.value <= 0) {
      decrementBtn.disabled = true;
      addToCartBtnEl.disabled = true;
      addToCartBtnEl.classList.add('buy-btn--disabled');
    }
  }

  const counterValue = {
    value: 1,
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

  // CHECK SHOPPING CART

  if (shoppingCart.items.includes(selectedProduct)) {
    counterEl.textContent = selectedProduct.quantity;
    counterValue.value = +selectedProduct.quantity;
  }

  // ADD PRODUCTS TO SHOPPING CART

  const addToCartBtnEl = document.querySelector('.add-to-cart-btn');
  addToCartBtnEl.addEventListener('click', onAddToCartBtnClick);

  const quantityInput = document.querySelectorAll('.basket-card__input');

  function onAddToCartBtnClick() {
    refs.basketEl.classList.remove('is-hidden');
    shoppingCart.countSelectedItemTotal(selectedProduct);

    if (shoppingCart.items.includes(selectedProduct)) {
      counterEl.textContent = counterValue.value;

      quantityInput.forEach(input => {
        if (input.dataset.id === selectedProduct.id) {
          input.value = selectedProduct.quantity;
        }
      });
      shoppingCart.displayPrice(selectedProduct);
      refs.displayCartTotal.textContent =
        shoppingCart.countTotal() + ' ' + 'USD';
      instance.close();
      return;
    }

    shoppingCart.addItemToShoppingCart(selectedProduct);

    refs.displayCartTotal.textContent = shoppingCart.countTotal() + ' ' + 'USD';

    shoppingCart.setShoppingCart(shoppingCart);
    instance.close();

    return shoppingCart;
  }
}
