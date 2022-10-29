// ANOTHER WAY TO HANDLE DATA FOR MARKUP

// import { productsData } from './data/items-data';

// function generateId(products) {
//   let counter = 0;
//   for (let product of products) {
//     counter++;
//     product.id = counter.toString();
//   }
// }

// function addCurrency(products) {
//   for (let product of products) {
//     let oldPrice = product.oldPrice;
//     let newPrice = product.newPrice;
//     if (oldPrice) {
//       product.newPrice = `${newPrice} USD`;
//       product.oldPrice = `${oldPrice} USD`;
//     }
//     if (!oldPrice) {
//       product.newPrice = `${newPrice} USD`;
//     }
//   }
// }

// function countDiscount(products) {
//   for (let product of products) {
//     let oldPrice = parseFloat(product.oldPrice);
//     let newPrice = parseFloat(product.newPrice);
//     if (oldPrice && newPrice) {
//       let discount = Math.round(((newPrice - oldPrice) / oldPrice) * 100);
//       product.discount = `${discount}%`;
//     }
//   }
// }

// function modifyData(products) {
//   generateId(products);
//   addCurrency(products);
//   countDiscount(products);
//   return products;
// }

// export const productsDataCopy = [...productsData];
// export const allProducts = modifyData(productsData);
