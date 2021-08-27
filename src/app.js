const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views locaiton
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Shireen'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Shireen'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Shireen'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            
            res.send(
                {
                    forecast: forecastData,
                    location,
                    address: req.query.address
                }   
            )
      })
    })

    
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
         return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        roducts: []
    })
    
    
  
})


app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Shireen',
        msg: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Shireen',
        msg: 'My 404 page'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})