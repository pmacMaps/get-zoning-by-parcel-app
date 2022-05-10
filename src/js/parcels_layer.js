import { featureLayer } from 'esri-leaflet';
import { webmap } from './webmap.js';
import { taxParcel } from './app.js';
import { setPopupMaxWidth, clearLayers } from './map-functions.js';
import { windowWidth } from './webmap.js';
import { prepResultsDisplay } from './functions.js';
import { selectParcelByPin } from './get-tax-parcel.js';
import { resultsEl } from './search-control.js';
import { webmap } from './webmap.js';

// tax parcels feature layer
export const taxParcelsFS = featureLayer({
    url: 'https://services1.arcgis.com/1Cfo0re3un0w6a30/ArcGIS/rest/services/Tax_Parcels/FeatureServer/0',
    minZoom: 5,
    isLoaded: false,
    pane: 'parcels',
    style: function(feature) {
        return {
            color: '#000',
            weight: 1.75,
            fillOpacity: 0
        }
    }
});

taxParcelsFS.bindPopup(function(layer) {
    let popupContent = '<div class="feat-popup">';
    popupContent += '<ul>';
    popupContent += '<li>Address: {SITUS}</li>';
    popupContent += '<li>Municipality: {MUNI_NAME}</li>';
    popupContent += '<li>PIN: {Link}</li>';
    popupContent += '<li>Owner: {OWNER}</li>';
    popupContent += '</ul>';
    popupContent += '</div>';

    return L.Util.template(popupContent, layer.feature.properties);

 }, {maxWidth: setPopupMaxWidth(windowWidth)});

// run zoning query when parcel is clicked on (popup open)
taxParcelsFS.on('popupopen', function(e) {
    // set-up results panel
    prepResultsDisplay(webmap);
    // Remove previous tax parcel GeoJSON feature
    clearLayers(taxParcel);
    // call parcel query function
    selectParcelByPin(webmap, e.layer.feature.properties.Link, resultsEl);
});