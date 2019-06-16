/**
 * Custom logging, able to enable/disable based on global variable
 */
export function log() {
  if (Mickoin.debug) {
    for (let i = 0; i < arguments.length; i++) {
      // Check to see if log starts with string with ':', '!' or '*' at the beginning.
      // If so, style the label as a notice/warning/success
      if (i === 0) {
        if (arguments[i][0] === ':') {
          console.log("%c"+arguments[i], "padding: 2px 5px; background: #0086cb; color: #FFFFFF");
        } else if (arguments[i][0] === '!') {
          console.log("%c"+arguments[i], "padding: 2px 5px; background: #b50000; color: #ffffff");
        } else if (arguments[i][0] === '*') {
          console.log("%c"+arguments[i], "padding: 2px 5px; background: #1b8a38; color: #FFFFFF");
        } else {
          console.log(arguments[i]);
        }
      } else {
        console.log(arguments[i]);
      }
    }
  }
}

/**
 * Round a number by a given number of decimal places
 * @param {Number} num Number to round
 * @param {Number} scale How many decimal places to round number to
 */
export function roundNumber(num, scale) {
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
}

/**
 * Shortcut function to add an event listener.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param {String} event -The event type.
 * @param {Node} elem - The element to attach the event to (optional, defaults to window).
 * @param {Function} callback - The callback to run on the event.
 * @param {Boolean} capture - If true, forces bubbling on non-bubbling events.
 */
export function on(event, elem = window, callback, capture = false) {

  /**
   * If only a string is passed into the element parameter.
   */
  if (typeof elem === 'string') {
    document.querySelector(elem).addEventListener(event, callback, capture);
    return;
  }

  /**
   * If an element is not defined in parameters, then shift callback across.
   */
  if (typeof elem === 'function') {
    window.addEventListener(event, elem);
    return;
  }

  /**
   * Default listener.
   */
  elem.addEventListener(event, callback, capture);
}

/**
 * Calculate the tax on a given purchase / sale.
 * @TODO: This will not work, still using old style var 'Main.options'
 * @param {Number} value Amount that needs to be calculated
 * @param {String} transactionType string to determine whether it's a buy or sell
 */
export function calculateTax(value, transactionType) {
  if (transactionType === 'buy') {
    value *= Main.options.buyRate;
  } else if (transactionType === 'sell') {
    value *= Main.options.sellRate;
  }

  return value;
}

/**
 * Capitalise the first letter of a string.
 * @param {String} string String to parse
 */
export function toSentenceCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}