const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
        Title: { type: String, required: true },
        Year: Number,
        Description: { type: String, required: true },
        Genres: [String],
        Directors: [String],
        Actors: [String],
        ImagePath: String,
        Featured: Boolean,
});

const userSchema = new mongoose.Schema({
        Username: { type: String, required: true },
        Password: { type: String, required: true },
        Email: { type: String, required: true },
        Birthday: Date,
        Favslist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

const directorSchema = new mongoose.Schema({
        Name: { type: String, required: true },
        YearOfBirth: Number,
        Bio: String,
});

const genreSchema = new mongoose.Schema({
        Name: { type: String, required: true },
        Description: String,
});

const actorSchema = new mongoose.Schema({
        Name: { type: String, required: true },
        YearOfBirth: Number,
        Bio: String,
});

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);
const Director = mongoose.model('Director', directorSchema);
const Genre = mongoose.model('Genre', genreSchema);
const Actor = mongoose.model('Actor', actorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
module.exports.Actor = Actor;
