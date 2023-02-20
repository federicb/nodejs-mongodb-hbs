const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user){
        //done sirve para terminar el proceso de autenticacion
        //null -> error - false -> no hay user - message
        return done(null, false, {message: 'Not user found.'})
    }else {
        const match = await user.matchPassword(password); //user.matchpassword es un metodo de la instancia de la clase 
        if(match){
            // null -> error - user -> true
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect password.'});
        }
    }
}));

//se almacena el id para que lo reconozca en la navegacion
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//inversa de serialize
passport.deserializeUser((id, done) => {
    //si hay usuario en sesion y lo encuentra retorna el user
    User.findById(id, (err, user) => {
        done(err, user);
    });
});