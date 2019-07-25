export default {
  getCart() {
    return fetch('/api/cart').then(res => res.json());
  }
};
