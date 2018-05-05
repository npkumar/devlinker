const { Strategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { secretOrKey } = require('./keys');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
}

module.exports = passport => {
  passport.use(new Strategy(options, (jwtPayload, callback) => {
    User.findById(jwtPayload.id)
      .then(user => {
        if (user) {
          return callback(null, user);
        }

        return callback(null, false);
      })
      .catch(err => {
        console.log(err);
      });
  }));
}