var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  //app.get("/test/login",(req,res)=>{
  //  res.render("testLogin")
  //})
  //app.get("/test", (req,res)=>{
  //  db.Character.findOne({
  //    where: {
  //      id: 1
  //    }
  //  }).then((data)=>{
  //    hbsObject = {data: data}
  //    res.render("test", hbsObject)

  //  }
  //  )
  //})
  //app.get('/api/character/create', (req,res)=>{
  //  res.render('testLogin1')
  //})
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
