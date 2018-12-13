var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/start", function(req, res) {
    res.render("index");
  });

  app.get("/resume", function(req, res) {
    res.render("resume", {});
  });

  app.post("/start", function(req, res) {
    db.Game.create(req.body).then(function(game) {
      res.json(game);
    }).catch(function(err) {
      res.json(err);
    });
  });

 app.get("/newgame/", (req, res)=>{
   res.render("newGame")
 })
  // Load example page and pass in an example by id
  app.get("/login",(req,res)=>{
    res.render("login")
  })
  app.get("/game/:id", (req,res)=>{
    db.Character.findOne({
      where: {
      id: req.params.id
      }
    }).then((data)=>{
      hbsObject = {data: data}
      res.render("test", {
        hbsObject,
        layout:'game'
      })

    }
    )
  })
  app.get('/test/shop/:id', (req,res)=>{
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then(data=>{
      hbsObject= {data:data}
      res.render('testshop', hbsObject)
    })
   
  })
  app.get('/api/character/create', (req,res)=>{
    res.render('characterCreate')
  })
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
