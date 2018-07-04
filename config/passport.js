var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey =  'secret';
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.findOne({'_id' :jwt_payload.data._id}, function(err, user){
        if(err) {
            return done(err, false);
        }

        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
}
});
}));
}

