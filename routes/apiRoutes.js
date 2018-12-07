var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/", (req,res)=>{
    var query = [];
    if (req.query.CustomerId) {
        query.Customer = req.query.CustomerId
    }
    db.Burger.findAll({
            include: db.Customer,
            where: query
        })
        .then(data => {
            var hbsObject = {
                burgers: data
            };
            res.render("index", hbsObject)
        })
})
  app.get("/game")
  app.get("/character/inventory:id", function(req, res) {
    db.Example.findAll({
      where: {

      }
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
