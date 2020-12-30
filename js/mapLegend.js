// return text for map legend alt text
const returnAltTextForLegend = (layerName, layerLabel) => {
    let appendText;
    if (layerLabel === "" || layerLabel === " ") {
        appendText = layerName;
    } else {
        appendText = layerLabel;
    }
    const altText = `alt="legend icon representing ${appendText}"`;
    return altText;
}

// create a legend element for a map service
export const createMapLegendMS = (url,element) => {
	// legend plugin uses dynamic map layer object
	const dynamicMapService = L.esri.dynamicMapLayer({url: url});
	dynamicMapService.legend(function(error, legend) {
		let html = '';
		if (!error) {
            legend.layers.forEach(element => {
                html += '<ul>'
                html += `<li><strong>${element.layerName}</strong></li>`;

                element.legend.forEach(item => {
                    const iconAlt = returnAltTextForLegend(element.layerName, item.label);

                    html += L.Util.template('<li><img ' + iconAlt + ' width="{width}" height="{height}" src="data:{contentType};base64,{imageData}"><span>{label}</span></li>', item);
                });

                html += '</ul>';

			});
        }  else {
			html += '<h4>There was an error creating the legend</h4>';
		}
		$(element).prepend(html);
	});
}

// create a legend element for a feature service