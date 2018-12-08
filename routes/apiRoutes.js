var db = require("../models");

module.exports = function(app) {
  // get data for the game
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
  //If they take a potion it increases health
  //If take damage decreases health
  //max HP is 100 
  //tested
  app.post("/character", (req, res) =>{
    dp.Character.create({
    
      name: req.body.name
    }).then((data)=>{
      res.json(data)
    })
  })
  app.get("/character/hp/:id", (req, res) =>{
    id = req.params.id
    db.Character.findOne({
      where: {
        id: id
      }
    }).then(data=>{
      res.json(data.hp)
    })
  })
  ///UPDATE CHARACTER ID
  app.put("/character/hp/:id", (req, res)=>{
    id = req.params.id
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then(data =>{
      if (res.body.hp === 'yes'){
        var hp = data.hp + 40
        if(hp > 100){
          hp = 100
        }
        console.log(hp)
        db.Character.update({
             hp:hp,
             where: {
               id:id
             }
        }).then(res.redirect('/game'))
      }
      else{
      var hp = data.hp - 50;
      db.Character.update({
        hp: hp,
        where: {
          id: id
        }
      }).then(res.redirect('/game'))
    }
    })
  })
  ////////////DISPLAY INVENTORY ID//////
  /////////////////////////////////////
  app.get("/character/inventory/:id", function(req, res) {
    db.Character.findOne({
      where: {
           id: req.params.id
      }
    }).then(function(data) {
      res.json(data.assets, data.gold, data.potion, data.food)
    });
  });
  
  app.


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
