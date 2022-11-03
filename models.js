const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const movieSchema = new mongoose.Schema({
        Title: { type: String, required: true },
        Year: Number,
        Description: { type: String, required: true },
        Genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
        Directors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director' }],
        Actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
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

// hashes password, salt = 10 rounds
userSchema.statics.hashPassword = (password) => bcrypt.hashSync(password, 10);

userSchema.methods.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.Password);
};

const directorSchema = new mongoose.Schema({
        Name: { type: String, required: true },
        YearOfBirth: Number,
        Bio: String,
        Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

const genreSchema = new mongoose.Schema({
        Name: { type: String, required: true },
        Description: String,
        Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

const actorSchema = new mongoose.Schema({
        Name: { type: String, required: true },
        YearOfBirth: Number,
        Bio: String,
        Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
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
