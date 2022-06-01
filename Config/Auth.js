const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Users = require('../Models/inscription');
const bcrypt = require('bcrypt');

passport.use(new localStrategy({usernameField: 'email'},(email, password, done) =>{
    Users.findOne({email}, async(err, user) => {
        if (err) { return done(err, {msg: "Utilisateur n'existe pas"}); }
        if (!user) { return done(null, false, {msg: "Utilisateur ou mot de passe incorrect"}); }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) { return done(null, false, {msg: "Utilisateur ou mot de passe incorrect"}); }
        return done(null, user);
    })
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    Users.findById(id, function (err, user) {
      done(err, user);
    });
  });