const request = require('request');

const forecast = (latitude, longitude, callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=ac4b3f9f14688dbecf3c02ca6e3492da&query=' + latitude + ',' + longitude + '&units=m';
    request({ url, json: true }, (error, { body }) =>
    {
        if (error) callback('Unable to connect to weather service!!', undefined);
        else if (body.error) callback('Unable to find the Location', undefined);
        else
        {
            callback(undefined, body.current.weather_descriptions[0] +
                ', It is Currently ' + body.current.temperature + ' degreeC but it feels like ' + body.current.feelslike + ' degreeC')
        }
    });
}

module.exports = forecast;