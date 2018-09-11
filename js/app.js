"use strict";

// panel containing zoning district information
const resultsPanel = document.getElementById('panelResults');
// element within panel containing results of analysis
const resultsEl = document.getElementById('results');
// center coordinates for map
const homeCoords = [40.15, -77.25];

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

/*** Map Objects ***/                                                                const map = L.map('map', {
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
const esriLayerLabels = L.esri.basemapLayer('ImageryLabels');
const worldTransportation = L.esri.basemapLayer('ImageryTransportation');

// Municipal Boundaries
const municipalService = L.esri.dynamicMapLayer({   url:'//gis.ccpa.net/arcgiswebadaptor/rest/services/ArcGIS_Online/MunicipalBoundaries/MapServer',
    maxZoom: 14 
}).addTo(map);

// Zoning By District
const zoningDistrictsService = L.esri.dynamicMapLayer({
    url: '//gis.ccpa.net/arcgiswebadaptor/rest/services/Planning/ZoningByDistrict/MapServer',
    minZoom: 14,
    opacity: 0.35
}).addTo(map);

// Container for selected parel
const taxParcel =  L.geoJson().addTo(map);

// call functions within Esri Leaflet Geocoder
const taxParcelsProvider = L.esri.Geocoding.featureLayerProvider({
    url: '//gis.ccpa.net/arcgiswebadaptor/rest/services/Parcels/MapServer/42',
    maxResults: 10,
    attribution: 'Cumberland County',
    label: 'Tax Parcels',
    searchFields: ['PIN', 'SITUS'],
        formatSuggestion: function(feature){
            return feature.properties.PIN + ' (' + feature.properties.SITUS + ', ' + feature.properties.MUNI_NAME + ')';
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
        selectParcelByPin(pin, taxParcel, resultsEl, resultsPanel);
    } else {
        // add message to console
        console.log('No parcel features returned');
        // set content of results element
         resultsEl.innerHTML = 'No parcel features were found. Please check the parcel ID you entered and try again.  If problems persists, contact the website manager.';
         // show panel
         resultsPanel.style.opacity = 1; 
    }
    
    // hide search modal
    $('#panelSearch').hide();
});