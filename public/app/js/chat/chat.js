var socket = io.connect();
socket.emit('connect_user',username);

$("#chat-message").on("keyup", event => {
    if(event.keyCode==13){
        socket.emit('chat message',{pseudo:username, message:event.target.value});
        event.target.value="";
    }
});

socket.on('chat message', (msg) => {
    $("#messages").append(`<p>${msg.pseudo}: ${msg.message}</p>`);
    $("#messages")[0].scrollTo(0, $("#messages")[0].scrollHeight);
});

socket.on('user:deleted', (msg) => {
    $("#messages").append(`<p style="color:red;">alert: ${msg}</p>`);
    $("#messages")[0].scrollTo(0, $("#messages")[0].scrollHeight);
});