var R = require('ramda');

function convertLinks(input) {
  var pattern = /\[([^\]]*)\]\(([^\)]*)\)/i;
  return input.replace(pattern, '<a href="$2">$1</a>');
}

function convertParagraph(input) {
  var pattern = /([\n]{2,})/ig;
  return input.replace(pattern, '</p><p>');
}

function convertLineBreak(input) {
  var pattern = /(\n)/ig;
  return input.replace(pattern, '<br/>');
}

function wrapWithTag(tag, text) {
  return '</' + tag + '>' + text + '<' + tag + '>';
}
wrapWithTag = R.curry(wrapWithTag);

var input = `Functional programming

A lightning talk explaining the concept of functional programming in JavaScript.
Written by tony Cabaye.

Support is available [here](https://github.com/tonai/Lightning-talks)`;

var wrapWithParagraph = wrapWithTag('p');
var processSimpleMarkdown = R.compose(wrapWithParagraph, convertLineBreak, convertParagraph, convertLinks);
// OR
var processSimpleMarkdown = R.pipe(convertLinks, convertParagraph, convertLineBreak, wrapWithParagraph);

var output = processSimpleMarkdown(input);

console.log(output);
