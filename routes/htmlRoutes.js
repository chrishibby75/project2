var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      layout: 'main'
    });
  });

  app.get("/start", function(req, res) {
    res.render("index",  {
      layout: 'main'
    });
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
   res.render("newGame",  {
    layout: 'main'
  })
 })
 app.get("/gameover/", (req,res)=>{
   res.render("login")
 })
  // Load example page and pass in an example by id
  app.get("/login",(req,res)=>{
    res.render("login",  {
      layout: 'main'
    })
  })
  app.get("/game/:id", (req,res)=>{
    db.Character.findOne({
      where: {
      id: req.params.id
      }
    }).then((data)=>{
      hbsObject = {data: data}
      //res.render("test", hbsObject)
      db.Game.findOne({
        where:{
          id: data.id
        }
      }).then(data=>{
        console.log("this is the data" +data.id)
        hbsObject.data2 = data
       console.log(hbsObject.data2)
        res.render('test', hbsObject)
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
      hbsObject= {data: data}
      res.render('testshop', hbsObject)
    
    })
   
  })
  app.get('/api/character/create', (req,res)=>{
    res.render('characterCreate', {
      layout: 'icantbeliveimdoingthis'
    })
  })
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
