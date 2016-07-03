var express = require('express');
var bodyParser = require("body-parser");
var mongoskin = require("mongoskin");
var db = mongoskin.db("mongodb://@localhost:27017/sdvDatabase", {safe:true});
var cors = require("cors");
var port = 5000;


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set('port', (process.env.PORT || port));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

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