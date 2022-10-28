const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    Title:{type: String, required: true},
    Description:{type:String, required: true},
    Genre:[String],
    Director: [String],
    Actors:[String], 
    ImagePath: String,
    Featured: Boolean 
})

const userSchema = new mongoose.Schema({
    Username: {type:String, required: true},
    Password:{type:String, required: true},
    Email: {type:String, required: true},
    Birthday: Date, 
    Favslist:[{type:mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
})

const directorSchema = new mongoose.Schema({
    Name: {type:String, required:true},
    YearOfBirth: Number,
    Bio: String,
})

const genreSchema = new mongoose.Schema({
    Name: {type:String, required:true},
    Description: String,
})

const actorSchema = new mongoose.Schema({
    Name: {type:String, required:true},
    YearOfBirth: Number,
    Bio: String,
})

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User',userSchema);
let Director = mongoose.model('Director',directorSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Actor = mongoose.model('Actor',actorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
module.exports.Actor = Actor;