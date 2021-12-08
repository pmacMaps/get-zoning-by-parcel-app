"use strict";

// function to set name of municipality
export const setMuniName = (name) => {
   // element to display content
   const uiEl = document.getElementById('municipalName');
   // set content of element
   uiEl.innerHTML = name;
}

// function to get zoning service for spatial query
export const getMuniName = (pin) => {
   // first two digits of parcel (municipal code)
   const muniCode = pin.split("-")[0];
   // standard name for municipality
   let name;

   // set URL based upon muni code
   switch(muniCode) {
         // Camp Hill
         case '01':
            name = 'Camp Hill Borough';
            break;
         // Carlisle
         case '02':
            name = 'Carlisle Borough';
            break;
         case '03':
            name = 'Carlisle Borough';
            break;
          case '04':
            name = 'Carlisle Borough';
            break;
         case '05':
            name = 'Carlisle Borough';
            break;
         case '06':
            name = 'Carlisle Borough';
            break;
         case '49':
            name = 'Carlisle Borough';
            break;
         case '50':
            name = 'Carlisle Borough';
            break;
         case '51':
            name = 'Carlisle Borough';
            break;
         // Cooke
         case '07':
            name = 'Cooke Township';
            break;
         // Dickinson
         case '08':
            name = 'Dickinson Township';
            break;
         // East Pennsboro
         case '09':
            name = 'East Pennsboro Township';
            break;
          case '45':
            name = 'East Pennsboro Township';
            break;
          // Hampden
          case '10':
            name = 'Hampden Township';
            break;
          // Hopewell
          case '11':
            name = 'Hopewell Township';
            break;
          // Lemoyne
          case '12':
            name = 'Lemoyne Borough';
            break;
          // Lower Allen
          case '13':
            name = 'Lower Allen Township';
            break;
          // Lower Frankford
          case '14':
            name = 'Lower Frankford Township';
            break;
          // Lower Mifflin
          case '15':
            name = 'Lower Mifflin Township';
            break;
          // Mechanicsburg
          case '16':
            name = 'Mechanicsburg Borough';
            break;
         case '17':
            name = 'Mechanicsburg Borough';
            break;
         case '18':
            name = 'Mechanicsburg Borough';
            break;
         case '19':
            name = 'Mechanicsburg Borough';
            break;
         case '20':
            name = 'Mechanicsburg Borough';
            break;
         // Middlesex
         case '21':
            name = 'Middlesex Township';
            break;
         // Monroe
         case '22':
            name = 'Monroe Township';
            break;
         // Mt. Holly Springs
         case '23':
            name = 'Mt. Holly Springs Borough';
            break;
         // Newburg
         case '24':
            name = 'Newburg Borough';
            break;
         // New Cumberland
         case '25':
            name = 'New Cumberland Borough';
            break;
         case '26':
            name = 'New Cumberland Borough';
            break;
         // Newville
         case '27':
            name = 'Newville Borough';
            break;
         case '28':
            name = 'Newville Borough';
            break;
         // North Middleton
         case '29':
            name = 'North Middleton Township';
            break;
         // North Newton
         case '30':
            name = 'North Newton Township';
            break;
         // Penn
         case '31':
            name = 'Penn Township';
            break;
         // Shippensburg Boro
         case '32':
            name = 'Shippensburg Borough';
            break;
         case '33':
            name = 'Shippensburg Borough';
            break;
         case '34':
            name = 'Shippensburg Borough';
            break;
         case '35':
            name = 'Shippensburg Borough';
            break;
         // Shippensburg Township
         case '36':
            name = 'Shippensburg Township';
            break;
         // Shiremanstown
         case '37':
            name = 'Shiremanstown Borough';
            break;
         case '48':
            name = 'Shiremanstown Borough';
            break;
         // Silver Spring
         case '38':
            name = 'Silver Spring Township';
            break;
         // Southampton
         case '39':
            name = 'Southampton Township';
            break;
         // South Middleton
         case '40':
            name = 'South Middleton Township';
            break;
         // South Newton
         case '41':
            name = 'South Newton Township';
            break;
         // Upper Allen
         case '42':
            name = 'Upper Allen Township';
            break;
         // Upper Frankford
         case '43':
            name = 'Upper Frankford Township';
            break;
         // Upper Mifflin
         case '44':
            name = 'Upper Mifflin Township';
            break;
         // West Pennsboro
         case '46':
            name = 'West Pennsboro Township';
            break;
         // Wormleysburg
         case '47':
            name = 'Wormleysburg Township';
            break;
         // other municipalities
         default:
            name = '';
            break;
   }    
   return name;
}