"use strict";

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

//
// Attach search control for desktop or mobile
// Attach search control for desktop or mobile
const attachSearch = () => {
    const geocoder = $(".geocoder-control");
    $("#geocode").append(geocoder);
}

$(document).ready(function() {
    //mobileNavScroll();
    attachSearch();
    // close results panel

    $(window).resize(function() {
        //mobileNavScroll();
    });
});