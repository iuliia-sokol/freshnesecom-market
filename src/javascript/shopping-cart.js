import { getSelectedItem } from './product-cards-lightboxer';

export const basketEl = document.querySelector('.basket-modal');
export const shoppingCart = {
  items: [],
  total: 0,

  countTotal() {
    const shoppingCartItemsTotal = this.items.map(item => +item.total);
    this.total = shoppingCartItemsTotal
      .reduce((acc, currentValue) => acc + currentValue)
      .toFixed(2);
    return this.total;
  },
};

// console.dir(shoppingCart);

export const STORAGE_KEY = 'shopping-cart';
export const setShoppingCart = obj => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
};

const savedData = localStorage.getItem(STORAGE_KEY);
// const savedDataObject = JSON.parse(savedData);
// console.log(savedData);

const goToCheckOutBtnEl = basketEl.querySelector(
  '.basket-modal__to-payment-btn'
);

if (shoppingCart.items.length <= 0) {
  goToCheckOutBtnEl.classList.add('buy-btn--disabled');
  goToCheckOutBtnEl.disabled = true;
} else {
  goToCheckOutBtnEl.classList.remove('buy-btn--disabled');
  goToCheckOutBtnEl.disabled = false;
}

const emptyTextEl = basketEl.querySelector('.basket-modal__empty');

export function addItemToShoppingCart(item) {
  emptyTextEl.classList.add('visually-hidden');
  goToCheckOutBtnEl.classList.remove('buy-btn--disabled');
  goToCheckOutBtnEl.disabled = false;
  const basketCardMarkUp = createShoppingCart(item);
  const shoppingCartCardsEl = document.querySelector(
    '.basket-modal__card-list'
  );
  shoppingCartCardsEl.insertAdjacentHTML('beforeend', basketCardMarkUp);
  shoppingCart.items.push(item);
  //   console.dir(shoppingCart);
  const quantityInputEl = document.querySelectorAll('.basket-card__input');
  console.log(quantityInputEl);

  quantityInputEl.forEach(input =>
    input.addEventListener('change', onQuantityInputChange)
  );

  function onQuantityInputChange(event) {
    const selectedProduct = getSelectedItem(event);
    console.log(event.target);
    if (event.target.dataset.id === selectedProduct.id) {
      console.log(selectedProduct);
      selectedProduct.quantity = event.target.value;
      selectedProduct.total = (
        selectedProduct.quantity * parseFloat(selectedProduct.newPrice)
      ).toFixed(2);
      const itemTotal = document.querySelectorAll('.basket-card__new-price');
      const itemOldTotal = document.querySelectorAll('.basket-card__old-price');
      const displayCartTotal = document.querySelector('.basket-modal__value');

      itemTotal.forEach(value => {
        if (value.dataset.id === selectedProduct.id) {
          let total = selectedProduct.total;
          value.textContent = `${total} USD`;
        }
      });

      itemOldTotal.forEach(value => {
        if (value.dataset.id === selectedProduct.id) {
          let totalWithoutDiscount = selectedProduct.oldTotal;
          if (totalWithoutDiscount) {
            value.textContent = `${totalWithoutDiscount}`;
          } else {
            value.textContent = '';
          }
        }
      });
      displayCartTotal.textContent = shoppingCart.countTotal() + ' ' + 'USD';
    }
  }
}

// const basketCardsMarkUp = createShoppingCart(shoppingCart);
// const shoppingCartCardsEl = document.querySelector('.basket-modal__card-list');
// shoppingCartCardsEl.insertAdjacentHTML('afterbegin', basketCardsMarkUp);

