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
const port = config.port || 80;
server.listen(port);
console.log("Server listening at port:"+port);
const io = require('socket.io').listen(server,{path:'/socket/socket.io'});
app.set('socketio', io);
io.on('connection', (socket) => {
    console.log("Kullanıcı Bağlandı");
    socket.emit('baglandi');
    socket.on('hazır',()=>{
        console.log('Selam bro')
    })
    socket.on('disconnect',()=>{
        console.log("Kullanıcı Ayrıldı");
    })
});

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
