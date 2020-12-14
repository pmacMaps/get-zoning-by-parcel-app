"use strict";

import {selectZoningService} from './selectZoningService.js';
import {setPopupMaxWidth, populateResults} from './functions.js';

// viewport width
let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// function to get zoning district for parcel
// use intersects method (query) to catch cases where multiple zones are within a parcel
export const getParcelZoningDistrict = (parcel, municipality, zoningURL,resultsElement, resultsPanel) => {
    L.esri.query({url: zoningURL}).intersects(parcel).run(function(error,response) {
      if (error) {
         // add message to console
         console.warn('An error with zoning service request has occured');
         console.warn('Code: ' + error.code + '; Message: ' + error.message);
         // set content of results element
         resultsElement.innerHTML = 'An error getting the zoning district has occured.  Please try again or contact the website manager.';
         // show panel
         resultsPanel.style.opacity = 1;
      } else if (response.features < 1) {
         // add message to console
         console.warn('No zoning district features returned or an error occured');
         // set content of results element
         resultsElement.innerHTML = 'No zoning district features returned or an error occured. Please try again or contact the website manager.';
         // show panel
         resultsPanel.style.opacity = 1;
      }
        else {
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

         // call populate results function
         populateResults(municipality, zoningInfo, resultsElement, resultsPanel);
      }
    });
}

// function to select parcel based upon pin
export const selectParcelByPin = (webmap, pin, taxParcelLayer, resultsElement, resultsPanel) => {
   // attribute query expression
   const queryString = "Link = '" + pin + "'";
   // tax parcel service
   const taxParcelService = 'https://services1.arcgis.com/1Cfo0re3un0w6a30/ArcGIS/rest/services/Tax_Parcels/FeatureServer/0';

   // query request - where method
   L.esri.query({url: taxParcelService}).fields(['Link', 'SITUS', 'MUNI_NAME', 'OWNER']).where(queryString).run(function(error,response) {
      if (error) {
         // add message to console
         console.warn('An error with the parcels service request has occured');
         console.warn('Code: ' + error.code + '; Message: ' + error.message);
         // set content of results element
         resultsElement.innerHTML = 'An error getting the parcel has occured. Please try again or contact the website manager.';
         // show panel
         resultsPanel.style.opacity = 1;
      } else if (response.features < 1) {
         // add message to console
         console.log('No parcel features returned');
         // set content of results element
         resultsElement.innerHTML = 'No parcel features were found. Please check the parcel ID you entered and try again.  If problems persists, contact the website manager.';
         // show panel
         resultsPanel.style.opacity = 1;
      } else {
         // name of municipality
         // convert to title case
         // get all features and create array of muni's
         const muniName = response.features[0].properties.MUNI_NAME;
         // add data to geojson object
         taxParcelLayer.addData(response);
         // style feature
         taxParcelLayer.setStyle(function() {
            return {
                  fillOpacity: 0,
                  color: '#000',
                  opacity: 1,
                  weight: 3
            }
        });
        // bind popup
        const mapPopup = taxParcelLayer.bindPopup(function(layer) {
           let popupContent = '<div class="feat-popup">';
           popupContent += '<h3>Parcel: {Link}</h3>';
           popupContent += '<ul>';
           popupContent += '<li>Address: {SITUS}</li>';
           popupContent += '<li>Municipality: {MUNI_NAME}</li>';
           popupContent += '<li>Owner: {OWNER }</li>';
           popupContent += '</ul>';
           popupContent += '</div>';

           return L.Util.template(popupContent, layer.feature.properties);

        }, {maxWidth: setPopupMaxWidth(windowWidth)});

        // set map around selected parcel
        webmap.fitBounds(taxParcelLayer.getBounds());

        // open popup on map or figure out why double click is needed to open

        // call zoning query function
        getParcelZoningDistrict(taxParcelLayer, muniName, selectZoningService(pin), resultsElement, resultsPanel);
       } 
    });
}