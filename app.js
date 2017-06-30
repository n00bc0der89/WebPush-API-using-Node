const webpush = require('web-push');
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static('images'));
app.use(express.static('scripts'));

app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile); //Specify view engine 
app.use(bodyParser.urlencoded({extended : true}));

const urlsafeBase64 = require('urlsafe-base64');


const vapidKeys = webpush.generateVAPIDKeys()

const decodedVapidPublicKey = urlsafeBase64.decode(vapidKeys.publicKey);

var udata = {
    // Create a view
    data: Array.apply(null, new Uint8Array(decodedVapidPublicKey)),
    contentType: 'x-an-example'
};

app.get('/',function(req,res){
    var data = { "decodedVapidPublicKey" : udata};
     res.render("index",data);     
});

app.post('/push', function(request, response) {
  const subscription = request.body.subscription;
  const message = request.body.message;

  setTimeout(() => {
    const options = {
      TTL: 24 * 60 * 60,
      vapidDetails: {
        subject: 'mailto:sender@example.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey
      },
    }

    webpush.sendNotification(
      subscription,
      message,
      options
    );

  }, 0);

  response.send('OK');
});

var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0",function(){
	console.log("Started server on port 3000 !!!");
});