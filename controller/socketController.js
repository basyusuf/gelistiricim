
const socketWelcome = async (req,res,next)=>{
    var io = req.app.get('socketio');
    io.sockets.on('connection', (socket) => {
        socket.emit("Helloooo");
        console.log("Kullanıcı bağlandı")
        io.sockets.on('disconnect',()=>{
            console.log("User disconnect");
        })
    });
}
module.exports={
    socketWelcome
};