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
  //working!!!!!
  //figure out res redirect
  app.put("/character/hp/:id", (req, res)=>{
    id = req.params.id
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then(data =>{
      if (req.body.hp === 'yes'){
        var hp = data.hp + 40
        if(hp > 2000){
          hp = 100
        }
        console.log(hp)
        db.Character.update({
             hp:hp,
             },
            {
              where: {
                id:id
              }
            }).then((data)=>{
              res.redirect('/test/'+ id)})
      }
      else{
      var hp = data.hp - 50;
      db.Character.update({
        hp: hp,
        where: {
          id: id
        }
      }).then((data)=>{res.redirect('/test/'+ id)})
    }
    })
  })
  ////////////DISPLAY INVENTORY ID//////
  //////////working////////////////////
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
  app.post("/api/game/start/", (req, res)=>{
    db.Game.create({
      game_name: req.body.gameName
    }).then((data=>{
      res.redirect('/api/character/create')
    }))
  })

  app.post("/api/game/character/c/", (req,res)=>{
    db.Character.create({
      character_name: req.body.characterName
    }).then((data)=>{
      var id= data.id;
      db.Game.update({
        CharacterId: id,
        
      },
      {
        where: {
          id: id
        }
      }).then((data)=>{
         res.redirect("/test/" + id)
      })
    }
    )
  })
} 



  // Create a new example

