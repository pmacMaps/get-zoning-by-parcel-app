"use strict";

// imports
import {showElement, hideElement, prepResultsDisplay} from './functions.js';
import {selectParcelByPin} from './getTaxParcel.js';
import {createMapLegendMS} from './mapLegend.js';
import {processLoadEvent, setPopupMaxWidth, clearLayers} from './mapFunctions.js';
import {locateControl} from './geolocate.js';

// loading screen element
const backCover = document.getElementById('back-cover');
// element within results panel containing text for results of analysis
const resultsEl = document.getElementById('zoningResults');
// center coordinates for map
const homeCoords = [40.15, -77.25];
// viewport width
const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// PA State Plane South (ft) projection
const spcPACrs = new L.Proj.CRS('EPSG:2272', '+proj=lcc +lat_1=40.96666666666667 +lat_2=39.93333333333333 +lat_0=39.33333333333334 +lon_0=-77.75 +x_0=600000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs',  {
    origin: [-1.192142E8, 1.461669E8],
    resolutions: [
      260.41666666666663,
      86.80555555555556,
      43.40277777777778,
      20.833333333333332,
      10.416666666666666,
      6.944444444444444,
      4.166666666666666,
      2.083333333333333,
      1.0416666666666665,
      0.5208333333333333
    ]
});

/*** Map Objects ***/
const map = L.map('map', {
    center: homeCoords,
    zoom: 0,
    zoomControl: false,
    crs: spcPACrs,
    minZoom: 0,
    maxZoom: 9
});

/*** Zoom Home Control ***/
const zoomHome = L.Control.zoomHome({
    position: 'topleft',
    zoomHomeTitle: 'Full map extent',
    homeCoordinates: homeCoords,
    homeZoom: 0
}).addTo(map);

// Locate Me Widget
locateControl.addTo(map);

// Full Screen Control
const fullscreenControl = new L.Control.Fullscreen({
    position: 'topleft'
}).addTo(map);

// create panes to control layer ordering
// zoning feature layer pane
map.createPane('zoning');
// tax parcels standard
map.createPane('parcels');
// tax parcels from search
map.createPane('parcelsSearch');

// Container for selected parel
const taxParcel =  L.geoJson(null, {pane: 'parcelsSearch'}).addTo(map);

// array of map services to run loading function on
const mapServices = [imagery2020, roadsMunicipality, taxParcelsFS];

// call load/error events function on layers
mapServices.forEach(element => processLoadEvent(element));
// add layers to map
mapServices.forEach(element => element.addTo(map));

// Create Map Legend
createMapLegendMS('https://gis.ccpa.net/arcgiswebadaptor/rest/services/Property_Assessment/Roads_Municipal_Boundaries/MapServer', '#map-legend-content');

/*** Remove loading screen after services loaded ***/
const loadScreenTimer = window.setInterval(function() {
    // loaded states of map services
    let imagery2020Loaded = imagery2020.options.isLoaded;
    let roadsMuniLoaded = roadsMunicipality.options.isLoaded;

    if (imagery2020Loaded && roadsMuniLoaded) {
        // remove loading screen
        window.setTimeout(function() {
            backCover.style.display = 'none';
        }, 500);

        // clear timer
        window.clearInterval(loadScreenTimer);
    } else {
      console.log('layers still loading');
    }
}, 1000);

// Remove loading screen when warning modal is closed
$('#layerErrorModal').on('hide.bs.modal', function(e) {
   // remove loading screen
   backCover.style.display = 'none';
   // clear timer
   window.clearInterval(loadScreenTimer);
});