"use strict";

/*** DOM Objects ***/
// panel containing zoning district information
var resultsPanel = document.getElementById('panelResults');
// element within panel containing results of analysis
var resultsEl = document.getElementById('results');
// search form element
var userForm = document.getElementById('search');
// center coordinates for map
var homeCoords = [40.15, -77.25];

/***  Basemap Changer ***/
function setBasemap(selectedBasemap) {    
    if (basemap) {
	   map.removeLayer(basemap);        
	}	
    if (selectedBasemap === 'OpenStreetMap') {
        basemap = L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
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
}

/*** Map Objects ***/                                                                                // Map
var map = L.map('map', {
   center: homeCoords,
   zoom: setInitialMapZoom(windowWidth),    
   zoomControl: false               
});

/*** Zoom Home Control ***/
var zoomHome = L.Control.zoomHome({
    position: 'topleft',
    zoomHomeTitle: 'Full map extent',
    homeCoordinates: homeCoords,
    homeZoom: setInitialMapZoom(windowWidth)
}).addTo(map);

// ESRI Basemaps
var basemap = L.esri.basemapLayer('Gray').addTo(map);
var grayCanvasLabels = L.esri.basemapLayer('GrayLabels').addTo(map);
var esriLayerLabels = L.esri.basemapLayer('ImageryLabels');
var worldTransportation = L.esri.basemapLayer('ImageryTransportation');

// Municipal Boundaries
var municipalService = L.esri.dynamicMapLayer({
   url:'//gis.ccpa.net/arcgiswebadaptor/rest/services/ArcGIS_Online/MunicipalBoundaries/MapServer',
    maxZoom: 14 
}).addTo(map);

// Zoning By District
var zoningGeneralized = L.esri.dynamicMapLayer({
    url: '//gis.ccpa.net/arcgiswebadaptor/rest/services/Planning/ZoningByDistrict/MapServer',
    minZoom: 14,
    opacity: 0.35
}).addTo(map);

// Container for selected parel
var taxParcel =  L.geoJson().addTo(map);

// call functions within Esri Leaflet Geocoder
var taxParcelsProvider = L.esri.Geocoding.featureLayerProvider({
    url: '//gis.ccpa.net/arcgiswebadaptor/rest/services/Parcels/MapServer/42',
    maxResults: 10,
    attribution: 'Cumberland County',
    label: 'Tax Parcels',
    searchFields: ['PIN', 'SITUS'],
        formatSuggestion: function(feature){
            return feature.properties.PIN + ' (' + feature.properties.SITUS + ', ' + feature.properties.MUNI_NAME + ')';
        }        
});

var SearchControl = L.esri.Geocoding.geosearch({
    useMapBounds: false,
    providers: [taxParcelsProvider],
    placeholder: 'Tax Parcel Search',
    title: 'Tax Parcel Search',
    expanded: true,
    collapseAfterResult: false,
    zoomToResult: false
}).addTo(map);
    
/*** Address search results event ***/
SearchControl.on('results', function(data) {  
    // change opacity back to 0
    resultsPanel.style.opacity = 0;
    
    // check for results
    if (data.results.length > 0) {
       var resultText = data.results[0].text;
       console.log(resultText);
       var pin = resultText.split(" ")[0];
       console.log(pin);
        
        // Remove previous tax parcel GeoJSON feature
        if (taxParcel.getLayers().length > 0) {
            taxParcel.clearLayers();
        }
    
        // call parcel query function
        // resultText will fail if it hits a street address
        // would need to handle that context
        selectParcelByPin(pin, taxParcel, resultsEl, resultsPanel);
    }
});