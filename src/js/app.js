import { webmap } from './webmap.js';
import { zoomHomeControl, fullscreenControl, locateControl } from './map-controls.js';
import { imagery2020, roadsMunicipality } from './ref-layers.js';

console.log('js file loaded');

zoomHomeControl.addTo(webmap);
fullscreenControl.addTo(webmap);
locateControl.addTo(webmap);

// TODO: run through function to check for service loading
// TODO: run through function to add to map
imagery2020.addTo(webmap);
roadsMunicipality.addTo(webmap);