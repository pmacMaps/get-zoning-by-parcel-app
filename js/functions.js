"use strict";

/*** Map & Device Size Functions ***/
// Set the initial map zoom level based upon viewport width
export const setInitialMapZoom = (windowWidth) => {
    let mapZoom;

    if (windowWidth < 500) {
        mapZoom = 9;
    } else if (windowWidth >= 500 && windowWidth < 1000) {
        mapZoom = 10;
    } else {
        mapZoom = 11;
    }

    return mapZoom;
}

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
   resultsContent += '<h3>' + municipality + '</h3>';

   // expecting items in results
   if (results.length < 1) {
      resultsContent += '<p>An error occured getting the zoning information</p>';
   } else {
        for (const element of results) {
            resultsContent += '<ul>';
            resultsContent += '<li>Zoning District: <strong>' + element[0] + '</strong></li>';
            resultsContent += '<li>Zoning Code: <strong>' + element[1] + '</strong></li>';
            resultsContent += '<li>Zoning Category: <strong>' + element[2] + '</strong></li>';
            resultsContent += '</ul>';
        }
   }

   // add note about contacting muni to verify
   resultsContent += '<p>Please contact the municipality listed above to verify the zoning district for this property.</p>';
   resultsContent += '<p>We could dynamically add e-mail or phone number based upon municipality (or later as enhancement)</p>';
   // close div element
   resultsContent += '</div>';

   // set content of resultsEl
   resultsElement.innerHTML = resultsContent;
   // show panel
   resultsPanel.style.opacity = 1;
}