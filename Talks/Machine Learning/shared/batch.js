const { body } = document;

const batchContainer = document.createElement('div');
body.appendChild(batchContainer);

const batchInput = document.createElement('input');
batchContainer.appendChild(batchInput);

const batchButton = document.createElement('button');
batchContainer.appendChild(batchButton);
const batchButtonText = document.createTextNode('Batch train');
batchButton.appendChild(batchButtonText);

const batchCheckboxLabel = document.createElement('label');
batchContainer.appendChild(batchCheckboxLabel);

const batchCheckboxText = document.createTextNode('Animate');
batchCheckboxLabel.appendChild(batchCheckboxText);

const batchCheckbox = document.createElement('input');
batchCheckbox.setAttribute('type', 'checkbox');
batchCheckboxLabel.appendChild(batchCheckbox);

let batchAnimate = false;
let batchValue;
let batchCount = 0;

function batch() {
  if (batchCount === 0) {
    batchAnimate = batchCheckbox.checked;
    batchValue = Number(batchInput.value);

    if (batchAnimate) {
      batchCount++;
      requestAnimationFrame(batchLoop);
    } else {
      for (batchCount; batchCount < batchValue; batchCount++) {
        train();
      }
      batchCount = 0;
    }
  }
}

function batchLoop() {
  train();
  if (batchCount < batchValue) {
    batchCount++;
    requestAnimationFrame(batchLoop);
  } else {
    batchCount = 0;
  }
}

batchButton.addEventListener('click', batch);

function draw() {
  if (typeof activations !== 'undefined') {
    drawANN(weights, biases, activations);
  }
}
