const User = require('../models/user');

// Register a user
module.exports.renderRegisterForm = (req, res) => {
   res.render('users/register');
};

module.exports.register = async (req, res) => {
   try {
      const { username, email, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
         if (err) return next(err);
         req.flash('success', 'Welcome to YelpCamp!!');
         res.redirect('/campgrounds');
      }); // To login immediately after registering.
   } catch (e) {
      req.flash('error', e.message);
      res.redirect('/register');
   }
};

// Login a user
module.exports.renderLoginForm = (req, res) => {
   res.render('users/login');
};

module.exports.login = (req, res) => {
   req.flash('success', 'Welcome back!');
   const redirectUrl = req.session.returnTo || '/campgrounds';
   delete req.session.returnTo;
   res.redirect(redirectUrl);
};

// Logout a user
module.exports.logout = (req, res) => {
   req.logout();
   req.flash('success', 'Goodbye. See you soon 😉');
   res.redirect('/campgrounds');
};
