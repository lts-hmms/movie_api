const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
uuid = require('uuid');

const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/myMoviesDB');
}

const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;
const Actors = Models.Actor;

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const options ={
    extensions: ['htm','html']
};


app.use(morgan('common'));

app.use(express.static('public',options));

// GET requests
app.get('/',(req,res)=>{
    res.send("<h1>This is just a default textual response. Nothing to worry about.</h1>");
})

// get all movies
app.get('/movies',(req,res)=>{
    //res.json(movies)
    Movies.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((error)=>{
            console.error(error);
            res.status(500).send('Error ' + err);
        })
});

// get all genres
app.get('/genres',(req,res)=>{
    Genres.find()
        .then((genres) => {
            res.status(200).json(genres);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
})

// get all directors
app.get('/directors',(req,res)=>{
    Directors.find()
        .then((directors) => {
            res.status(200).json(directors);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
})

// get all actors
app.get('/actors',(req,res)=>{
    Actors.find()
        .then((actors) => {
            res.status(200).json(actors);
        })  
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error ' + error);
        })
})  

// get all users
app.get('/users',(req,res)=> {
    Users.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err)=>{
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
});

// get user by username
app.get('/users/:Username',(req,res)=>{
    Users.findOne({Username: req.params.Username})
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
           console.error(error);
           res.status(500).send('Error: ' + error);     
        });
});


// get movie by title
app.get('/movies/:Title',(req,res)=>{
    Movies.findOne({Title: req.params.Title})
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error ' + error);
        })  
});

// get director by name
app.get('/directors/:Name', (req,res) => {
    Directors.findOne({Name: req.params.Name})
        .then((director) => {
            res.status(200).json(director);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
})  

// get genre by name
app.get('/genres/:Name',(req,res)=>{
    Genres.findOne({Name: req.params.Name})
        .then((genre) => {
            res.status(200).json(genre);
        })
        .catch((error)=>{
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
})

// add user
app.post('/users',(req,res)=>{
    Users.findOne({Username:req.body.Username})
        .then((user)=>{
            if(user){
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users.create({
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email:req.body.Email,
                    Birthday: req.body.Birthday
                })
                .then((user)=>{res.status(201).json(user)})
                .catch((error)=>{
                    console.error(error);
                    res.status(500).send('Error: ' + error)
                })
            }
        })
        .catch((error)=>{
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
});

// update user data
app.put('/users/:Username',(req,res)=>{
    Users.findOneAndUpdate({Username: req.params.Username},
        {$set:
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Email:req.body.Email,
                Birthday: req.body.Birthday
            }
        },
        {new: true}) // this makes sure that the updated document is gonna returned
        .then((updatedUser) => {
            res.status(201).json(updatedUser)})
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error)})
})

// add movie to favorites
app.post('/users/:Username/movies/:MovieID',(req,res)=>{
    Users.findOneAndUpdate({Username: req.params.Username},
        {$addToSet: {Favslist: req.params.MovieID}},
        {new:true})
        .then((updatedUser) => {
            res.status(201).json(updatedUser)})
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error)})
})

// remove movie from favorites
app.delete('/users/:Username/movies/:MovieID',(req,res)=>{
    Users.findOneAndUpdate({Username: req.params.Username},
        {$pull: {Favslist: req.params.MovieID}},
        {new:true})
        .then((updatedUser) => {
            res.status(201).json(updatedUser)})
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error)})
});
               
// deregister user
app.delete('/users/:Username',(req,res)=>{
    // DOES NOT WORK, BUT WHY? EMPTY ARRAY
    // users = users.filter((user) => {
    //     req.params.username !== user.username
    // })
    Users.findOneAndDelete({Username: req.params.Username})
        .then((user)=> {
            if(!user) {
                res.status(400).send(req.params.Username + ' not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.')}
        })
        .catch((error => {
            console.error(error);
            res.status(500).send('Error: ' + error)}
            ))
});


// Error request
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh oh, something went wrong!');
  });

// listen for requests
app.listen(8080, (req,res) => {
    console.log('My app is listening on port 8080!');
});

