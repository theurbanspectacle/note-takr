const fs = require("fs");

const express = require('express');
const app = express();
const port = 3000;


app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.error("Could not read file", err);
            return;
        } 
        res.json
    })

});
app.use(express.static('public'))
    
app.get('/notes', (req, res) => {
    res.sendFile('./public/notes.html', { root: __dirname });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

