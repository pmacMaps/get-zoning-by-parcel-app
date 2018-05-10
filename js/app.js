"use strict";

/*** DOM Objects ***/
// use jQuery instead?
// panel containing zoning district information
var resultsPanel = document.getElementById('panelResults');
// element within panel containing results of analysis
var resultsEl = document.getElementById('results');
// search form element
var userForm = document.getElementById('search');

/*** Map Objects ***/                                                                                // Map
var map = L.map('map', {
   center: [40.15, -77.25],
   zoom: 10               
});

// Basemap - Light Gray Canvas
var esriStreets = L.esri.basemapLayer('Gray').addTo(map);

// Municipal Boundaries
var municipalService = L.esri.dynamicMapLayer({
    url:'//gis.ccpa.net/arcgiswebadaptor/rest/services/ArcGIS_Online/MunicipalBoundaries/MapServer',
    maxZoom: 14 
}).addTo(map);

// automate creating array for sub-layers for zoning
var zoningSubLayers = [];

for (var i = 5; i < 38; i++) {
    zoningSubLayers.push(i);
}

// Generalized Zoning
var zoningGeneralized = L.esri.dynamicMapLayer({
    url: '//gis.ccpa.net/arcgiswebadaptor/rest/services/Zoning/MapServer',
    minZoom: 14,
    layers: zoningSubLayers,
    opacity: 0.5
}).addTo(map);

// Zoning By District - not sure which one to use yet
var zoningGeneralized = L.esri.dynamicMapLayer({
    url: '//gis.ccpa.net/arcgiswebadaptor/rest/services/Planning/ZoningByDistrict/MapServer',
    minZoom: 14    
}); 

// Container for selected parel
var taxParcel =  L.geoJson().addTo(map);

// add event listener to form
userForm.addEventListener('click', function(e) {
   // default default behavior
   e.preventDefault();
   
   // change opacity back to 0
   resultsPanel.style.opacity = 0;
   
   // get pin element
   var pin = document.getElementById('pin').value;   
   
   // Remove previous tax parcel GeoJSON feature
   if (taxParcel.getLayers().length > 0) {
       taxParcel.clearLayers();
   }
   
   // call parcel query function
   selectParcelByPin(pin, taxParcel, resultsEl, resultsPanel);   
});