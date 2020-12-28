"use strict";

// imports
import {attachSearch, removeZoningLayerFromMap} from './functions.js';
import {selectParcelByPin} from './getTaxParcel.js';

$(document).ready(function() {
    // update where search widget is located
    attachSearch();

    // close results panel
    // remove jQuery [future step]
    $('#panelResults a.panel-close').click(function() {
       $('#panelResults').css('opacity', 0);
    });
});

// resize event
// remove jQuery [future step]
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
    maxZoom: 8
});

/*** Zoom Home Control ***/
const zoomHome = L.Control.zoomHome({
    position: 'topleft',
    zoomHomeTitle: 'Full map extent',
    homeCoordinates: homeCoords,
    homeZoom: 0
}).addTo(map);

// 2020 Imagery - cached map service
const imagery2020 = L.esri.tiledMapLayer({
    url: 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Imagery/Imagery2020/MapServer',
    maxZoom: 8,
    minZoom: 0,
    continuousWorld: true,
    attribution: 'Cumberland County',
    errorTileUrl: '//downloads2.esri.com/support/TechArticles/blank256.png',
    isLoaded: false
}).addTo(map);

// Roads & Municipal Boundaries - cached map service
const roadsMunicipality = L.esri.tiledMapLayer({
    url: 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Property_Assessment/Roads_Municipal_Boundaries/MapServer',
    maxZoom: 8,
    minZoom: 0,
    continuousWorld: true,
    attribution: 'Cumberland County',
    errorTileUrl: '//downloads2.esri.com/support/TechArticles/blank256.png',
    isLoaded: false
}).addTo(map);

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
    placeholder: 'Enter Property Address or PIN',
    title: 'Enter Street Address or Parcel ID (PIN)',
    expanded: true,
    collapseAfterResult: false,
    zoomToResult: false
}).addTo(map);

/*** Address search results event ***/
SearchControl.on('results', function(data) {
    // remove any existing zoning layers from map
    removeZoningLayerFromMap(map, 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Planning/Zoning_Basemap/MapServer');

    // change opacity of results panel back to 0
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