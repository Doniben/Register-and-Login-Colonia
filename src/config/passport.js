const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); 
const UserTemp = require('../models/UserTemp');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // Match Email's User
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'Usuario no encontrado.' });
  } else {
    // Match Password's User
    /* const match = await user.matchPassword(password); */
    if(password) {
      const userTemp = await UserTemp.findOne({email: email});
      if(userTemp) {
        return done(null, false, { message: 'El usuario ya ingresó en una sesión' });
      } else {
        const newTempUser = new UserTemp({ email, password });
        newTempUser.password = await newTempUser.encryptPassword(password);
        await newTempUser.save();
        return done(null, user);
      }
    } else {
      return done(null, false, { message: 'Contraseña incorrecta.' });
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
