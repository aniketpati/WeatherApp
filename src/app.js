const path = require('path')
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geoCode');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'Weather App',
        name: 'Aniket'
    });
});

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'About Me',
        name: 'Aniket'
    })
});

app.get('/help', (req, res) =>
{
    res.render('help', {
        title: 'Help',
        helpText: 'This is a test',
        name: 'Aniket'
    })
});

app.get('/weather', (req, res) =>
{
    if (!req.query.address)
    {
        return res.send({
            error: 'Need address in query'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) =>
    {
        if (error) return res.send({ error });

        forecast(latitude, longitude, (error, forecastData) =>
        {
            if (error) return res.send({ error })

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });
});

app.get('/help/*', (req, res) =>
{
    res.render('404', {
        name: 'Aniket',
        title: '404',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) =>
{
    res.render('404', {
        name: 'Aniket',
        title: '404',
        errorMessage: 'Page Not found'
    });
});


app.listen(3000, () =>
{
    console.log('Server is up at 3000');
});