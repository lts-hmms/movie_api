/**
 * @module passport
 * This module contains all methods that are used to authenticate users with Passport.
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const Models = require('./models.js');

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/**
 * @function (passport) LocalStrategy
 * @param {string} usernameField - the field that contains the username
 * @param {string} passwordField - the field that contains the password
 * @param {callback} callback - the callback function that will be called when the user is authenticated
 * @description This function authenticates the user using the local strategy.
 */
passport.use(
        new LocalStrategy(
                {
                        usernameField: 'Username',
                        passwordField: 'Password',
                },
                (username, password, callback) => {
                        Users.findOne({ Username: username }, (error, user) => {
                                if (error) {
                                        console.log(error);
                                        return callback(error);
                                }
                                if (!user) {
                                        console.log('Incorrect username');
                                        return callback(null, false, { message: 'Incorrect username.' });
                                }
                                if (!user.validatePassword(password)) {
                                        console.log('Incorrect password');
                                        return callback(null, false, { message: 'Incorrect password' });
                                }
                                console.log('finished');
                                return callback(null, user);
                        });
                }
        )
);

/**
 * @function (passport) JWTStrategy
 * @param {string} jwtFromRequest - the field that contains the JWT
 * @param {string} secretOrKey - the secret key used to sign the JWT
 * @param {callback} callback - the callback function that will be called when the user is authenticated
 * @description This function authenticates the user using the JWT strategy.
 */

passport.use(
        new JWTStrategy(
                {
                        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                        secretOrKey: 'your_jwt_secret',
                },
                (jwtPayload, callback) =>
                        Users.findById(jwtPayload._id)
                                .then((user) => callback(null, user))
                                .catch((error) => callback(error))
        )
);
