const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.send('Answerz API');
});

app.listen(port, () => {
    console.log(`Server Express listening on port ${port}`);
});