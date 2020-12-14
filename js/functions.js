"use strict";

/*** Map & Device Size Functions ***/
// Set the initial map zoom level based upon viewport width
const setInitialMapZoom = (windowWidth) => {
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
const setPopupMaxWidth = (windowWidth) => {
    let maxWidth;

    if (windowWidth < 450 ) {
        maxWidth = 240;
    } else {
        maxWidth = 300;
    }

    return maxWidth;
}

// Attach search control for desktop or mobile
const attachSearch = () => {
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
const populateResults = (results, resultsElement, resultsPanel) => {
    // element to hold results content;
   let resultsContent = '<div>';

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

   // close div element
   resultsContent += '</div>';

   // set content of resultsEl
   resultsElement.innerHTML = resultsContent;
   // show panel
   resultsPanel.style.opacity = 1;
}

$(document).ready(function() {
    // update where search widget is located
    attachSearch();

    // close results panel
    // remove jQuery [?]
    $('#panelResults a.panel-close').click(function() {
       $('#panelResults').css('opacity', 0);
    });
});

// resize event
// remove jQuery [?]
$(window).resize(function() {
    // update where search widget is located
    attachSearch();
});