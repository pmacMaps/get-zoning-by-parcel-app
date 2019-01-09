"use strict";

// function to get zoning district for parcel
// use intersects method (query) to catch cases where multiple zones are within a parcel
function getParcelZoningDistrict(parcel,zoningURL,resultsElement, resultsPanel) {
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
          for (let i = 0; i < response.features.length; i++) {
             // fields from service
            const zoningDistrictName = response.features[i].properties.ZoneName;
            const zoningDistrictCode = response.features[i].properties.ZoneCode; 
            const zoningDistrictCategory = response.features[i].properties.ZoneType;
            
            // array to hold results for each zoning district  
            let resultsArray = [];
            resultsArray[0] = zoningDistrictName;
            resultsArray[1] = zoningDistrictCode;
            resultsArray[2] = zoningDistrictCategory;
            
            // add array for each zoning district to master array            
            zoningInfo.push(resultsArray);
          }         

         // call populate results function
         populateResults(zoningInfo, resultsElement, resultsPanel);  
      }       
    });
}

// function to select parcel based upon pin
function selectParcelByPin(pin, taxParcelLayer, resultsElement, resultsPanel) {
   // attribute query expression
   const queryString = "PIN = '" + pin + "'";
   // tax parcel service
   // if tps1 keeps producing errors, use tps2 or tps3
   const tps1 = '//gis.ccpa.net/arcgiswebadaptor/rest/services/Tax_Assessment/Parcels/MapServer/42';
   const tps2 = 'https://services1.arcgis.com/1Cfo0re3un0w6a30/ArcGIS/rest/services/TaxParcelsBackup/FeatureServer/0';
   const tps3 = '//gis.ccpa.net/arcgiswebadaptor/rest/services/Parcels/MapServer/42';
     
   // query request - where method
   L.esri.query({url: tps1}).fields(['PIN', 'SITUS', 'MUNI_NAME', 'OWNER']).where(queryString).run(function(error,response) {
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
        taxParcelLayer.bindPopup(function(layer) {
           let popupContent = '<div class="feat-popup">';
           popupContent += '<h3>Parcel: {PIN}</h3>';
           popupContent += '<ul>';
           popupContent += '<li>Address: {SITUS}</li>';
           popupContent += '<li>Municipality: {MUNI_NAME}</li>';
           popupContent += '<li>Owner: {OWNER }</li>';
           popupContent += '</ul>';
           popupContent += '</div>';
           
           return L.Util.template(popupContent, layer.feature.properties);
           
        }, {maxWidth: setPopupMaxWidth(windowWidth)});
        
        // set map around selected parcel
        map.fitBounds(taxParcelLayer.getBounds());
      
        // call zoning query function
        getParcelZoningDistrict(taxParcelLayer,selectZoningService(pin), resultsElement, resultsPanel);   
       } 
    });
}