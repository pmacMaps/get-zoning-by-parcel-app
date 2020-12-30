"use strict";

import {populateResults} from './functions.js';
import {getMuniName} from './getMunicipalName.js';
import {createMapLegendFS} from './mapLegend.js';

// function to get zoning district for parcel
// standard query is 'contains'
// if no features with 'contains', use 'intersects' as backup
// potential false positives for intersects on properties on edge of zoning districts
export const getZoningDistrict = (webmap, parcel, pin, zoningURL, resultsElement, resultsPanel) => {
    L.esri.query({url: zoningURL}).contains(parcel).run(function(error,response) {
      if (error) {
         // add message to console
         console.warn('An error with zoning service request has occured');
         console.warn(`Code: ${error.code}; Message: ${error.message}`);
         // set content of results element
         resultsElement.innerHTML = 'An error getting the zoning district has occured.  Please try again or contact Cumberland County GIS [provide phone number/e-mail].';
         // show panel
         resultsPanel.style.opacity = 1;
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
             resultsElement.innerHTML = 'An error getting the zoning district has occured.  Please try again or contact Cumberland County GIS [provide phone number/e-mail].';
             // show panel
             resultsPanel.style.opacity = 1;
          } else if (response.features < 1) {
             // add message to console
             console.warn('No zoning district features returned or an error occured');
             // set content of results element
             resultsElement.innerHTML = 'No zoning district features returned or an error occured. Please try again or contact Cumberland County GIS [provide phone number/e-mail].';
             // show panel
             resultsPanel.style.opacity = 1;
          }
            else {
              // add zoning layer for selected municipality to map
              const zoningLayer = L.esri.featureLayer({url: zoningURL}).addTo(webmap);

              // array to hold all zoning information
              let zoningInfo = [];

              // loop through all zoning districts intersecting parcels
              for (const element of response.features) {
                // fields from service
                const zoningDistrictName = element.properties.ZoneName;
                const zoningDistrictCode = element.properties.ZoneCode;
                const zoningDistrictCategory = element.properties.ZoneType;

                // array to hold results for each zoning district
                let resultsArray = [];
                resultsArray[0] = zoningDistrictName;
                resultsArray[1] = zoningDistrictCode;
                resultsArray[2] = zoningDistrictCategory;

                // add array for each zoning district to master array
                zoningInfo.push(resultsArray);
              }

              // get municipal name
              const municipality = getMuniName(pin);

             // call populate results function
             populateResults(municipality, zoningInfo, resultsElement, resultsPanel);
          }
        });
        // end 0 records return clause
      } else {
          // add zoning layer for selected municipality to map
          const zoningLayer = L.esri.featureLayer({url: zoningURL}).addTo(webmap);
          // add map legend element for service
          createMapLegendFS(zoningLayer, '#map-legend-content');

          // array to hold all zoning information
          let zoningInfo = [];

          // loop through all zoning districts intersecting parcels
          for (const element of response.features) {
            // fields from service
            const zoningDistrictName = element.properties.ZoneName;
            const zoningDistrictCode = element.properties.ZoneCode;
            const zoningDistrictCategory = element.properties.ZoneType;

            // array to hold results for each zoning district
            let resultsArray = [];
            resultsArray[0] = zoningDistrictName;
            resultsArray[1] = zoningDistrictCode;
            resultsArray[2] = zoningDistrictCategory;

            // add array for each zoning district to master array
            zoningInfo.push(resultsArray);
          }

          // get municipal name
          const municipality = getMuniName(pin);

         // call populate results function
         populateResults(municipality, zoningInfo, resultsElement, resultsPanel);
      } // end Else clause
    });
}