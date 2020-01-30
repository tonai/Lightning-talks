const width = 600;
const height = 600;
const padding = 20;
const radius = 20;

function setup() {
  createCanvas(width, height);
}

function drawANN(wLayers, bLayers, aLayers) {
  const numLayers = aLayers.length;
  const maxNeuron = aLayers.reduce((acc, a) => Math.max(acc, a[0].length), -Infinity);
  const maxWeight = wLayers.reduce((acc, weights) =>
    Math.max(acc, weights.reduce((acc, row) =>
      Math.max(acc, row.reduce((acc, weight) => Math.max(acc, Math.abs(weight)), -Infinity))
    , -Infinity))
  , -Infinity);

  const innerWidth = width - 2 * padding - 2 * radius;
  const innerHeight = height - 2 * padding - 2 * radius;
  const widthStep = numLayers > 1 ? innerWidth / (numLayers - 1) : 0;
  const heightStep = maxNeuron > 1 ? innerHeight / (maxNeuron - 1) : 0;

  clear();
  background(51);
  textAlign(CENTER, BOTTOM);

  wLayers.forEach((weights, layerIndex) => {
    weights.forEach((row, neuronIndex0, weights) => {
      const x0 = padding + radius + widthStep * layerIndex;
      const y0 = padding + radius + heightStep * neuronIndex0 + innerHeight / 2 - heightStep * (weights.length - 1) / 2;

      row.forEach((weight, neuronIndex1, row) => {
        const x1 = padding + radius + widthStep * (layerIndex + 1);
        const y1 = padding + radius + heightStep * neuronIndex1 + innerHeight / 2 - heightStep * (row.length - 1) / 2;

        noFill();
        if (weight < 0) {
          stroke(255, 0, 0);
        } else {
          stroke(0, 255, 0);
        }
        strokeWeight(Math.abs(weight) / maxWeight * 10);
        line(x0, y0, x1, y1);
      });
    });
  });

  aLayers.forEach((activations, layerIndex) => {
    activations[0].forEach((activation, neuronIndex, activations) => {
      const x = padding + radius + widthStep * layerIndex;
      const y = padding + radius + heightStep * neuronIndex + innerHeight / 2 - heightStep * (activations.length - 1) / 2;

      fill(activation * 255);
      stroke(255);
      strokeWeight(1);
      ellipse(x, y, 2 * radius, 2 * radius);
    });
  });

  bLayers.forEach((biases, layerIndex) => {
    biases[0].forEach((bias, neuronIndex, biases) => {
      const x = padding + radius + widthStep * (layerIndex + 1);
      const y = padding + radius + heightStep * neuronIndex + innerHeight / 2 - heightStep * (biases.length - 1) / 2;

      fill(255);
      noStroke();
      text(Math.round(bias * 100) / 100, x, y - radius);
    });
  });
}