const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//config
const config = require('./config');

const indexRouter = require('./routes/index');
//All route in indexRouter

const app = express();
const server = require('http').Server(app);
if(config.host == "localhost:80")
{
    app.set('port', (config.port));
    server.listen(app.get('port'), err => {
        if(err) throw err;
    });
    console.log("Server listening at port:"+app.get('port'));
}

const io = require('socket.io').listen(server);
app.set('socketio', io);
/*const nsp = io.of('/my-namespace');
nsp.on('connection',()=>{
    console.log('nsp geldi');
})*/
/*const gamesocket = io.of('/game');*/
io.on('connection', (socket) => {
    console.log("Sockete bağlanıldı. Kişi sayısı:"+io.engine.clientsCount);
    socket.on('new-user',(data)=>{
        console.log(data.name + ' başarıyla aramıza katıldı.');
        let count = io.engine.clientsCount;
        socket.broadcast.emit('user-list',{
            name:data.name,
            onlineCount:count
        });
    });
    socket.on('joinRoom',(data)=>{
        console.log(Object.keys(socket.rooms));
        let user_name = data.username;
        socket.join(data.name,()=>{
            console.log(data.name + " odası oluşturuldu");
            io.to(data.name).emit('new join',{count:getOnlineCount(io,data),coming_user:user_name})
        })
    })
    socket.on('leaveRoom',(data)=>{
        socket.leave(data.name,()=>{
            io.to(data.name).emit('leavedRoom',{count:getOnlineCount(io,data),user:data.username});
        });
    })
    socket.on('disconnect',()=>{
        console.log("Kullanıcı Ayrıldı");
    })
});
const getOnlineCount = (io,data) =>{
    let roomName = String(data.name);
    const room = io.sockets.adapter.rooms[roomName];
    if(room){
        return room.length;
    }
    else{
        return 0;
    }
}
//DB connection
const db = require('./helper/db')();

//Middleware
const customErrorHandler = require('./middleware/customErrorHandler');


//Swagger API Documentation
const swaggerDefinition = {
    info: {
        title: 'Gelistiricim Swagger API',
        version: '1.0.0',
        description: 'Endpoints to test the all routes',
    },
    //On server host:gelistiricim.herokuapp.com OR local: localhost:3000
    host: config.host,
    basePath: '/api',
    securityDefinitions: {
        ApiKeyAuth: {
            type: 'apiKey',
            name: 'x-access-token',
            in: 'header',
        },
    },
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ['./controller/*.js'],
};
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc(swaggerOptions);
//const swaggerDocument = require('./documentation/swagger');



app.set('api_secret_key',config.api_secret_key);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',indexRouter);
app.get('/swagger.json',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec));


app.use(customErrorHandler);

module.exports = app;
