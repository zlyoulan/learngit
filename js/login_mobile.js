(function() {
  function isMobile() {
    if (/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/ig.test(navigator.userAgent.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  if (isMobile()) {
    var tmpHtml = "<meta name='viewport' content='width=device-width, initial-scale=1'><link rel='stylesheet' href='./css/login_mobile.css'>";
    $("head").eq(0).append(tmpHtml);
  }
})();