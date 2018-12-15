var db = require("../models");

module.exports = function (app) {
  // get data for the game

  app.get("/game", (req,res)=>{
       res.render("game")

  })
  //API to update the characters
  //If they take a potion it increases health
  //If take damage decreases health
  //max HP is 100 
  //tested
  app.post("/character", (req, res) => {
    dp.Character.create({

      name: req.body.name
    }).then((data) => {
      res.json(data)
    })
  })
  app.get("/character/hp/:id", (req, res) => {
    id = req.params.id
    db.Character.findOne({
      where: {
        id: id
      }
    }).then(data => {
      res.json(data.hp)
    })
  })

  app.get("/character/all", (req, res) => {
    id = req.params.id
    db.Character.findAll().then(data => {
      res.json(data)
    })
  })
  ///UPDATE CHARACTER ID
  //working!!!!!
  //figure out res redirect
  ///reduce working
  app.put("/character/hp/:id", (req, res) => {
    
    id = req.params.id
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then(data => {
      if (req.body.hp === 'yes') {
        var hp = data.hp + 40
        if (hp > 2000) {
          hp = 100
        }
        db.Character.update({
          hp: hp,
        }, {
          where: {
            id: id
          }
        }).then((data) => {
         // res.redirect('/test/' + id)
        })
      } 
      else {
        var hp = data.hp - 50;
        db.Character.update({
          hp: hp,
        }, {
          where: {
            id: id
          }
        }).then((data) => {
          
        })
      }
    })
  })
  ////////////DISPLAY INVENTORY ID//////
  //////////working////////////////////
  /////////////////////////////////////
  app.get("/character/inventory/:id", function (req, res) {
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data.assets, data.gold, data.potion, data.food)
    });
  });

  app.post("/api/game/start/", (req, res) => {
    db.Game.create({
      game_name: req.body.gameName,
      password: req.body.password
    }).then((data => {
      hbsObject = {data:data}
      //passes the game id for the join
      res.redirect('/api/character/create', hbsObject )
    }))
  })
  //route for getting gold in the game
  app.put('/character/gold/:id', (req,res)=>{
    db.Character.findOne({
        where: {
          id: req.params.id
        }
    }).then((data)=>{
      gold = data.gold + 300
      db.Character.update({
        gold: gold
      },
    {
      where: {
        id: req.params.id
      }
    }).then(res.data)
    })
  })
  ///
  ///api call for buying things in the store in the game
  //_____________________________________________________
  app.put('/test/shop/character/weapons/:id', (req,res)=>{
    id= req.params.id
    item = req.body.item
    price = parseInt(req.body.price)
    quantity = parseInt(req.body.quantity)
    money= parseInt(req.body.money)
    value = price * quantity
    gold = money - value
    db.Character.update({
         gold: gold,
         assets: quantity
    }, {
      where: {
        id: id
      }
    }).then(()=>{
      db.Character.findOne({
        where:{
          id: id
        }
      }).then(data=>{
      hbsObject = {data:data}
      res.render("testshop", hbsObject)
      })
    })
  })
  app.put("/character/weapons/:id", (req,res)=>{
    id = req.params.id;
    db.Character.findOne({
        where: {
          id: id
        }
    }).then(data=>{
          console.log("The id" + data.id)
          id = data.id
          var weapon = data.assets;
          console.log(weapon)
          console.log(id)
          var newWeap = weapon - 1
          db.Character.update({
            assets: newWeap
          },{
            where:{
              id: id
            }
          }).then(res.redirect("/game/"+ id))
    })
  })
  ////
  ///route for creating a new character
  app.post("/api/game/character/c/", (req, res) => {
    id1 = req.body.gameid
    db.Character.create({
      character_name: req.body.characterName
      
    }).then((data) => {
      var id = data.id;
      db.Game.update({
        CharacterId: id1,

      }, {
        where: {
          id: id
        }
      }).then((data) => {
        res.redirect("/game/" + id)
      })
    })
  })
  app.put('/turnUpdate/:id/:turn', (req,res)=>{
    turn = req.params.turn
    db.Game.update({
      area: turn
    
    }, {
      where: {
        id: req.params.id
      }
    }).then((data)=>{
      
    })
  })

  app.post("/api/game/resume", (req, res) => {
    db.Game.findOne({ where: 
      {
        game_name: req.body.game_name.trim(),
        password: req.body.password.trim()
      }
    }).then((data => {
      console.log(data);
      res.redirect('/game/' + data.id);
    }))
  })

}



// Create a new example

// Create a new example