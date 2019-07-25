import service from './service';
export default function getTotalItems() {
  return service.getCart()
    .then(cart => cart.map(item => item.qty))
    .then(countItems => countItems.reduce((a, b) => a + b, 0))
    .catch(error => error.message);
}
