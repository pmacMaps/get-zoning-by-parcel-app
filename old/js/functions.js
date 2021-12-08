"use strict";

import {removeZoningLayerFromMap} from './manageZoningLayer.js';
import {removeZoningFromLegend} from './mapLegend.js';

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

// set-up display for zoning results
export const prepResultsDisplay = (webmap) => {
    $('#searchModal').modal('hide');
    // hide results content
    hideElement('municipalWrapper');
    hideElement('zoningResults');
    // reset content
    resetContent('municipalName');
    resetContent('zoningResults');
    // show results waiting screen
    showElement('resultsWaiting');
    // show results panel
    showElement('panelResults');
    // remove any existing zoning layers from map
    removeZoningLayerFromMap(webmap, 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Planning/Zoning_Basemap/MapServer');
    // remove zoning from legend
    removeZoningFromLegend();
}