import { productsData } from '././data/items-data';

export function generateId(products) {
  let counter = 0;
  for (product of products) {
    counter++;
    product.id = counter.toString();
  }
  return products;
}

export function addCurrency(products) {
  for (product of products) {
    let oldPrice = product.oldPrice;
    let newPrice = product.newPrice;
    if (oldPrice) {
      product.newPrice = `${newPrice} USD`;
      product.oldPrice = `${oldPrice} USD`;
    }
    product.newPrice = `${newPrice} USD`;
  }
  return products;
}

export function countDiscount(products) {
  for (product of products) {
    let oldPrice = parseFloat(product.oldPrice);
    let newPrice = parseFloat(product.newPrice);
    if (oldPrice && newPrice) {
      let discount = Math.round(((newPrice - oldPrice) / oldPrice) * 100);
      product.discount = `${discount}%`;
    }
  }
  return products;
}

export function modifyData(products) {
  generateId(products);
  addCurrency(products);
  countDiscount(products);
  return products;
}

// console.log(productsData);

export const productsDataCopy = [...productsData];
export const allProducts = modifyData(productsDataCopy);

// const productsDataWithID = generateId(productsDataCopy);
// const productsWithCurrency = addCurrency(productsDataWithID);
// export const allProducts = countDiscount(productsDataWithID);
