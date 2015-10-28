(function() {
  var myScript = document.createElement('script');
  myScript.src = 'js/oneseconde2.js?' + Date.now();
  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(myScript, firstScript);
})();

