export const getSymbology = (url) => {
    fetch(`${url}?f=json`)
    .then(response => response.json())
    .then(data => {
       if(data.hasOwnProperty('drawingInfo')) {
            if (data.drawingInfo.hasOwnProperty('renderer')) {
                console.log(data.drawingInfo.renderer);
                // if type === 'uniqueValue'
                // get symbology from 'uniqueValueInfos'
                // create object/array to store that data
                // return that data
                // use the returend data to symbolize layer
            }
        }
    })
    .catch(error => {
        console.warn(`Error: ${error}`);
    })
}