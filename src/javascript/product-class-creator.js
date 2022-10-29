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
    quantity,
    isInStock = true,
    inStockCount = 50,
    freshness = 1,
    farm = '',
    rating = 0,
    measure,
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
    this.quantity = quantity;
    this.isInStock = this.checkInStock(inStockCount);
    this.inStockCount = inStockCount;
    this.freshness = freshness;
    this.farm = farm;
    this.oldTotal = this.countPrice(oldPrice);
    this.total = this.countPrice(newPrice);
    this.rating = rating;
    this.measure = measure;
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

  checkInStock(inStockCount) {
    if (inStockCount > 0) {
      return true;
    }
    return false;
  }

  countPrice(price) {
    let priceToCount = parseFloat(price);
    let quantity = this.quantity;
    let total = priceToCount * quantity;
    return total;
  }
}

export const allProducts = productsData.map(item => new Product(item));

// console.dir(allProducts);
// console.table(productsData);

// class ProductToBuy {
//   constructor({
//     id = 0,
//     title = 'Product title',
//     description = 'Space for a small product description',
//     newPrice,
//     oldPrice,
//     discount,
//     link = '#',
//     img = '#',
//     srcset = '#',
//     tags = [],
//     category = '',
//     isOnSale = false,
//     isBestSeller = false,
//     quantity = 1,
//     isInStock = true,
//     inStockCount = 50,
//     freshness = 1,
//     farm = '',
//   }) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.newPrice = newPrice;
//     this.oldPrice = oldPrice;
//     this.discount = discount;
//     this.link = link;
//     this.img = img;
//     this.srcset = srcset;
//     this.tags = tags;
//     this.category = category;
//     this.isOnSale = isOnSale;
//     this.isBestSeller = isBestSeller;
//     this.quantity = quantity;
//     this.isInStock = inStockCount;
//     this.inStockCount = inStockCount;
//     this.freshness = freshness;
//     this.farm = farm;
//     this.total = this.countPrice();
//   }

//   countPrice() {
//     let newPrice = parseFloat(this.newPrice);
//     let quality = this.quantity;
//     let total = newPrice * quality;
//     return total;
//   }
// }
