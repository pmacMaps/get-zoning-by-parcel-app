"use strict";

//import {createMapLegendFS} from './map-legend.js';

// add zoning layer from webmap
export const addZoningLayerToMap = (webmap, zoningURL, pane) => {
    // add zoning layer for selected municipality to map
    const zoningLayer = L.esri.featureLayer({
        url: zoningURL,
        pane: pane,
        interactive: false
      }).addTo(webmap);

    // add map legend element for service
    //createMapLegendFS(zoningLayer, '#map-legend-content');
}

// removes zoning layers from webmap
export const removeZoningLayerFromMap = (webmap, parentUrl) => {
    // loop through layers
    webmap.eachLayer(function(layer) {
        // check layer has 'options' property
        if (layer.hasOwnProperty('options')) {
            // check that layer has 'options.url' property
            if (layer.options.hasOwnProperty('url')) {
                // check that layer is part of zoning basemap parent service
                if (layer.options.url.includes(parentUrl)) {
                    // remove layer from map
                    webmap.removeLayer(layer);
                }
            }
        }
    });
}