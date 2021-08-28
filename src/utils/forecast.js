const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=19fc8946a962c2b7e155848f77e6d4bc&query=' + latitude + ',' + longitude + '&units=m' 
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log('Unable to find location', undefined)
        } else {
           callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +' degrees. It feels like ' + body.current.feelslike + ' degrees. The humidity is ' + body.current.humidity + "." )
        }
    })
}

module.exports = forecast