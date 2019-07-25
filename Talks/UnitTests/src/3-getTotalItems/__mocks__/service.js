export default {
  getCart() {
    return Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]);
  }
};