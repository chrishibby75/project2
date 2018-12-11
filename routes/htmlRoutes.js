var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {});
  });
  app.get("/1", (req,res)=>{
    res.render("index2")
  })
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
  app.get("/test/login",(req,res)=>{
    res.render("testLogin")
  })
  app.get("/test/:id", (req,res)=>{
    db.Character.findOne({
      where: {
      id: req.params.id
      }
    }).then((data)=>{
      hbsObject = {data: data}
      res.render("test", hbsObject)

    }
    )
  })
  app.get('/api/character/create', (req,res)=>{
    res.render('testLogin1')
  })
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
