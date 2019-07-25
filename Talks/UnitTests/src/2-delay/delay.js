export default function delay(callback, timer = 0) {
  return new Promise(resolve => setTimeout(resolve, timer))
    .then(callback);
}
