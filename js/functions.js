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

// display element
export const showElement = (id) => {
    const element = document.getElementById(id);
    element.style.display = 'block';
}

// hide element
export const hideElement = (id) => {
    const element = document.getElementById(id);
    element.style.display = 'none';
}

// resent content
export const resetContent = (id) => {
    const element = document.getElementById(id);
    element.innerHTML = '';
}

// function to populate zoning query results to display element
export const populateZoningDistrictResults = (results, resultsElement) => {
    // element to hold results content;
   let resultsContent = '';
   // expecting items in results
   if (results.length < 1) {
      resultsContent += '<p>An error occured getting the zoning information</p>';
   } else {
        for (const element of results) {
            resultsContent += '<ul>';
            resultsContent += `<li>Zoning District: <strong>${element[0]}</strong></li>`;
            resultsContent += '</ul>';
        }
   }

   // set content of resultsEl
   resultsElement.innerHTML += resultsContent;
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