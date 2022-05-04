import { map } from 'leaflet';

// center coordinates for map
const homeCoords = [40.15, -77.25];

// PA State Plane South (ft) projection
/*
const spcPACrs = new L.Proj.CRS('EPSG:2272', '+proj=lcc +lat_1=40.96666666666667 +lat_2=39.93333333333333 +lat_0=39.33333333333334 +lon_0=-77.75 +x_0=600000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs',  {
    origin: [-1.192142E8, 1.461669E8],
    resolutions: [
      260.41666666666663,
      86.80555555555556,
      43.40277777777778,
      20.833333333333332,
      10.416666666666666,
      6.944444444444444,
      4.166666666666666,
      2.083333333333333,
      1.0416666666666665,
      0.5208333333333333
    ]
});
*/
/*** Map Objects ***/
export const webmap = map('map', {
    center: homeCoords,
    zoom: 15,
    zoomControl: false
    //crs: spcPACrs,
    //: 0,
    //maxZoom: 9
});

// create panes to control layer ordering
// zoning feature layer pane
webmap.createPane('zoning');
// tax parcels standard
webmap.createPane('parcels');
// tax parcels from search
webmap.createPane('parcelsSearch');