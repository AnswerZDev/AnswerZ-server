const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Answerz API',
            version: '1.0.0',
            description: 'Documentation for Answerz API',
        },
        servers:[
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: [__dirname + '/index.js'],
};

const specs = swaggerJsDoc(options);

module.exports = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(specs),
};