import { saleItems } from './data/sale-cards-items';

const cardsEl = document.getElementById('sale-cards');

const cardsMarkUp = createGallery(saleItems);

cardsEl.insertAdjacentHTML('afterbegin', cardsMarkUp);

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
<li class="cards__item cards__item--quatro">
<article class="product">
<div class="product__thumb">
<a href="" class="links-general product__link">
<div class="product__img-wrapper">
<span class="product__discount animate__animated animate__heartBeat"
>${discount}</span>
 <img class="product__image"
  srcset="${srcset}"
  src="${img}"
  data-source="${img}"
  loading="lazy"
  alt="${title}"
  width="237"
  height="180" />
</div>
 <h3 class="product__title">${title}</h3>
</a>
<p class="product__description">${description}</p>
<div class="product__price-tag">
<div class="product__price-wrapper">
<p class="product__new-price">${newPrice}</p>
<p class="product__old-price">${oldPrice}</p>
</div>
<button type="button" class="buy-btn">Buy now</button>
</div>
</div>
</article>
</li>
      `;
      }
    )
    .join('');
}

// let lightbox = new SimpleLightbox('.gallery a', {
//   captions: true,
//   captionPosition: 'bottom',
//   captionSelector: 'img',
//   captionType: 'attr',
//   captionsData: 'alt',
//   captionDelay: 250,
// });

{
  /* <li class="cards__item cards__item--quatro">
<article class="product">
<div class="product__thumb">
<a href="" class="links-general product__link">
<div class="product__img-wrapper">
<div class="product__discount animate__animated animate__heartBeat">- 50 %</div>
</div>
<h3 class="product__title">Product Title</h3>
</a>
<p class="product__description">Space for a small product description
</p>
<div class="product__price-tag">
<div class="product__price-wrapper">
<p class="product__new-price">5 USD</p>
<p class="product__old-price">10 USD</p>
</div>
<button type="button" class="buy-btn">Buy now</button>
</div>
</div>
</article>
</li> */
}