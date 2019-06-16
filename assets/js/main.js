console.clear();

import EventEmitter from 'event-emitter';

import ToggleNav from './components/toggle-nav';
import Slideshow from './components/slideshow';

window.App = window.App || {};
window.App = {
  EM: new EventEmitter(),
};

document.addEventListener("DOMContentLoaded", () => {
  ToggleNav().init();
  Slideshow().init();
});