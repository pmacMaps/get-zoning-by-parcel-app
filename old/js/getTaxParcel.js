"use strict";

import {showElement, hideElement} from './functions.js';
import {selectZoningService} from './selectZoningService.js';
import {getZoningDistrict} from './getZoningDistrict.js';
import {setMuniName, getMuniName} from './municipalityContent.js';
import {addZoningLayerToMap} from './manageZoningLayer.js';
import {setPopupMaxWidth} from './map-functions.js';

// viewport width
const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// function to query parcel based upon pin
export const selectParcelByPin = (webmap, pin, resultsElement, source, taxParcelLayer) => {
    // attribute query expression
    const queryString = "Link = '" + pin + "'";
    // tax parcel service
    const taxParcelService = 'https://services1.arcgis.com/1Cfo0re3un0w6a30/ArcGIS/rest/services/Tax_Parcels/FeatureServer/0';

    // query request - where method
    L.esri.query({url: taxParcelService}).fields(['Link', 'SITUS', 'MUNI_NAME', 'OWNER']).where(queryString).run(function(error,response) {
      // error running query
      if (error) {
          // add message to console
          console.warn('An error with the parcels service request has occured');
          console.warn(`Code: ${error.code}; Message: ${error.message}`);
          // set content of results element
          resultsElement.innerHTML = 'An error getting the parcel has occured. Please try again or contact Cumberland County GIS at (717) 240-7842 or gis@ccpa.net.';
          // hide waiting text
          hideElement('resultsWaiting');
          // show results
          showElement('zoningResults');
       } // no features returned
       else if (response.features < 1) {
          // add message to console
          console.log('No parcel features returned');
          // set content of results element
          resultsElement.innerHTML = 'No matching property was found. Please check the street address or PIN you entered and try again.  If problems persists, contact Cumberland County GIS at (717) 240-7842 or gis@ccpa.net.';
          // hide waiting text
          hideElement('resultsWaiting');
          // show results
          showElement('zoningResults');
       } // at least one feature returned
       else {
         // create parcel object when function called from search widget
         if (source === 'search') {
            // add data to geojson object
            taxParcelLayer.addData(response);
            // style feature
            taxParcelLayer.setStyle(function() {
               return {
                     fillOpacity: 0,
                     color: '#fff',
                     opacity: 1,
                     weight: 4
               }
            });

            // bind popup
            taxParcelLayer.bindPopup(function(layer) {
               let popupContent = '<div class="feat-popup">';
               popupContent += '<ul>';
               popupContent += '<li>Address: {SITUS}</li>';
               popupContent += '<li>Municipality: {MUNI_NAME}</li>';
               popupContent += '<li>PIN: {Link}</li>';
               popupContent += '<li>Owner: {OWNER}</li>';
               popupContent += '</ul>';
               popupContent += '</div>';

               return L.Util.template(popupContent, layer.feature.properties);

            }, {maxWidth: setPopupMaxWidth(windowWidth)});

            // set map around selected parcel
            webmap.fitBounds(taxParcelLayer.getBounds());

            // open popup on map
            taxParcelLayer.openPopup();
         }

         // following runs from all sources
         // get municipal name
         const municipality = getMuniName(pin);
         // set content for municpality
         setMuniName(municipality);

         // call zoning query function
         // wrap in loop in case multiple records for a specific parcel ID
         response.features.forEach(function(feature) {
            getZoningDistrict(webmap, feature.geometry, selectZoningService(pin), resultsElement);
         });

         // add zoning layer to map
         addZoningLayerToMap(webmap, selectZoningService(pin), 'zoning');
        }       
     });
 }