import 'bootstrap';
import './ui.js';
import { webmap } from './webmap.js';
import { zoomHomeControl, fullscreenControl, locateControl } from './map-controls.js';
import { imagery2020, roadsMunicipality } from './ref-layers.js';
import { processLoadEvent } from './map-functions.js';

// add map controls
zoomHomeControl.addTo(webmap);
fullscreenControl.addTo(webmap);
locateControl.addTo(webmap);

const refLayers = [imagery2020, roadsMunicipality];
// call load/error events function on layers
refLayers.forEach(element => processLoadEvent(element));
// add layers to map
refLayers.forEach(element => element.addTo(webmap));