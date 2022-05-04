import { map } from 'leaflet';
import { spcPACrs } from './crs.js';
// center coordinates for map
export const homeCoords = [40.15, -77.25];
// initial zoom
export const initZoom = 0;

/*** Map Objects ***/
export const webmap = map('map', {
    center: homeCoords,
    zoom: initZoom,
    zoomControl: false,
    crs: spcPACrs,
    minZoom: 0,
    maxZoom: 9
});

// create panes to control layer ordering
// zoning feature layer pane
webmap.createPane('zoning');
// tax parcels standard
webmap.createPane('parcels');
// tax parcels from search
webmap.createPane('parcelsSearch');