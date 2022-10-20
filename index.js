const express = require('express');
const morgan = require('morgan');
const app = express();

let tenMovies = [
    {
        title: 'Black Panther',
        director: ['Ryan Coogler']
    },
    {
        title: 'The Big Sick',
        director: ['Michael Showalter']
    },
    {
        title: 'Get Out',
        director: ['Jordan Peele']
    },
    {
        title: 'Soul',
        director: ['Pete Docter']
    },
    {
        title: 'Self Made',
        director: ['Kasi Lemmons, DeMane Davis']
    },
    {
        title: 'Moonlight',
        director: ['Barry Jenkins']
    },
    {
        title: 'Heartbeats',
        director: ['Xavier Dolan']
    },
    {
        title: 'Paris Is Burning',
        director: ['Jennie Livingston']
    },
    {
        title: 'Disclosure',
        director: ['Sam feder']
    },
    {
        title: 'Passing',
        director: ['Rebecca Hall']
    }
]

app.use(morgan('common'));

app.use(express.static('public'));

// GET requests
app.get('/',(req,res)=>{
    res.send("<h1>This is just a default textual response. Nothing to worry about.</h1>")
})

app.get('/movies',(req,res)=>{
    res.json(tenMovies)
})

// Error request
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh oh, something went wrong!');
  });

// listen for requests
app.listen(8080, (req,res) => {
    console.log('My app is listening on port 8080!');
});