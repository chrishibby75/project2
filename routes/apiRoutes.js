var db = require("../models");

module.exports = function(app) {
  // get data for the game
  app.get("/",(req,res)=>{

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
  //If they take a potion it increases health
  //If take damage decreases health
  //max HP is 100 
  app.get("/character/hp", (req, res) =>{
    id = req.body.id
    db.Character.findOne({
      where: {
        id: id
      }
    }).then(data=>{
      res.json(data.hp)
    })
  })
  app.put("/character/hp", (req, res)=>{
    id = req.body.id
    db.Character.findOne({
      where: {
        id: id
      }
    }).then(data =>{
      if (res.body.hp === yes){
        var hp = data.hp + 40
        if(hp > 100){
          hp = 100
        }
        db.Character.update({
             hp:hp,
             where: {
               id:id
             }
        })
      }
      else{
      var hp = data.hp - 50;
      db.Character.update({
        hp: hp,
        where: {
          id: id
        }
      })
    }
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
