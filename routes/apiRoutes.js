var db = require("../models");

module.exports = function (app) {
  // get data for the game
  app.get("/game", (req, res) => {
    res.render("game")
  })

  app.get("/character/all", (req, res) => {
    id = req.params.id
    db.Character.findAll().then(data => {
      res.json(data)
    })
  })
  //update characters hp weather they take damage
  //or take a potion
  // req.body.hp is either passes as yes or no which determines it
  app.put("/character/sleepy/:id", (req,res)=>{
    id = req.params.id;
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then(data=>{
      var food = data.food;
      food1 = food - 1;
      console.log(food1)
      db.Character.update({
        food: food1,
        sleepy: 'no'
      },
    {
      where: {
        id: id
      }
    })
    }).then(res.redirect("/game/"+id))
  })
  app.put("/character/game/hp/:id", (req, res) => {

    id = req.params.id
    
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then(data => {
      potion = data.potion;
      potion1 = potion - 1
      if (req.body.hp == 'yes') {
        var hp = data.hp + 40
        console.log(hp)
        if (hp > 100) {
          hp = 100
        }
        db.Character.update({
          hp: hp,
          potion: potion1
        }, {
          where: {
            id: id
          }
        }).then((data) => {
          res.redirect('/game/' + id)
        })
      } else {
        var hp = data.hp;
        var hp1 = data.hp -45
        db.Character.update({
          hp: hp1,
        }, {
          where: {
            id: id
          }
        }).then((data) => {
          res.redirect("/game/" + id)
        })
      }
    })
  })

  //creates a new character with name and passoword
  app.post("/api/game/start/", (req, res) => {
    db.Game.create({
      game_name: req.body.gameName,
      password: req.body.password
    }).then((data => {

      //passes the game id for the join
      res.redirect('/api/character/create')
    }))
  })
  //route for getting gold in the game
  app.put('/character/gold/:id', (req, res) => {
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then((data) => {
      gold = data.gold + 400
      db.Character.update({
        gold: gold
      }, {
        where: {
          id: req.params.id
        }
      }).then(res.redirect("/game/" + req.params.id))
    })
  })
  ///
  ///api call for buying things in the store in the game
  //_____________________________________________________
  app.put('/shop/character/weapons/:id', (req, res) => {

    var id = req.params.id
    item = req.body.item
    price = parseInt(req.body.price)
    var quantity = parseInt(req.body.quantity)
    money = parseInt(req.body.money)
    value = price * quantity
    gold = money - value
    console.log(item)
    if (item === "assets") {
      db.Character.findOne({
        where: {
          id: id
        }
      }).then(data => {
        quantity = data.assets + quantity
        db.Character.update({
          gold: gold,
          assets: quantity
        }, {
          where: {
            id: id
          }
        }).then(() => {
          db.Character.findOne({
            where: {
              id: id
            }
          }).then(data => {
            hbsObject = {
              data: data
            }
            res.render("testshop", hbsObject)
          })
        })
      })
    } else if (item == "potion") {
      db.Character.findOne({
        where: {
          id: id
        }
      }).then(data => {
        quantity = data.potion + quantity
        db.Character.update({
          gold: gold,
          potion: quantity
        }, {
          where: {
            id: id
          }
        }).then(() => {
          db.Character.findOne({
            where: {
              id: id
            }
          }).then(data => {
            hbsObject = {
              data: data
            }
            res.render("testshop", hbsObject)
          })
        })
      })
    } else {
      db.Character.findOne({
        where: {
          id: id
        }
      }).then(data => {
        quantity = data.food + quantity
        db.Character.update({
          gold: gold,
          food: quantity
        }, {
          where: {
            id: id
          }
        }).then(() => {
          db.Character.findOne({
            where: {
              id: id
            }
          }).then(data => {
            hbsObject = {
              data: data
            }
            res.render("testshop", hbsObject)
          })
        })
      })
    }
  })
  app.put("/character/weapons/:id", (req, res) => {
    id = req.params.id;
    db.Character.findOne({
      where: {
        id: id
      }
    }).then(data => {
      console.log("The id" + data.id)
      id = data.id
      var weapon = data.assets;
      var newWeap = weapon - 1
      db.Character.update({
        assets: newWeap
      }, {
        where: {
          id: id
        }
      }).then(res.redirect("/game/" + id))
    })
  })
  ////
  ///route for creating a new character
  app.post("/api/game/character/c/", (req, res) => {

    db.Character.create({
      character_name: req.body.characterName

    }).then((data) => {
      var id = data.id;
      db.Game.update({
        CharacterId: id,

      }, {
        where: {
          id: id
        }
      }).then((data) => {
        res.redirect("/game/" + id)
      })
    })
  })
  //tracks the characters place in the game
  app.put('/turnUpdate/:id/:turn', (req, res) => {
    turn = req.params.turn
    db.Game.update({
      area: turn

    }, {
      where: {
        id: req.params.id
      }
    }).then((data) => {

    })
  })
  //lets the character resume gameplay
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