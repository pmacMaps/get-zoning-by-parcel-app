export const locateControl = L.control.locate({
    position: "topleft",
    drawCircle: true,
    follow: false,
    setView: true,
    keepCurrentZoomLevel: false,
    markerStyle: {
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.8
      },
    circleStyle: {
        weight: 1,
        clickable: false
      },
    icon: "fa fa-location-arrow",
    iconLoading: "fa fa-spinner fa-spin",
    metric: false,
    onLocationError: function(err) {
        alert(err.message);
    },
    onLocationOutsideMapBounds: function(context) {
        alert(context.options.strings.outsideMapBoundsMsg);
    },
    strings: {
        title: "Find my location",
        popup: "You are within {distance} {unit} from this point",
        outsideMapBoundsMsg: "You seem to be located outside the boundaries of the map"
      },
    locateOptions: {
        maxZoom: 18,
        watch: true,
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
    }
});