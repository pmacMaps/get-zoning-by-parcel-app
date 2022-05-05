import { featureLayer } from 'esri-leaflet';
import { setPopupMaxWidth } from './map-functions.js';
import { windowWidth } from './webmap.js';

// tax parcels feature layer
export const taxParcelsFS = new featureLayer({
    url: 'https://services1.arcgis.com/1Cfo0re3un0w6a30/ArcGIS/rest/services/Tax_Parcels/FeatureServer/0',
    minZoom: 5,
    isLoaded: false,
    pane: 'parcels'
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
    prepResultsDisplay(map);
    // Remove previous tax parcel GeoJSON feature
    clearLayers(taxParcel);
    // call parcel query function
    selectParcelByPin(map, e.layer.feature.properties.Link, resultsEl);
});