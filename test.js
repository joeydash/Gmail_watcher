var inbox = require("inbox");
var MailParser = require("mailparser-mit").MailParser;
var mailparser = new MailParser();



var client = inbox.createConnection(false, "imap.gmail.com", {
    secureConnection: true,
    auth:{
        user: "<email_id>",
        pass: "<password>"
    }
});

client.connect();

client.on("connect", function(){
    client.openMailbox("INBOX", function(error, info){
        if(error) throw error;

        client.listMessages(-1, function(err, messages){
            messages.forEach(function(message){
                /*console.log(message.title+message.UID);
                client.close();*/
                retrieveMessage(client,22056,function (error,msg) {


                    var email = msg.toString();
                    mailparser.on("end", function(mail_object){
                        /*console.log("From:", mail_object.from);
                        console.log("Subject:", mail_object.subject);*/
                        console.log("Text body:", mail_object.text);
                    });
                    mailparser.write(email);
                    mailparser.end();
                    client.close();
                });
            });
        });

    });
});

function retrieveMessage(client, uid, callback){
    var chunks = [], chunklength = 0,
        stream = client.createMessageStream(uid);
    stream.on("data", function(chunk){
        chunks.push(chunk);
        chunklength += chunk.length;
    });
    stream.on("end", function(){
        var message = Buffer.concat(chunks, chunklength);
        callback(null, message);
    });
}
client.on('close', function (){
    var time = new Date();
    console.log("Disconnected @"+time);
    client.connect();
});