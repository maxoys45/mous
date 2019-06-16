const funcs = {
  roundNumber: function(num, scale) {
    if(!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
  },

  calculateTax: function(value, type) {
    if (type === 'buy') {
      value *= Main.options.buyRate;
    } else if (type === 'sell') {
      value *= Main.options.sellRate;
    }

    return value;
  },

  toggleClassTransitionEnd: function(element, cssClass) {
    element.addEventListener('transitionend', () => {
      element.classList.toggle(cssClass);
    });
  },
};

module.exports = funcs;