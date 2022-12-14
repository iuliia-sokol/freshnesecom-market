import { allProducts, getSelectedItem } from './product-class-creator';

export const refs = {
  shoppingCartBtnEl: document.querySelector('.basket'),
  basketEl: document.querySelector('.basket-modal'),
  emptyTextEl: document.querySelector('.basket-modal__empty'),
  shoppingCartCardsEl: document.querySelector('.basket-modal__card-list'),
  goToCheckOutBtnEl: document.querySelector('.basket-modal__to-payment-btn'),
  continueShoppingBtnEl: document.querySelector('.basket-modal__continue-btn'),
  basketCloseBtnEl: document.querySelector('.basket-modal__close-btn'),
  basketIndicatorEl: document.querySelector('.controls__indicator'),
  displayCartTotal: document.querySelector('.basket-modal__value'),
};

export const shoppingCart = {
  items: [],
  total: 0,

  _STORAGE_KEY: 'shopping-cart',

  createShoppingCartItemMarkUp({
    id,
    title,
    img,
    freshness,
    farm,
    quantity,
    total,
    oldTotal,
  }) {
    return `<li class="basket-modal__card-wrapper basket-card" data-id="${id}">
<div class="basket-card__img-wrapper">
<img class="image-display basket-card__image" src="${img}" alt="${title}" width="100" height="67"/>
<ul class="list-general basket-card__controls-list">
<li class="list-general basket-card__controls-item">
<button class="basket-card__controls-btn add-to-favs-btn" data-id="${id}">
<svg class="basket-card__controls-icon"  aria-label="add to favourite items" viewBox="0 0 35 32">
<path stroke-linejoin="bevel" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M19.083 6.52c1.237-1.281 2.969-2.076 4.887-2.076 3.75 0 6.789 3.040 6.789 6.789 0 1.918-0.795 3.65-2.074 4.885l-0.002 0.002-1.749 1.747-9.6 9.6-11.347-11.347c-1.177-1.219-1.903-2.882-1.903-4.713 0-3.75 3.040-6.789 6.789-6.789 1.832 0 3.494 0.725 4.715 1.904l-0.002-0.002 1.747 1.747 1.747-1.747z"></path>
</svg>
Wishlist
</button>
</li>
<li class="list-general basket-card__controls-item">
<button class="basket-card__controls-btn compare-btn" data-id="${id}">
<svg class="basket-card__controls-icon"  aria-label="compare with other items"  viewBox="0 0 35 32">
<title>compare</title>
<path stroke-linejoin="bevel" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M14 2.667h-5.333c-1.473 0-2.667 1.194-2.667 2.667v0 5.333c0 1.473 1.194 2.667 2.667 2.667v0h5.333c1.473 0 2.667-1.194 2.667-2.667v0-5.333c0-1.473-1.194-2.667-2.667-2.667v0zM14 18.667h-5.333c-1.473 0-2.667 1.194-2.667 2.667v0 5.333c0 1.473 1.194 2.667 2.667 2.667v0h5.333c1.473 0 2.667-1.194 2.667-2.667v0-5.333c0-1.473-1.194-2.667-2.667-2.667v0zM28.667 21.333h-8M26 26.667h-5.333M26 10.667h-5.333M28.667 5.333h-8"></path>
</svg>
Compare
</button>
</li>
<li class="list-general basket-card__controls-item">
<button class="basket-card__controls-btn remove-btn" data-id="${id}">
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
<ul class="list-general basket-card__data-rating">
<li>
<svg class="basket-card__data-rating-icon" viewBox="0 0 34 32" data-id="${id}">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
</li>
<li>
<svg class="basket-card__data-rating-icon" viewBox="0 0 34 32" data-id="${id}">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
</li>
<li>
<svg class="basket-card__data-rating-icon" viewBox="0 0 34 32" data-id="${id}">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
</li>
<li>
<svg class="basket-card__data-rating-icon" viewBox="0 0 34 32" data-id="${id}">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
</li>
<li>
<svg class="basket-card__data-rating-icon" viewBox="0 0 34 32" data-id="${id}">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3" d="M15.668 4.254c0.19-0.588 0.733-1.006 1.373-1.006s1.183 0.418 1.37 0.996l0.003 0.010 2.48 7.626h8c0.016-0.001 0.034-0.001 0.052-0.001 0.803 0 1.454 0.651 1.454 1.454 0 0.504-0.257 0.949-0.647 1.21l-0.005 0.003-6.494 4.708 2.48 7.64c0.047 0.136 0.075 0.294 0.075 0.457 0 0.795-0.645 1.44-1.44 1.44-0.324 0-0.624-0.107-0.864-0.288l0.004 0.003-6.506-4.76-6.494 4.72c-0.237 0.178-0.536 0.285-0.861 0.285-0.795 0-1.44-0.645-1.44-1.44 0-0.164 0.027-0.321 0.078-0.468l-0.003 0.010 2.48-7.64-6.494-4.708c-0.395-0.264-0.652-0.709-0.652-1.213 0-0.803 0.651-1.454 1.454-1.454 0.018 0 0.037 0 0.055 0.001l-0.003-0h8l2.546-7.586z"></path>
</svg>
</li>
</ul>
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
  },

  insertItemToShoppingCart(markUp) {
    refs.shoppingCartCardsEl.insertAdjacentHTML('beforeend', markUp);
  },

  goToCheckOutBtnCheck() {
    if (shoppingCart.items.length <= 0) {
      refs.goToCheckOutBtnEl.classList.add('buy-btn--disabled');
      refs.goToCheckOutBtnEl.disabled = true;
    } else {
      refs.goToCheckOutBtnEl.classList.remove('buy-btn--disabled');
      refs.goToCheckOutBtnEl.disabled = false;
    }
  },

  addItemToShoppingCart(item) {
    refs.emptyTextEl.classList.add('visually-hidden');
    refs.goToCheckOutBtnEl.classList.remove('buy-btn--disabled');
    refs.goToCheckOutBtnEl.disabled = false;

    const basketCardMarkUp = shoppingCart.createShoppingCartItemMarkUp(item);
    this.insertItemToShoppingCart(basketCardMarkUp);
    this.items.push(item);

    this.displayRating(item);
    this.addItemToWishList(item);
    this.addToCompareList(item);
    this.removeItemFromShoppingCart(item);

    const quantityInputEl = document.querySelectorAll('.basket-card__input');
    quantityInputEl.forEach(input =>
      input.addEventListener('change', shoppingCart.onQuantityInputChange)
    );

    refs.basketIndicatorEl.textContent = shoppingCart.items.length;
    refs.displayCartTotal.textContent = shoppingCart.countTotal() + ' ' + 'USD';
  },

  addItemToWishList(item) {
    const addToFavsBtnEl = document.querySelectorAll('.add-to-favs-btn');
    addToFavsBtnEl.forEach(btn => {
      btn.addEventListener('click', event => {
        let favIcon = event.currentTarget.children[0];
        if (event.currentTarget.dataset.id === item.id) {
          favIcon.classList.toggle('basket-card__controls-icon--active');
        }
        if (favIcon.classList.contains('basket-card__controls-icon--active')) {
          favIcon.nextSibling.textContent = '\nIn wishlist\n';
        } else {
          favIcon.nextSibling.textContent = '\nWishlist\n';
        }
      });
    });
  },

  addToCompareList(item) {
    const addToFavsBtnEl = document.querySelectorAll('.compare-btn');
    addToFavsBtnEl.forEach(btn => {
      btn.addEventListener('click', event => {
        let favIcon = event.currentTarget.children[0];
        if (event.currentTarget.dataset.id === item.id) {
          favIcon.classList.toggle('basket-card__controls-icon--active');
        }
        if (favIcon.classList.contains('basket-card__controls-icon--active')) {
          favIcon.nextSibling.textContent = '\nCompared\n';
        } else {
          favIcon.nextSibling.textContent = '\nCompare\n';
        }
      });
    });
  },

  removeItemFromShoppingCart(item) {
    const removeBtnEl = document.querySelectorAll('.remove-btn');
    const basketItemsEl = document.querySelectorAll('.basket-card');
    removeBtnEl.forEach(btn => {
      btn.addEventListener('click', event => {
        if (event.currentTarget.dataset.id === item.id) {
          let itemIndex = this.items.indexOf(item);
          let itemsNodelistArray = [...basketItemsEl].map(el => el);
          let itemToRemoveEl = itemsNodelistArray.find(
            el => el.dataset.id === item.id
          );
          itemToRemoveEl.remove();
          this.items.splice(itemIndex, 1);
          item.quantity = 1;
          refs.basketIndicatorEl.textContent = this.items.length;
          refs.displayCartTotal.textContent = this.countTotal() + ' ' + 'USD';
          this.setShoppingCart(shoppingCart);
          return shoppingCart;
        }
      });
    });
  },

  displayRating(item) {
    const ratingEl = document.querySelectorAll(
      '.basket-card__data-rating-icon'
    );
    let rating = +item.rating;

    let ratingNodelistArray = [...ratingEl].map(item => item);

    let selectedItemRatingEls = ratingNodelistArray.filter(
      el => el.dataset.id === item.id
    );

    for (let i = 0; i < rating; i++) {
      selectedItemRatingEls[i].classList.add(
        'basket-card__data-rating-icon--active'
      );
    }
    return;
  },

  displayPrice(selectedProduct) {
    const itemTotal = document.querySelectorAll('.basket-card__new-price');
    const itemOldTotal = document.querySelectorAll('.basket-card__old-price');

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
  },

  countSelectedItemTotal(selectedProduct) {
    selectedProduct.total = (
      selectedProduct.quantity * parseFloat(selectedProduct.newPrice)
    ).toFixed(2);

    if (selectedProduct.oldPrice) {
      selectedProduct.oldTotal =
        (
          selectedProduct.quantity * parseFloat(selectedProduct.oldPrice)
        ).toFixed(2) +
        ' ' +
        'USD';
    } else {
      selectedProduct.oldTotal = '';
    }
  },

  onQuantityInputChange(event) {
    const selectedProduct = getSelectedItem(event, allProducts);
    if (event.target.dataset.id === selectedProduct.id) {
      selectedProduct.quantity = event.target.value;
      shoppingCart.countSelectedItemTotal(selectedProduct);
      shoppingCart.displayPrice(selectedProduct);
    }
    refs.displayCartTotal.textContent = shoppingCart.countTotal() + ' ' + 'USD';
  },

  countTotal() {
    const shoppingCartItemsTotal = this.items.map(item => +item.total);
    if (this.items.length <= 0) {
      refs.emptyTextEl.classList.toggle('visually-hidden');
      this.total = 0;
      return this.total;
    }
    this.total = shoppingCartItemsTotal
      .reduce((acc, currentValue) => acc + currentValue)
      .toFixed(2);
    return this.total;
  },

  setShoppingCart(obj) {
    {
      localStorage.setItem(this._STORAGE_KEY, JSON.stringify(obj));
    }
  },
};

shoppingCart.goToCheckOutBtnCheck();

refs.shoppingCartBtnEl.addEventListener('click', onShoppingCardBtnClick);
refs.basketCloseBtnEl.addEventListener('click', onBasketCloseBtnClick);
refs.continueShoppingBtnEl.addEventListener('click', onContinueBtnClick);

function onShoppingCardBtnClick(event) {
  refs.basketEl.classList.remove('is-hidden');
}

function onBasketCloseBtnClick() {
  refs.basketEl.classList.add('is-hidden');
}

function onContinueBtnClick() {
  refs.basketEl.classList.add('is-hidden');
}

// const savedData = localStorage.getItem(STORAGE_KEY);
// const savedDataObject = JSON.parse(savedData);
// console.log(savedData);

// const basketCardsMarkUp = createShoppingCart(shoppingCart);
// const shoppingCartCardsEl = document.querySelector('.basket-modal__card-list');
// shoppingCartCardsEl.insertAdjacentHTML('afterbegin', basketCardsMarkUp);
