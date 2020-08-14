"use strict";

// viewport width
let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

/*** Map & Device Size Functions ***/
// Set the initial map zoom level based upon viewport width
function setInitialMapZoom(windowWidth) {
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
function setPopupMaxWidth(windowWidth) {
    let maxWidth;
    if (windowWidth < 450 ) {
        maxWidth = 240;
    } else {
        maxWidth = 300;
    }
    return maxWidth;
}

// Attach search control for desktop or mobile
function attachSearch() {
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
function populateResults(results, resultsElement, resultsPanel) {
    // element to hold results content;
   let resultsContent = '<div>';

   // expecting items in results
   if (results.length < 1) {
      resultsContent += '<p>An error occured getting the zoning information</p>';
   } else {
     for (let i = 0; i < results.length; i++) {
         resultsContent += '<ul>';
         resultsContent += '<li>Zoning District: ' + results[i][0] + '</li>';
         resultsContent += '<li>Zoning Code: ' + results[i][1] + '</li>';
         resultsContent += '<li>Zoning Category: ' + results[i][2] + '</li>';
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
    attachSearch();

    // Basemap changed
	$("#selectStandardBasemap").on("change", function(e) {
        setBasemap($(this).val());
    });

    $('#panelResults a.panel-close').click(function() {
       $('#panelResults').css('opacity', 0);
    });
});

// resize event
$(window).resize(function() {
    attachSearch();
});