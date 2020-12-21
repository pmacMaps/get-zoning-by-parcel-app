"use strict";

// imports
import {setInitialMapZoom, attachSearch, removeZoningLayerFromMap} from './functions.js';
import {selectParcelByPin} from './getTaxParcel.js';

$(document).ready(function() {
    // update where search widget is located
    attachSearch();

    // close results panel
    // remove jQuery [?]
    $('#panelResults a.panel-close').click(function() {
       $('#panelResults').css('opacity', 0);
    });
});

// resize event
// remove jQuery [?]
$(window).resize(function() {
    // update where search widget is located
    attachSearch();
});

// viewport width
let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// panel containing results of zoning district analysis
const resultsPanel = document.getElementById('panelResults');
// element within results panel containing text for results of analysis
const resultsEl = document.getElementById('results');
// center coordinates for map
const homeCoords = [40.15, -77.25];

/***  Basemap Changer ***/
// make arrow function
function setBasemap(selectedBasemap) {
    if (basemap) {
	   map.removeLayer(basemap);
    }
    if (selectedBasemap === 'OpenStreetMap') {
        basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
	} else {
	   basemap = L.esri.basemapLayer(selectedBasemap);
    }
    map.addLayer(basemap);
    if (esriLayerLabels) {
        map.removeLayer(esriLayerLabels);
	}
    if (grayCanvasLabels) {
        map.removeLayer(grayCanvasLabels);
    }
	if (selectedBasemap === 'Imagery' || selectedBasemap === 'Gray') {
	    esriLayerLabels = L.esri.basemapLayer(selectedBasemap + 'Labels');
		map.addLayer(esriLayerLabels);
	}
    // add world transportation service to Imagery basemap
    if (selectedBasemap === 'Imagery') {
            worldTransportation.addTo(map);
    } else if (map.hasLayer(worldTransportation)) {
            map.removeLayer(worldTransportation);
    }
    // close panel
    $('#panelBasemaps').collapse("hide");
}

/*** Map Objects ***/                                                        const map = L.map('map', {
   center: homeCoords,
   zoom: setInitialMapZoom(windowWidth),
   zoomControl: false
});

/*** Zoom Home Control ***/
const zoomHome = L.Control.zoomHome({
    position: 'topleft',
    zoomHomeTitle: 'Full map extent',
    homeCoordinates: homeCoords,
    homeZoom: setInitialMapZoom(windowWidth)
}).addTo(map);

// ESRI Basemaps
let basemap = L.esri.basemapLayer('Gray').addTo(map);
const grayCanvasLabels = L.esri.basemapLayer('GrayLabels').addTo(map);
let esriLayerLabels = L.esri.basemapLayer('ImageryLabels');
const worldTransportation = L.esri.basemapLayer('ImageryTransportation');

// Municipal Boundaries
const municipalService = L.esri.dynamicMapLayer({
    url:'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Property_Assessment/Municipal_Boundaries/MapServer',
    maxZoom: 14
}).addTo(map);

// Container for selected parel
const taxParcel =  L.geoJson().addTo(map);

// call functions within Esri Leaflet Geocoder
const taxParcelsProvider = L.esri.Geocoding.featureLayerProvider({
    url: 'https://services1.arcgis.com/1Cfo0re3un0w6a30/ArcGIS/rest/services/Tax_Parcels/FeatureServer/0',
    maxResults: 8,
    attribution: 'Cumberland County',
    label: 'Tax Parcels',
    searchFields: ['Link', 'SITUS'],
        formatSuggestion: function(feature){
            return feature.properties.Link + ' (' + feature.properties.SITUS + ', ' + feature.properties.MUNI_NAME + ')';
        }
});

const SearchControl = L.esri.Geocoding.geosearch({
    useMapBounds: false,
    providers: [taxParcelsProvider],
    placeholder: 'Tax Parcel Search (PIN or Address)',
    title: 'Enter PIN or Address',
    expanded: true,
    collapseAfterResult: false,
    zoomToResult: false
}).addTo(map);

/*** Address search results event ***/
SearchControl.on('results', function(data) {
    // remove any existing zoning layers from map
    // where is best place for this [?]
    removeZoningLayerFromMap(map, 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Planning/Zoning_Basemap/MapServer');

    // change opacity back to 0
    resultsPanel.style.opacity = 0;

    // check for results
    if (data.results.length > 0) {
       const resultText = data.results[0].text;
       const pin = resultText.split(" ")[0];

        // Remove previous tax parcel GeoJSON feature
        if (taxParcel.getLayers().length > 0) {
            taxParcel.clearLayers();
        }

        // call parcel query function
        selectParcelByPin(map, pin, taxParcel, resultsEl, resultsPanel);
    } else { // no results found
        // add message to console
        console.log('No parcel features returned');
        // set content of results element
         resultsEl.innerHTML = 'No parcel features were found. Please check the parcel ID you entered and try again.  If problems persists, contact the website manager.';
         // show panel
         resultsPanel.style.opacity = 1;
    }
});