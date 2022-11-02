// user login
const jwtSecret = 'your_jwt_secret'; // this has to be the same key used in the JWTStrategy
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport'); // my local passport file

// eslint-disable-next-line prefer-const
let generateJWTToken = (user) =>
        jwt.sign(user, jwtSecret, {
                subject: user.Username, // this is the username i am encoding in the JWT
                expiresIn: '7d', // this specifies that the token will expire in 7 days
                algorithm: 'HS256', // this is the algorithm used to "sign" or encode the values of the JWT
        });

/* POST login */
module.exports = (router) => {
        router.post('/login', (req, res) => {
                passport.authenticate('local', { session: false }, (error, user, info) => {
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
