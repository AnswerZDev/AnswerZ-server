const express = require('express');
const swagger = require('./swagger');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.send('Answerz API');
});

app.use('/api/v1', swagger.serve, swagger.setup);

app.listen(port, () => {
    console.log(`Server Express listening on port ${port}`);
});