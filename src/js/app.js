import { webmap } from './webmap.js';
import { zoomHomeControl, fullscreenControl, locateControl } from './map-controls.js';

console.log('js file loaded');

zoomHomeControl.addTo(webmap);
fullscreenControl.addTo(webmap);
locateControl.addTo(webmap);

