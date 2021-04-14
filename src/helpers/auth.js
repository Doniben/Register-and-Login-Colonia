const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() || !req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not Authorized.');
  res.redirect('/users/signin');
};

module.exports = helpers;
