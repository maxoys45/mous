/**
 * Toggle nav
 * ------------------------------------------------------------------------------
 * Component to toggle mobile navigation.
 *
 * @namespace toggleNav
 */

/**
 * Global variables
 */
const selectors = {
  htmlEl: 'html',
  navToggle: '[js-trigger="nav-toggle"]',
};

let nodes = {};

export default () => {

  /**
   * Cache the node selectors
   */
  function cacheSelectors() {
    nodes = {
      htmlEl: document.querySelector(selectors.htmlEl),
      navToggle: document.querySelectorAll(selectors.navToggle),
    };
  }

  /**
   * Set listeners
   */
  function setListeners() {
    App.EM.on('Nav::toggle', () => {
      toggleMobileNavigation();
    });
  }

  /**
   * Set the click events
   */
  function setClickEvents() {
    // Toggle html class
    [...nodes.navToggle].forEach((btn) => {
      btn.addEventListener('click', () => {
        App.EM.emit('Nav::toggle');
      });
    });
  }

  /**
   * Toggle mobile navigation by adding/removing class
   */
  function toggleMobileNavigation() {
    nodes.htmlEl.classList.toggle('nav-open');
  }

  /**
   * Initialise component
   */
  function init() {
    cacheSelectors();
    setListeners();
    setClickEvents();
  }

  return Object.freeze({
    init,
  });
};