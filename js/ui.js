"use strict";

/* Navigation UI Controls */
// Make collapsed navigation scroll
const mobileNavScroll = () => {
    $(".navbar-collapse").css({maxHeight: $(window).height() - $(".navbar-header").height() + "px"});
}

/*** Toggle hamburger navigation menu ***/
$("#nav-btn").click(function() {
    $(".navbar-collapse").collapse("toggle");
    return false;
});

/*** Navigation Modal Windows ***/
// Open About info window
$("#about-btn").click(function() {
    $("#aboutModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

// Open Legend info window
$("#legend-btn").click(function() {
    $("#legendModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

// Open Discliamer info window
$("#disclaimer-btn").click(function() {
    $("#disclaimerModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

// Open Search info window
$("#search-btn").click(function() {
    $("#searchModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

//
// Attach search control for desktop or mobile
// Attach search control for desktop or mobile
const attachSearch = () => {
    const geocoder = $(".geocoder-control");
    $("#geocode").append(geocoder);
}

$(document).ready(function() {
    mobileNavScroll();
    attachSearch();
    // close results panel
    // remove jQuery [future step]
    $('#panelResults a.panel-close').click(function() {
       $('#panelResults').css('opacity', 0);
    });

    $(window).resize(function() {
        mobileNavScroll();
    });
});