const express = require('express');
const swagger = require('./swagger');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.send('Answerz API');
});

app.use('/api-docs', swagger.serve, swagger.setup);

/**
 * @swagger
 *  components:
 *      schema:
 *          User:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      summary: To get all users from our db
 *      description: This route is used to fetch data from db
 *      responses: 
 *          200:
 *              description: This route is used to fetch data from db
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/User'
 */
app.get('/api/v1/users', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la lecture du fichier JSON' });
            return;
        }
        const users = JSON.parse(data).users;
        res.json(users);
    });
});

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *      summary: To post a user in our db
 *      description: This route is used to post data in db
 *      responses: 
 *          200:
 *              description: This api is used to fetch data from db
 */
 

app.listen(port, () => {
    console.log(`Server Express listening on port ${port}`);
});