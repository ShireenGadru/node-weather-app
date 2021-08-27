const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=19fc8946a962c2b7e155848f77e6d4bc&query=' + latitude + ',' + longitude + '&units=m' 
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log('Unable to find location', undefined)
        } else {
           callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +' degrees. It feels like ' + body.current.feelslike + ' degrees.')
        }
    })
    

}


module.exports = forecast