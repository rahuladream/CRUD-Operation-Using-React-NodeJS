var mongo = require("mongoose");
var db = 
mongo.connect("mongodb://rahul:rahul4800@ds263670.mlab.com:63670/rhlcrupapp", function(err, response){
   if(err){ console.log('Failed to connect to ' + db); }
   else{ console.log('Connected to ' + db, ' + ', response); }
});


module.exports =db;

// rhlcrudapp is database name
// the server address is initiated from mlab.com
