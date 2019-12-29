$(function(){
   var socket = io();
   $("form").submit(function(e){
       e.preventDefault();
       socket.emit("chat message", $("#messageIn").val());
       $("#messageIn").val("");
       return false;
   });
   socket.on("chat message", function(msg){
      $("#messages").append($("<li>").text(msg));
   });
});