function createShoppingCart({
  id,
  title,
  description,
  oldPrice,
  newPrice,
  discount,
  link,
  img,
  freshness,
  farm,
  quantity,
  total,
  oldTotal,
  measure,
  rating,
}) {
  return `<li class="basket-modal__card-wrapper basket-card">
<div class="basket-card__img-wrapper">
<img class="image-display basket-card__image" src="${img}" alt="${title}" width="100" height="67"/>
<ul class="list-general basket-card__controls-list">
<li class="list-general basket-card__controls-item">
<button class="basket-card__controls-btn">
<svg class="basket-card__controls-icon"  aria-label="add to favourite items" viewBox="0 0 35 32">
<path stroke-linejoin="bevel" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M19.083 6.52c1.237-1.281 2.969-2.076 4.887-2.076 3.75 0 6.789 3.040 6.789 6.789 0 1.918-0.795 3.65-2.074 4.885l-0.002 0.002-1.749 1.747-9.6 9.6-11.347-11.347c-1.177-1.219-1.903-2.882-1.903-4.713 0-3.75 3.040-6.789 6.789-6.789 1.832 0 3.494 0.725 4.715 1.904l-0.002-0.002 1.747 1.747 1.747-1.747z"></path>
</svg>
Wishlist
</button>
</li>
<li class="list-general basket-card__controls-item">
<button class="basket-card__controls-btn">
<svg class="basket-card__controls-icon"  aria-label="compare with other items"  viewBox="0 0 35 32">
<title>compare</title>
<path stroke-linejoin="bevel" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M14 2.667h-5.333c-1.473 0-2.667 1.194-2.667 2.667v0 5.333c0 1.473 1.194 2.667 2.667 2.667v0h5.333c1.473 0 2.667-1.194 2.667-2.667v0-5.333c0-1.473-1.194-2.667-2.667-2.667v0zM14 18.667h-5.333c-1.473 0-2.667 1.194-2.667 2.667v0 5.333c0 1.473 1.194 2.667 2.667 2.667v0h5.333c1.473 0 2.667-1.194 2.667-2.667v0-5.333c0-1.473-1.194-2.667-2.667-2.667v0zM28.667 21.333h-8M26 26.667h-5.333M26 10.667h-5.333M28.667 5.333h-8"></path>
</svg>
Compare
</button>
</li>
<li class="list-general basket-card__controls-item">
<button class="basket-card__controls-btn">
<svg class="basket-card__controls-icon" aria-label="remove from basket" viewBox="0 0 35 32">
<path stroke-linejoin="bevel" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667"  d="M25.813 24.48l-16.96-16.96M25.813 7.52l-16.96 16.96"></path>
</svg>
Remove
</button>
</li>
</ul>
</div>
<div class="basket-card__data-wrapper">
<p class="basket-card__data-title">${title}</p>
<p class="basket-card__data-property">Farm:<span class="basket-card__data-value data-farm">${farm}</span></p>
<p class="basket-card__data-property">Freshness:<span class="basket-card__data-value data-freshness">${freshness} day(s) old</span></p>
<div class="basket-card__data-rating">
<svg class="basket-card__data-rating-icon"viewBox="0 0 34 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
<svg class="basket-card__data-rating-icon"viewBox="0 0 34 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
<svg class="basket-card__data-rating-icon"viewBox="0 0 34 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
<svg class="basket-card__data-rating-icon"viewBox="0 0 34 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
<svg class="basket-card__data-rating-icon"viewBox="0 0 34 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
</div>
<div class="basket-card__price-wrapper">
<div class="basket-card__price">
<p class="basket-card__new-price" data-id="${id}">${total} USD</p>
<p class="basket-card__old-price" data-id="${id}">${oldTotal}</p>
</div>
<div class="basket-card__input-wrapper">
<input autocomplete="off" type="number" required max="20" min="1" maxlength="2" name="item-quantity" placeholder="" class="basket-card__input" data-id="${id}" value="${quantity}">
<div class="basket-card__select-wrapper">
<select name="categories" class="basket-card__select">
<option value="pcs" selected class="basket-card__select-option">Pcs</option>
<option value="rack" disabled class="basket-card__select-option">Rack</option>
</div>
</div>
</div>
</div>
</li>`;
}

const shoppingCartBtnEl = document.querySelector('.basket');
shoppingCartBtnEl.addEventListener('click', onShoppingCardBtnClick);

const basketCloseBtnEl = basketEl.querySelector('.basket-modal__close-btn');
basketCloseBtnEl.addEventListener('click', onBasketCloseBtnClick);

function onShoppingCardBtnClick(event) {
  basketEl.classList.remove('is-hidden');
}

function onBasketCloseBtnClick() {
  basketEl.classList.add('is-hidden');
}

export const basketIndicatorEl = document.querySelector('.controls__indicator');
basketIndicatorEl.textContent = shoppingCart.items.length;

const continueShoppingBtnEl = basketEl.querySelector(
  '.basket-modal__continue-btn'
);

continueShoppingBtnEl.addEventListener('click', onContinueBtnClick);

function onContinueBtnClick() {
  basketEl.classList.add('is-hidden');
}
