var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {});
  });

  app.get("/start", function(req, res) {
    res.render("login", {});
  });

  app.post("/start", function(req, res) {
    db.Game.create(req.body).then(function(game) {
      res.json(game);
    }).catch(function(err) {
      res.json(err);
    });
  });


  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
