const usersCtrl = {};

// Models
const User = require('../models/User');
const UserTemp = require('../models/UserTemp');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password } = req.body;
      // Saving a New User
  const newUser = new User({ name, email, password });
  await newUser.save();
  req.flash("success_msg", "¡Bienvenido!");
  res.redirect("/360");
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/360",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  const obj = JSON.parse(JSON.stringify(res.locals));
  const email = obj.user.email 

  /* const emailUser = async email => await UserTemp.findOne({ email: obj.user.email }); 
  UserTemp.deleteOne({ email: emailUser }); */

  UserTemp.deleteMany({ email: email }, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });

  req.flash("success_msg", "Has salido de tu sesión");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;