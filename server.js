var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoskin = require("mongoskin");
var db = mongoskin.db("mongodb://@localhost:27017/sdvDatabase", {safe:true});
var port = 5000;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('port', (process.env.PORT || port));
app.post('/login', function(req, res) {
    console.log('Checking login of ' + req.body["username"] + "/" + req.body["password"]);
    var username = req.body["username"];
    var password = req.body["password"];
    db.collection('Users').find({username:username, password:password}).toArray(function(err, result) 
        {
            if(err) throw err;
            var logResult = 0;
            if(result.length==1) logResult = "success";
            else logResult = "failed";
            res.send({result:logResult});
        });
});
app.listen(port, function()
    {
        console.log("listen on " + port);    
    }
);