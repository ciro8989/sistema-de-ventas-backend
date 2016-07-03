var mongoskin = require("mongoskin");
var db = mongoskin.db("mongodb://@localhost:27017/sdvDatabase", {safe:true});

// users collection creation
db.collection('Users').remove(onUsersRemoved);

function onUsersRemoved()
{
    console.log('Users removed.');
    db.collection('Users').insert(
    {
        username:"Admin",
        password:"Admin",
        type:"superUser"
    }, onAdminInserted);
}

function onAdminInserted(err, result) 
{
    console.log('Admin inserted.');
    if (err) throw err;
    if (result)
    {
        db.collection('Users').find({}, function(err, result) 
        {
            result.each(function(err, band)
            {
                console.log(band);
            });
        });
    }
};