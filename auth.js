/**
 * @module auth
 * This module contains all the functions that are used to authenticate users when login in.
 */

const jwtSecret = 'your_jwt_secret'; // has to be the same key used in JWTStrategy
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport'); // my local passport file

/**
 * @function generateJWTToken
 * @param {User} user - the user object that will be encoded in the JWT
 * @returns {string} the JWT token
 * @description This function generates a JWT token that is signed with the JWT secret.
 */
const generateJWTToken = (user) =>
        jwt.sign(user, jwtSecret, {
                subject: user.Username, // this is the username i am encoding in the JWT
                expiresIn: '7d', // this specifies that the token will expire in 7 days
                algorithm: 'HS256', // this is the algorithm used to "sign" or encode the values of the JWT
        });

// POST user login
/**
 * @function (router) POST /login
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @description This function authenticates the user and returns a JWT token.
 */
module.exports = (router) => {
        router.post('/login', (req, res) => {
                passport.authenticate('local', { session: false }, (error, user) => {
                        if (error || !user) {
                                return res.status(400).json({
                                        message: 'Something is not right',
                                        user,
                                });
                        }
                        req.login(user, { session: false }, (error) => {
                                if (error) {
                                        res.send(error);
                                }
                                const token = generateJWTToken(user.toJSON());
                                return res.json({ user, token });
                        });
                })(req, res);
        });
};
