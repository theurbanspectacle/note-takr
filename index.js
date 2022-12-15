const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');

const app = express(); 
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.error("Could not read file", err);
            res.status(500).send({error: 'failed!'}); 
            return;
        } 
        res.json(JSON.parse(data.toString()));
    });
});
    
app.get('/notes', (req, res) => {
    res.sendFile('./public/notes.html', { root: __dirname });
});

app.post('/api/notes', (req, res) => {
    const newNote =  {
        title: req.body.title,
        text: req.body.text,
        id: uniqid()
    }; 
    fs.readFile("./db/db.json" , (err, data) => {
        if (err) {
            console.error("Could not read file", err);
            res.status(500).send({error: 'failed!'}); 
            return;
        }
        const notes = JSON.parse(data.toString());
        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes, undefined, 2), (err, data) => {
            if (err) {
                console.error("Could not read file", err);
                res.status(500).send({error: 'failed!'}); 
                return;
            }
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile("./db/db.json" , (err, data) => {
        if (err) {
            console.error("Could not read file", err);
            res.status(500).send({error: 'failed!'}); 
            return;
        }
        let notes = JSON.parse(data.toString());
        notes = notes.filter(item => {
            return item.id !== req.params.id;
        });

        fs.writeFile("./db/db.json", JSON.stringify(notes, undefined, 2), (err, data) => {
            if (err) {
                console.error("Could not read file", err);
                res.status(500).send({error: 'failed!'}); 
                return;
            }
            res.send();
        });
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

