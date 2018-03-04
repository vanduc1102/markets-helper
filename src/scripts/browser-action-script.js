'use strict';

main();

function main() {
  let currentUrl = window.location.href;
  if (currentUrl.indexOf('markets.com') === -1 || !currentUrl) {
    window.location.href = 'http://markets.com/';
  }
}

