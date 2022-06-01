function isguest(req, res, next) {
    if (req.user) {
      res.redirect("/");
    } else {
      req.flash("message_error");
      next();
    }
  }
  function loggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/utilisateur/connexion");
    }
  }
  
  module.exports = { isguest, loggedIn };
  