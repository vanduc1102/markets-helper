'use strict';

(function () {
  function getOptions() {
    return {
      refreshTime: 5000
    };
  }

  function initWatchListView() {
    try {
      let tabBox = document.querySelector('.tab-box');
      let tabletRowEls = tabBox.querySelectorAll('.rows > .row');
      tabletRowEls.forEach((el, index) => {
        if (el.className.indexOf('empty') !== -1) {
          return;
        }
        let cellNameEl = el.querySelector('.cell-instrument-name.instrument-name , .cell-instrument-name-with-change.instrument-name-with-change');
        let sellBtnEl = el.querySelector('button.btn.btn-sell');
        let buyBtnEl = el.querySelector('button.btn.btn-buy');
        if (!sellBtnEl || !buyBtnEl) {
          return;
        }
        let sellPrice = sellBtnEl.closest('.rate-with-button.cell-rate-with-button')
        .querySelector('.change.equally').textContent.trim();

        let buyPrice = buyBtnEl.closest('.rate-with-button.cell-rate-with-button')
        .querySelector('.change.equally').textContent.trim();
        let spreadPrice = Number(buyPrice) - Number(sellPrice);
        let spreadPercent = (spreadPrice / sellPrice) * 100;
        if( spreadPrice != 0 ){
          let spreadAndPrice = '$' + toFixed(spreadPrice) + ' - ' + spreadPercent.toFixed(3) + '%';
          createSpanNode(cellNameEl, spreadAndPrice);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  function createSpanNode(parent, text) {
    let clsHelperPrice = 'markets-helper-price';
    let priceNodeEl = parent.querySelector('.' + clsHelperPrice);
    if (!priceNodeEl) {
      let priceNodeEl = document.createElement('span');
      priceNodeEl.className += clsHelperPrice;
      let node = document.createTextNode(text);
      priceNodeEl.appendChild(node);
      parent.appendChild(priceNodeEl);
    } else if (priceNodeEl.innerHTML !== text) {
      let needUpdateCls = priceNodeEl.innerHTML.trim() > text ? 'need-update-up' : 'need-update-down';
      priceNodeEl.innerHTML = text;
      priceNodeEl.classList.add(needUpdateCls);
      setTimeout(() =>{
        priceNodeEl.classList.remove(needUpdateCls);
      }, 1000, priceNodeEl);
    }
  }

  function toFixed(number) {
    let result;
    if (number > 1000) {
      result = Math.round(number);
    } else if (number > 100) {
      result = number.toFixed(1);
    } else if (number > 10) {
      result = number.toFixed(2);
    } else {
      result = Math.floor(number * 1000) === 0 ? number.toFixed(5) : number.toFixed(3);
    }
    return result;
  }

  function start() {
    let options = getOptions();
    setInterval(initWatchListView, options.refreshTime);
  }

  start();
}());
