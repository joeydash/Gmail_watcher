var express = require('express');
var router = express.Router();
/* GET home page. */


router.get('/', function(req, res, next) {
    var inbox = require("inbox");

    var client = inbox.createConnection(false, "imap.gmail.com", {
        secureConnection: true,
        auth:{
            user: "<emailid>",
            pass: "<password>"
        }
    });

    client.connect();

    client.on("connect", function(){
        client.openMailbox("INBOX", function(error, info){
            if(error) throw error;

            client.listMessages(-10, function(err, messages){
                messages.forEach(function(message){
                    console.log(message.UID + ": " + message.title);
                });
            });

        });
    });

  res.json({});
});

module.exports = router;
