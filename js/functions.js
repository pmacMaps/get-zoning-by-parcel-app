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

// Attach search control for desktop or mobile
// remove jQuery [future step]
export const attachSearch = () => {
    const parentName = $(".geocoder-control").parent().attr("id"),
    geocoder = $(".geocoder-control"),
    width = $(window).width();

    if (width <= 1024 && parentName !== "geocodeMobile") {
        geocoder.detach();
        $("#geocodeMobile").append(geocoder);
    } else if (width > 1024 && parentName !== "geocode"){
        geocoder.detach();
        $("#geocode").append(geocoder);
    }
}

// function to populate zoning query results to display element
export const populateResults = (municipality, results, resultsElement, resultsPanel) => {
    // element to hold results content;
   let resultsContent = '<div>';
   // add municipality
   resultsContent += `<h3>Municipality: ${municipality}</h3>`;

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
   resultsPanel.style.opacity = 1;
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