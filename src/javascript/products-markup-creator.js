import { allProducts } from './products-data-editor';
import debounce from 'lodash.debounce';

export const onSaleCardsEl = document.getElementById('sale-cards');
export const farmProductsCardsEl = document.getElementById('farm-cards');
export const bestSellersCardsEl = document.getElementById('best-sellers-cards');

bestSellersCardsEl.addEventListener('mouseleave', debounce(shiftItems, 5000));
farmProductsCardsEl.addEventListener('mouseleave', debounce(shiftItems, 4000));
onSaleCardsEl.addEventListener('mouseleave', debounce(shiftItems, 3000));

function shiftItems(event) {
  let productList = event.target;
  let productCards = event.target.children;
  for (let i = productCards.length; i >= 0; i--) {
    productList.appendChild(productCards[(Math.random() * i) | 0]);
  }
}

const onSaleCardsMarkUp = createGallery(
  allProducts.filter(item => item.isOnSale)
);

const farmProductsCardsMarkUp = createGallery(
  allProducts.filter(item => item.tags.includes('farm-products'))
);
const bestSellersCardsMarkUp = createGallery(
  allProducts.filter(item => item.isBestSeller)
);

onSaleCardsEl.insertAdjacentHTML('afterbegin', onSaleCardsMarkUp);
farmProductsCardsEl.insertAdjacentHTML('afterbegin', farmProductsCardsMarkUp);
bestSellersCardsEl.insertAdjacentHTML('afterbegin', bestSellersCardsMarkUp);

const onSaleItemsEl = onSaleCardsEl.children;
onSaleItemsElAddClass(onSaleItemsEl);

function onSaleItemsElAddClass(items) {
  for (let item of items) {
    item.classList.add('cards__item--quatro');
  }
}

function createGallery(items) {
  return items
    .map(
      ({
        title,
        description,
        oldPrice,
        newPrice,
        discount,
        link,
        img,
        srcset,
      }) => {
        return `
<li class="cards__item">
<article class="product"
data-img="${img}" 
data-srcset="${srcset}" 
data-title="${title}" 
data-description="${description}" 
data-old-price="${oldPrice}"
data-new-price="${newPrice}"
data-discount="${discount}"
data-link="${link}">
<div class="product__thumb">
<div class="product__img-wrapper">
<span class="product__discount animate__animated animate__heartBeat"
>${discount}</span>
 <img class="product__image"
  srcset="${srcset}"
  src="${img}"
  data-source="${img}"
  loading="lazy"
  rel="noopener noreferrer nofollow"
  alt="${title}"
  width="237"
  height="180" 
    data-description="${description}"
  data-old-price="${oldPrice}"
  data-new-price="${newPrice}"
  data-discount='${discount}'/>
</div>
<a href="${link}" class="links-general product__link">
 <h3 class="product__title">${title}</h3>
<p class="product__description">${description}</p>
</a>
<div class="product__price-tag">
<div class="product__price-wrapper">
<p class="product__new-price">${newPrice}</p>
<p class="product__old-price">${oldPrice}</p>
</div>
<button type="button" class="buy-btn product__buy-btn">Buy now</button>
</div>
</div>
</article>
</li>
      `;
      }
    )
    .join('');
}
