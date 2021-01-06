"use strict";

/*** Map & Device Size Functions ***/
// Set max width of pop-up window
export const setPopupMaxWidth = (windowWidth) => {
    let maxWidth;

    if (windowWidth < 450 ) {
        maxWidth = 240;
    } else {
        maxWidth = 300;
    }

    return maxWidth;
}

// function to populate zoning query results to display element
export const populateResults = (municipality, results, resultsElement, resultsPanel) => {
    // element to hold results content;
   let resultsContent = '<div>';
   // add municipality
   resultsContent += `<span class="text-center">Municipality: <strong>${municipality}</strong></span>`;

   // expecting items in results
   if (results.length < 1) {
      resultsContent += '<p>An error occured getting the zoning information</p>';
   } else {
        for (const element of results) {
            resultsContent += '<ul>';
            resultsContent += `<li>Zoning District: <strong>${element[0]}</strong></li>`;
            resultsContent += `<li>Zoning Code: <strong>${element[1]}</strong></li>`;
            resultsContent += `<li>Zoning Category: <strong>${element[2]}</strong></li>`;
            resultsContent += '</ul>';
        }
   }

   // close div element
   resultsContent += '</div>';

   // set content of resultsEl
   resultsElement.innerHTML = resultsContent;
   // show panel
   resultsPanel.style.display = 'block';
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

// function to handle load event for map services
export const processLoadEvent = (service) => {
   // service request success event
   service.on('requestsuccess', function(e) {
      // set isLoaded property to true
      service.options.isLoaded = true;
   });
   // request error event
   service.on('requesterror', function(e) {
      // if the error url matches the url for the map service, display error messages
      // without this logic, various urls related to the service appear
      if (e.url == service.options.url) {
         // set isLoaded property to false
         service.options.isLoaded = false;
         // add warning messages to console
         console.warn('Layer failed to load: ' + service.options.url);
         console.warn('Code: ' + e.code + '; Message: ' + e.message);
         // show modal window
         $('#layerErrorModal').modal('show');
      }
   });
}