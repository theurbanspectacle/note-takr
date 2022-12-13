const fs = require("fs");

const express = require('express');
const app = express();
const port = 3000;


app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.error("Could not read file", err);
            res.status(500).send({error: 'failed!'}); 
            return;
        } 
        res.json(JSON.parse(data.toString()));
    })

});
app.use(express.static('public'))
    
app.get('/notes', (req, res) => {
    res.sendFile('./public/notes.html', { root: __dirname });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

