"use strict";

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
// process feature layer type
export const createMapLegendFS = (layer, legendElement) => {
    L.esri.request(layer.options.url, {}, function(error, response) {
        if (error) {
            console.error(`There was an error creating the map legend for ${layer.options.url}`);
            console.error(error);
        } else {
            if (response.drawingInfo.renderer.type ===  'uniqueValue') {
                // remove existing legend items
                removeZoningFromLegend();
                // create new legend items
                processUniqueValueRenderer(response, legendElement);
            } else {
                console.log(`symbology type for ${layer.options.url} is ${response.drawingInfo.renderer.type}.  Was expecting "uniqueValue" renderer`);
            }

        }
    });
}

const processUniqueValueRenderer = (response, legendElement) => {
    // details for renderer drawing information
    const uniqueValuesGroup = response.drawingInfo.renderer.uniqueValueInfos;

    // loop through array and create legend elements
    uniqueValuesGroup.forEach(element => {
        let legendContent = '<ul class="feature-service-legend-item">';
        legendContent += `<li>${element.label} (Generalized Zoning District)</li>`;
        legendContent += `<li><svg width="80" height="40"><rect width="75" height="35" style="fill:rgb(${element.symbol.color[0]},${element.symbol.color[1]}, ${element.symbol.color[2]});stroke:#000;stroke-width:0;fill-opacity:0.65" /></svg></li>`;
        legendContent += "</ul>";
        $(legendElement).append(legendContent);
    });
}

// remove existing zoning district legend items
const removeZoningFromLegend = () => {
    // get collection of existing elements
    const zoningLegendElements = document.getElementsByClassName('feature-service-legend-item');
    // remove items from DOM
    for (let item of zoningLegendElements) {
        item.remove();
    }
}