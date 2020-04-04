const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRouter');

const app = express();

//DB connection
const db = require('./helper/db')();

//Middleware
const verifyToken = require('./middleware/verify-token');
//config
const config = require('./config');

//Swagger API Documentation
const swaggerDefinition = {
    info: {
        title: 'Gelistiricim Swagger API',
        version: '1.0.0',
        description: 'Endpoints to test the all routes',
    },
    host: 'localhost:3000',
    basePath: '/api',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'x-access-token',
            scheme: 'bearer',
            in: 'header',
        },
    },
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
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

app.use('/api', indexRouter);
app.get('/swagger.json',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
})
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec));
app.use('/api/users',verifyToken, usersRouter);

app.use((err,req,res,next)=>{
    res.locals.message=err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json(
        {
           error:{
               message:err.message,
               status:err.status
           }
        });
});

module.exports = app;
