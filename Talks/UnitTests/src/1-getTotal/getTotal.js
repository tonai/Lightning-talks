export default function getTotal(cart) {
  return cart
    .map(item => item.price * item.qty)
    .reduce((a, b) => a + b, 0);
}
