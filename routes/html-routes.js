// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const axios = require("axios");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });

  app.get("/saved", isAuthenticated, (req, res) => {
    if (!req.params.id) {
      return res.status(401).end();
    }
    axios
      .get(
        `https://still-sierra-23537.herokuapp.com/api/saveRecipe/${req.user.id}`
      )
      .then(response => {
        console.log(response.data);
        res.render("saved", {
          recipes: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
};
