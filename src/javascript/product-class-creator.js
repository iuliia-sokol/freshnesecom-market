import { productsData } from './data/items-data';
import { v5 as uuidv5 } from 'uuid';

class Product {
  constructor({
    id = 0,
    title = 'Product title',
    description = 'Space for a small product description',
    newPrice,
    oldPrice,
    link = '#',
    img = '#',
    srcset = '#',
    tags = [],
    category = '',
    isOnSale = false,
    isBestSeller = false,
  }) {
    this.id = this.generateId(title);
    this.title = title;
    this.description = description;
    this.newPrice = this.addCurrency(newPrice);
    this.oldPrice = this.addCurrency(oldPrice);
    this.discount = this.countDiscount();
    this.link = link;
    this.img = img;
    this.srcset = srcset;
    this.tags = tags;
    this.category = category;
    this.isOnSale = isOnSale;
    this.isBestSeller = isBestSeller;
  }

  generateId(string) {
    const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    let idFromString = uuidv5(string, MY_NAMESPACE);
    return idFromString.slice(0, 8);
  }

  addCurrency(price) {
    if (price) {
      return `${price} USD`;
    }
    return price;
  }

  countDiscount() {
    let oldPrice = parseFloat(this.oldPrice);
    let newPrice = parseFloat(this.newPrice);
    if (oldPrice && newPrice) {
      let discount = Math.round(((newPrice - oldPrice) / oldPrice) * 100);
      return `${discount}%`;
    }
    return '';
  }
}

export const allProducts = productsData.map(item => new Product(item));
// console.dir(newArr);
