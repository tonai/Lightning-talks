(function(MD){
  var DESKTOP_LAST_URL_PART = 'adaptive-design-desktop.html';
  var TABLET_LAST_URL_PART = 'adaptive-design-tablet.html';
  var MOBILE_LAST_URL_PART = 'adaptive-design-mobile.html';

  var urlParts = window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1);
  var lastUrlPart = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  var md = new MD(window.navigator.userAgent);

  if (md.phone()) {
    // Mobile case.
    if (lastUrlPart !== MOBILE_LAST_URL_PART) {
      window.location = urlParts + MOBILE_LAST_URL_PART;
    }
  } else if (md.tablet()) {
    // Tablet case.
    if (lastUrlPart !== TABLET_LAST_URL_PART) {
      window.location = urlParts + TABLET_LAST_URL_PART;
    }
  } else {
    // Desktop case.
    if (lastUrlPart !== DESKTOP_LAST_URL_PART) {
      window.location = urlParts + DESKTOP_LAST_URL_PART;
    }
  }
})(MobileDetect);

