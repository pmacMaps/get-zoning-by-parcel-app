// import modules
import 'bootstrap';
import './ui.js';
import { webmap } from './webmap.js';
import { zoomHomeControl, fullscreenControl, locateControl } from './map-controls.js';
import { SearchControl } from './search-control.js';
import { imagery2020, roadsMunicipality } from './ref-layers.js';
import { taxParcelsFS } from './parcels_layer.js'
import { geoJSON } from 'leaflet';
import { processLoadEvent } from './map-functions.js';
import 'esri-leaflet-renderers';

// add map controls
zoomHomeControl.addTo(webmap);
fullscreenControl.addTo(webmap);
locateControl.addTo(webmap);
SearchControl.addTo(webmap);

const refLayers = [imagery2020, roadsMunicipality, taxParcelsFS];
// call load/error events function on layers
refLayers.forEach(element => processLoadEvent(element));
// add layers to map
refLayers.forEach(element => element.addTo(webmap));

// Container for selected parel
export const taxParcel =  geoJSON(null, {pane: 'parcelsSearch'}).addTo(webmap);