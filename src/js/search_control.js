import {featureLayerProvider, geosearch} from 'esri-leaflet-geocoder';

// call functions within Esri Leaflet Geocoder
const taxParcelsProvider = new featureLayerProvider({
    url: 'https://services1.arcgis.com/1Cfo0re3un0w6a30/ArcGIS/rest/services/Tax_Parcels/FeatureServer/0',
    maxResults: 8,
    attribution: 'Cumberland County',
    label: 'Tax Parcels',
    searchFields: ['Link', 'SITUS'],
        formatSuggestion: function(feature){
            return feature.properties.Link + ' (' + feature.properties.SITUS + ', ' + feature.properties.MUNI_NAME + ')';
        }
});

export const SearchControl = new geosearch({
    useMapBounds: false,
    providers: [taxParcelsProvider],
    placeholder: 'Enter Property Address or PIN',
    title: 'Enter Street Address or Parcel ID (PIN)',
    expanded: true,
    collapseAfterResult: false,
    zoomToResult: false
});

/*** Address search results event ***/
SearchControl.on('results', function(data) {
    // set-up results panel display
    prepResultsDisplay(map);

    // case: there are results from geosearch
    if (data.results.length > 0) {
       const resultText = data.results[0].text;
       const pin = resultText.split(" ")[0];

        // Remove previous tax parcel GeoJSON feature
        clearLayers(taxParcel);

        // call parcel query function
        // take PIN from geosearch result and pass that into parcel query
        selectParcelByPin(map, pin, resultsEl, 'search', taxParcel);
    } // no results from geosearch
    else {
        // add message to console
        console.log('No parcel features returned');
        // set content of results element
         resultsEl.innerHTML = 'No matching property was found. Please check the street address or PIN you entered and try again.  If problems persists, contact Cumberland County GIS at (717) 240-7842 or gis@ccpa.net.';
         // hide results waiting
         hideElement('resultsWaiting');
         // show results content
         showElement('zoningResults');
    }
});