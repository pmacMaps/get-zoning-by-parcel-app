import 'leaflet-fullscreen';
import 'leaflet.zoomhome';
import 'leaflet.locatecontrol';
import { homeCoords, initZoom } from './webmap.js';

/*** Zoom Home Control ***/
export const zoomHomeControl = L.Control.zoomHome({
    position: 'topleft',
    zoomHomeTitle: 'Full map extent',
    homeCoordinates: homeCoords,
    homeZoom: initZoom
});

// locate control
export const locateControl = L.control.locate();

// Full Screen Control
export const fullscreenControl = new L.Control.Fullscreen({
    position: 'topleft'
});