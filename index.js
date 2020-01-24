const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);


app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/join.html');
});

app.use(express.urlencoded({ extended: false }));

app.post('/', function(req, res) {
    const code = req.body.code.toUpperCase();
    console.log(code);
    if (req.body.create == "true") {
        res.sendFile(__dirname + "/public/userSetup.html");
    } else if(req.body.create == "false") {
        res.sendFile(__dirname + "/public/userSetup.html");
    }else{
        res.send('Error');
    }
});

app.post('/chat', function(req, res)){
    //TODO: Process Data
    res.sendFile(__dirname + "/public/index.html");
}

app.use(express.static(__dirname + '/public'));

io.on("connection", function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
   console.log("listening on *:3000");
});