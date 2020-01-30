function rand() {
  return random(-1, 1)
}

function random(from, to) {
  return Math.random() * (to - from) + from;
}

function sigmoid(x) {
  return 1 / ( 1 + Math.exp(-x) );
}

function sigmoidPrime(x) {
  return sigmoid(x) * ( 1 - sigmoid(x) );
}

function convertToDecimal(hex) {
  hex = hex.slice(1);
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return [r, g, b];
}

function convertToHex(input) {
  const hex = [];
  hex[0] = Math.round(input[0] * 255).toString(16).padStart(2, '0');
  hex[1] = Math.round(input[1] * 255).toString(16).padStart(2, '0');
  hex[2] = Math.round(input[2] * 255).toString(16).padStart(2, '0');
  return hex.join('');
}
