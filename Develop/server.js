const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;


//Middleware - Unpacking the json content that is sent from the front end request object, if any
app.use(express.json());

//Static File Routing
app.use(express.static(path.join(__dirname, "public")));

//HTML Routing
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//API Routing
app.get('/api/notes', (req, res) => {
    //from the front end getNotes function  
    var notesData = [];
    //Reads the notes from JSON file
    notesData = fs.readFileSync("./db/db.json",);
    //Parses the data so that notesData becomes an array of objects
    notesData = JSON.parse(notesData);

    //Sends JSON objects to the browser
    res.json(notesData);
});

app.post('/api/notes', (req, res) => {
    //From the saveNote function from the front end
    var notesData = [];
    //Reads the JSON file
    notesData = fs.readFileSync("./db/db.json", "utf8");
    //Parses the data to get an array of objects
    notesData = JSON.parse(notesData);
    // Sets the new note's id
    req.body.id = Date.now();
    //Adds the new note to the array of note objects
    notesData.push(req.body); // req.body - user input
    //Writes the new note to file
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData));

    //Changes the data back to an array of objects & sends it back to the browser
    res.json(notesData);
});


app.delete('/api/notes/:id', (req, res) => {
    //from the deleteNote function from the front end

    //  reads the json file
    notesData = fs.readFileSync("./db/db.json", "utf8");
    // parses the data to produce an array of objects
    notesData = JSON.parse(notesData);
    // deletes the old note from the array of note objects
    const id = Number(req.params.id);
    notesData = notesData.filter(function (note) {
        return note.id !== id;
    });
    // write the new notes to the file
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
    //Changes the data back to an array of objects & sends it back to the browser
    res.send(notesData);
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});