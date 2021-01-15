"use strict";

import {populateZoningDistrictResults, hideElement, showElement} from './functions.js';
import {createMapLegendFS} from './mapLegend.js';

// function to get zoning district for parcel
// standard query is 'contains'
// if no features with 'contains', use 'overlaps' as backup
// need to add logic for when more than one parcel feature is returned from previous function
export const getZoningDistrict = (webmap, parcel, zoningURL, resultsElement) => {
    L.esri.query({url: zoningURL}).contains(parcel).run(function(error,response) {
      if (error) {
         // add message to console
         console.warn('An error with zoning service request has occured');
         console.warn(`Code: ${error.code}; Message: ${error.message}`);
         // set content of results element
         resultsElement.innerHTML = 'An error getting the zoning district has occured.  Please try again or contact Cumberland County GIS at (717) 240-7842 or gis@ccpa.net.';
         // hide waiting on analysis text
         hideElement('resultsWaiting');
         // show content
         showElement('zoningResults');
         // end Error clause
      } else if (response.features < 1) {
        // add message to console
        console.warn('No zoning district features returned or an error occured');
        console.warn('attempting "overlaps" query');
        // run overlaps query
        L.esri.query({url: zoningURL}).overlaps(parcel).run(function(error,response) {
          if (error) {
             // add message to console
             console.warn('An error with zoning service request has occured');
             console.warn(`Code: ${error.code}; Message: ${error.message}`);
             // set content of results element
             resultsElement.innerHTML = 'An error getting the zoning district has occured.  Please try again or contact Cumberland County GIS at (717) 240-7842 or gis@ccpa.net.';
             // hide waiting on analysis text
             hideElement('resultsWaiting');
             // show content
             showElement('zoningResults');
          } else if (response.features < 1) {
             // add message to console
             console.warn('No zoning district features returned or an error occured');
             // set content of results element
             resultsElement.innerHTML = 'No zoning district features returned or an error occured. Please try again or contact Cumberland County GIS at (717) 240-7842 or gis@ccpa.net';
             // hide waiting on analysis text
             hideElement('resultsWaiting');
             // show content
             showElement('zoningResults');
          }
            else {
              // add zoning layer for selected municipality to map
              const zoningLayer = L.esri.featureLayer({
                url: zoningURL,
                pane: 'zoning',
                interactive: false
              }).addTo(webmap);

              // add map legend element for service
              createMapLegendFS(zoningLayer, '#map-legend-content');

              // array to hold all zoning information
              let zoningInfo = [];

              // loop through all zoning districts intersecting parcels
              for (const element of response.features) {
                // zoning district name
                const zoningDistrictName = element.properties.ZoneName;
                // array to hold results for each zoning district
                let resultsArray = [];
                resultsArray[0] = zoningDistrictName;
                // add array for each zoning district to master array
                zoningInfo.push(resultsArray);
              }

             // call populate results function
             populateZoningDistrictResults(zoningInfo, resultsElement);

             setTimeout(function() {
              // hide results waiting
              hideElement('resultsWaiting');
              // show results content
              showElement('municipalWrapper');
              showElement('zoningResults');
             }, 2000);
          }
        });
        // end 0 records return clause; overlaps query backup
      } else {
          // add zoning layer for selected municipality to map
          const zoningLayer = L.esri.featureLayer({
            url: zoningURL,
            pane: 'zoning',
            interactive: false}).addTo(webmap);
          // add map legend element for service
          createMapLegendFS(zoningLayer, '#map-legend-content');

          // array to hold all zoning information
          let zoningInfo = [];

          // loop through all zoning districts intersecting parcels
          for (const element of response.features) {
            // zoning district field
            const zoningDistrictName = element.properties.ZoneName;
            // array to hold results for each zoning district
            let resultsArray = [];
            resultsArray[0] = zoningDistrictName;
            // add array for each zoning district to master array
            zoningInfo.push(resultsArray);
          }

          // call populate results function
          populateZoningDistrictResults(zoningInfo, resultsElement);

          setTimeout(function() {
            // hide results waiting
            hideElement('resultsWaiting');
            // show results content
            showElement('municipalWrapper');
            showElement('zoningResults');
          }, 2000);
      } // end Else clause
    });
}