var express = require('express');
var router = express.Router();
/* GET home page. */


router.get('/', function(req, res, next) {
    var inbox = require("inbox");

    var client = inbox.createConnection(false, "imap.gmail.com", {
        secureConnection: true,
        auth:{
            user: "joydassudipta@gmail.com",
            pass: "49591042"
        }
    });

    client.connect();

    client.on("connect", function(){
        client.openMailbox("INBOX", function(error, info){
            if(error) throw error;

            client.listMessages(-10, function(err, messages){
                var datas = [];
                var data;
                messages.forEach(function(message){
                    data = message.UID + ": " + message.title;
                    datas.push(data);
                });
                var messageStream = client.createMessageStream(22048);
                res.send(messageStream);
                client.close();
            });

        });
    });
    /*client.on("new", function(message){
        console.log("New incoming message " + message.title);
    });*/

});

module.exports = router;
