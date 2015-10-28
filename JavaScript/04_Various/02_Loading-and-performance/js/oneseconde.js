var totalSeconds = totalSeconds || 0;
(function() {
  var start = Date.now();
  while (Date.now() - start < 1000) {}
  totalSeconds++;
  console.log(totalSeconds + ' seconde elapsed');
})();

