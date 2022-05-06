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

// clear sub-layers from group
export const clearLayers = (layer) => {
    if (layer.getLayers().length > 0) {
        layer.clearLayers();
    }
}