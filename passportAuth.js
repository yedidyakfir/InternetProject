const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserDB = require('./model')('Users');



module.exports = function (passport) {
    //////this is for login and identifaction

    passport.use(UserDB.createStrategy());
    passport.serializeUser(UserDB.serializeUser());
    passport.deserializeUser(UserDB.deserializeUser());

    passport.use(new GoogleStrategy({
            clientID: '360063253601-tqu1os8a3it3qlmnm98gn0tm8n917e55.apps.googleusercontent.com',
            clientSecret: 'Z5NQ14WJhAAg-vAHBd98Tluh',
            callbackURL: "http://localhost:3000/users/googleAuth/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                UserDB.findOne({'google.id': profile.id}, function(err, user){
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    else {
                        var newUser = new UserDB();
                        newUser.email = profile.emails[0].value;
                        newUser.google.id = profile.id;
                        newUser.google.token = accessToken;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value;

                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });
                        console.log(profile);
                    }
                });
            });
        }
    ));
};