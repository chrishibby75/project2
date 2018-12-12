var chai = require("chai")
var chaiHttp = require("chai-http")
chai.use(chaiHttp);
server = require("../server");
db = require('../models')
api = require('../routes/apiRoutes')
var request;
describe('GET /character/hp/:id ', function(){
    beforeEach(function() {
        request = chai.request(server)
        return db.sequelize.sync({force:true})
    });
    it("should return a characters hp by the id", (done)=>{
        db.Example.bulkCreate([
            {character_name:'test', 
        
            {character_name:"test }
        ]).then(function(){
            request.get('/character/hp/:id').end(function(err,res){
                var responseStatus = res.status;
                var responseBody = res.body
            })
            done()
        })
    })
})
