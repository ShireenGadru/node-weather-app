const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2M0MTEiLCJhIjoiY2tzb3FhY2xxMGk0bzJ2cXZhem9sNzR2aCJ9.ah9oM7cXUrPcpAQ9jZwXqg&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Location Service')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude :body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode