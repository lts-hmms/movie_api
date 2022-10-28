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
            res.status(201).json(movies);
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
            res.status(201).json(genres);
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
            res.status(201).json(directors);
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
            res.status(201).json(actors);
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
            res.status(201).json(users);
        })
        .catch((err)=>{
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
})

// get specific movie
app.get('/movies/:title',(req,res)=>{
    res.json(movies.find((movie)=>{
        return movie.title ===req.params.title;
    }))
})

// get genre description by name
app.get('/movies/:title/genre/:name',(req,res)=>{
    let movie = movies.find((movie)=>{return movie.title ===req.params.title});
    let genreArr =movie.genre;
    for (let i=0; i<genreArr.length; i++){
    if (genreArr[i].name === req.params.name){
        res.send('Description of ' + req.params.name + ': ' + genreArr[i].description);
    } else {
        res.send('Sorry, genre not found');
    }
   }
   })

// get director data by name
app.get('/movies/:title/director/:name',(req,res)=>{
    let movie = movies.find((movie)=>{return movie.title ===req.params.title});
    res.json(movie.director);
    })




// get user by id
app.get('/users/:id',(req,res)=>{
    res.json(users.find((user)=>{
        return req.params.id === user.id}));
    });

// add user 
// app.post('/users',(req,res)=>{
//     let newUser = req.body;

//     if (!newUser.username){
//         const message = 'Username is missing in request body';
//         res.status(400).send(message);
//     } else {  
//         newUser.id = uuid.v4();
//         users.push(newUser);
//         res.status(201).send('User added');
// }
// })

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

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
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error)=>{
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
});

// update username 
app.put('/users/:id/:username',(req,res)=>{
    let user = users.find((user)=>{
        return user.id === req.params.id
    });
    if (user) {
        user.username = req.params.username;
        res.status(201).send('Username changed to ' + user.username);
} else {
    res.status(404).send('User not found.');
}});

// deregister user
app.delete('/users/:username',(req,res)=>{
    // DOES NOT WORK, BUT WHY? EMPTY ARRAY
    // users = users.filter((user) => {
    //     req.params.username !== user.username
    // })

for (let i=0; i<users.length; i++){
    if(users[i].username === req.params.username){
        users.splice(i,1);
    }
}
    res.send('Your user ' + req.params.username + ' was deleted!')
});

// add movie to favorites
app.post('/users/:username/favorites',(req,res)=>{
    let user = users.find((user) => {
        return user.username === req.params.username});
    let newMovie = req.body;
    if (user.favorites.indexOf(newMovie) === -1){
        user.favorites.push(newMovie);
        res.status(201).send('Movie added to your Favslist');
    } else {
        res.send('Movie is already in your Favslist');
    }});

// remove movie from favorites
app.delete('/users/:username/favorites/:title',(req,res)=>{
    let user = users.find((user) => {
        return user.username === req.params.username});
    for (let i=0; i<user.favorites.length; i++){
        if(user.favorites[i].title === req.params.title){
            user.favorites.splice(i,1);
        }
    }
        res.send('Movie ' + req.params.title + ' was removed from your Favslist!');
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