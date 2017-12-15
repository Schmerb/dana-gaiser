'use strict';

const passport          = require('passport');
const { BasicStrategy } = require('passport-http');

const { User } = require('models/user');

// Strategy for validating user password
const basicStrategy = new BasicStrategy((username, password, done) => {
    let user;
    User
        .findOne({ username: username })
        .exec()
        .then(_user => {
            user = _user;
            if (!user) {
                return done(null, false);
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                return done(null, false);
            }
            else {
                return done(null, user);
            }
        })
        .catch(err => done(err));
});

// tells passport what strategy to use for
// user authentication (password validation)
passport.use(basicStrategy);


    // used to serialize the user for the session
passport.serializeUser(function(user, done) {
    console.log("USER:", user);
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;


