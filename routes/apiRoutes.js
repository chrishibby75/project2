var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/", (req,res)=>{

    db.Game.findAll({
          
        })
        .then(data => {
            var hbsObject = {
                game: data
            };
            res.render("index", hbsObject)
        })
})
  app.get("/game", (req,res)=>{
       res.render("game")
  })
  //API to update the characters 
  app.put("/character/hp", (req, res)=>{
    id = req.body.id
    db.Character.findOne({
      where: {
        id: id
      }
    }).then(data =>{
      var hp = data.hp - 40;
      db.Character.update({
        hp: hp,
        where: {
          id: id
        }
      })
    })
  })
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
