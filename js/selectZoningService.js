"use strict";

// function to get zoning service for spatial query
function selectZoningService(pin) {
   // base zoning url
   const baseUrl = 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Zoning/MapServer';
   // first two digits of parcel (municipal code)
   const muniCode = pin.split("-")[0];
   // zoning URL for municipality
   let zoningUrl;
   
   // set URL based upon muni code
   switch(muniCode) {
         // Camp Hill         
         case '01':
            zoningUrl = baseUrl + '/5';
            break;
         // Carlisle
         case '02':
            zoningUrl = baseUrl + '/6';
            break;
         case '03':
            zoningUrl = baseUrl + '/6';
            break;
          case '04':
            zoningUrl = baseUrl + '/6';
            break;
         case '05':
            zoningUrl = baseUrl + '/6';
            break;
         case '06':
            zoningUrl = baseUrl + '/6';
            break;
         case '49':
            zoningUrl = baseUrl + '/6';
            break;
         case '50':
            zoningUrl = baseUrl + '/6';
            break;
         case '51':
            zoningUrl = baseUrl + '/6';
            break;
         // Cooke
         case '07':
            zoningUrl = baseUrl + '/7';
            break;
         // Dickinson
         case '08':
            zoningUrl = baseUrl + '/8';
            break;
         // East Pennsboro
         case '09':
            zoningUrl = baseUrl + '/9';
            break;
          case '45':
            zoningUrl = baseUrl + '/9';
            break;
          // Hampden
          case '10':
            zoningUrl = baseUrl + '/10';
            break;
          // Hopewell
          case '11':
            zoningUrl = baseUrl + '/11';
            break;
          // Lemoyne
          case '12':
            zoningUrl = baseUrl + '/12';
            break;
          // Lower Allen
          case '13':
            zoningUrl = baseUrl + '/13';
            break;
          // Lower Frankford
          case '14':
            zoningUrl = baseUrl + '/14';
            break;
          // Lower Mifflin
          case '15':
            zoningUrl = baseUrl + '/15';
            break;
          // Mecchanicsburg
          case '16':
            zoningUrl = baseUrl + '/16';
            break;
         case '17':
            zoningUrl = baseUrl + '/16';
            break;
         case '18':
            zoningUrl = baseUrl + '/16';
            break;
         case '19':
            zoningUrl = baseUrl + '/16';
            break;
         case '20':
            zoningUrl = baseUrl + '/16';
            break;
         // Middlesex
         case '21':
            zoningUrl = baseUrl + '/17';
            break;
         // Monroe
         case '22':
            zoningUrl = baseUrl + '/18';
            break;
         // MT. Holly Springs
         case '23':
            zoningUrl = baseUrl + '/19';
            break;
         // Newburg
         case '24':
            zoningUrl = baseUrl + '/21';
            break;
         // New Cumberland
         case '25':
            zoningUrl = baseUrl + '/20';
            break;
         case '26':
            zoningUrl = baseUrl + '/20';
            break;
         // Newville
         case '27':
            zoningUrl = baseUrl + '/22';
            break;
         case '28':
            zoningUrl = baseUrl + '/22';
            break;
         // North Middleton
         case '29':
            zoningUrl = baseUrl + '/24';
            break;
         // North Newton
         case '30':
            zoningUrl = baseUrl + '/23';
            break;
         // Penn
         case '31':
            zoningUrl = baseUrl + '/25';
            break;
         // Shippensburg Boro
         case '32':
            zoningUrl = baseUrl + '/26';
            break;
         case '33':
            zoningUrl = baseUrl + '/26';
            break;
         case '34':
            zoningUrl = baseUrl + '/26';
            break;
         case '35':
            zoningUrl = baseUrl + '/26';
            break;
         // Shippensburg Township
         case '36':
            zoningUrl = baseUrl + '/27';
            break;
         // Shiremanstown
         case '37':
            zoningUrl = baseUrl + '/29';
            break;
         case '48':
            zoningUrl = baseUrl + '/29';
            break;
         // Silver Spring
         case '38':
            zoningUrl = baseUrl + '/28';
            break;
         // Southampton
         case '39':
            zoningUrl = baseUrl + '/30';
            break;
         // South Middleton
         case '40':
            zoningUrl = baseUrl + '/32';
            break;
         // South Newton
         case '41':
            zoningUrl = baseUrl + '/31';
            break;
         // Upper Allen
         case '42':
            zoningUrl = baseUrl + '/33';
            break;
         // Upper Frankford
         case '43':
            zoningUrl = baseUrl + '/34';
            break;
         // Upper Mifflin
         case '44':
            zoningUrl = baseUrl + '/35';
            break;
         // West Pennsboro
         case '46':
            zoningUrl = baseUrl + '/36';
            break;
         // Wormleysburg
         case '47':
            zoningUrl = baseUrl + '/37';
            break;
         // other municipalities
         default:
            zoningUrl = '';
            break;
   }    
   return zoningUrl;
}