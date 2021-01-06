"use strict";

// Attach search control for desktop or mobile
// remove jQuery [future step]
const attachSearch = () => {
    const parentName = $(".geocoder-control").parent().attr("id"),
    geocoder = $(".geocoder-control"),
    width = $(window).width();

    if (width < 992 && parentName !== "geocodeMobile") {
        geocoder.detach();
        $("#geocodeMobile").append(geocoder);
    } else if (width >= 992 && parentName !== "geocode"){
        geocoder.detach();
        $("#geocode").append(geocoder);
    }
}

/* Navigation UI Controls */
// Make collapsed navigation scroll
// update code, may not even need
const mobileNavScroll = () => {
    $(".navbar-collapse").css({maxHeight: $(window).height() - $(".navbar-header").height() + "px"});
}

/*** Toggle hamburger navigation menu ***/
/*
$("#nav-btn").click(function() {
    $(".navbar-collapse").collapse("toggle");
    return false;
});
*/

/*** Navigation Modal Windows ***/
// Open Search info window
$("#search-btn").click(function() {
    $('#searchModal').modal('show');
});

// Open About info window
$("#about-btn").click(function() {
    $('#aboutModal').modal('show');
});

// Open Legend info window
$("#legend-btn").click(function() {
    $('#legendModal').modal('show');
});

// Open Discliamer info window
$("#disclaimer-btn").click(function() {
    $('#disclaimerModal').modal('show');
});

// buttons to close results panel
const resultsCloseButtons = document.querySelectorAll('#panelResults button');
// add event listener
resultsCloseButtons.forEach(function(element) {
    element.addEventListener('click', function() {
        document.getElementById('panelResults').style.display = 'none';
    });
});

/* Document Ready */
$(document).ready(function() {
    //mobileNavScroll();
    attachSearch();
    // close results panel

    $(window).resize(function() {
        //mobileNavScroll();
        attachSearch();
    });
});