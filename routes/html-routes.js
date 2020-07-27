// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

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
    // render"members"ml"));
    res.render("members");
  });

  app.get("/saved", isAuthenticated, (req, res) => {
    res.render("saved", {
      recipes: [
        {
          label: "Chicken Paprikash",
          dietLabels: ["Low-Carb"],
          image:
            "https://www.edamam.com/web-img/e12/e12b8c5581226d7639168f41d126f2ff.jpg",
          ingredients: [
            {
              image:
                "https://www.edamam.com/food-img/491/4916353c22bd1ac381ac81d55597ddbe.jpg",
              text:
                "640 grams chicken - drumsticks and thighs ( 3 whole chicken legs cut apart)"
            }
          ],
          totalTime: "60",
          url: "http://norecipes.com/recipe/chicken-paprikash/"
        }
      ]
    });
  });
};
