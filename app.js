const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
//All route in indexRouter

const app = express();

//DB connection
const db = require('./helper/db')();

//Middleware
const verifyToken = require('./middleware/verify-token');
const customErrorHandler = require('./middleware/customErrorHandler');
//config
const config = require('./config');

//Swagger API Documentation
const swaggerDefinition = {
    info: {
        title: 'Gelistiricim Swagger API',
        version: '1.0.0',
        description: 'Endpoints to test the all routes',
    },
    //On server host:gelistiricim.herokuapp.com OR local: localhost:3000
    host: 'gelistiricim.herokuapp.com',
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
