const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

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
    try {
        //Reads the notes from json file
        notesData = fs.readFileSync("Develop/db/db.json", "utf8");
        console.log("Files have been read");
        //Parses the data so that notesData becomes an array of objects
        notesData = JSON.parse(notesData);
    }
    catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }
    //Sends JSON objects to the browser
    res.json(notesData);
});

app.post('/api/notes', (req, res) => {
    //From the saveNote function from the front end
    {
        try {
            //Reads the JSON file
            notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
            console.log(notesData);
            //Parses the data to get an array of objects
            notesData = JSON.parse(notesData);
            // Sets the new note's id
            req.body.id = notesData.length;
            //Adds the new note to the array of note objects
            notesData.push(req.body); // req.body - user input
            //Makes the data into a string so it can be written to the file
            notesData = JSON.stringify(notesData);
            //Writes the new note to file
            fs.writeFile("./Develop/db/db.json", notesData, "utf8", function (err) {
                if (err) throw err;
            });
            //Change the data back to an array of objects & sends it back to the browser
            res.json(JSON.parse(notesData));
            
        }
        catch (err) {
            throw err;
            console.error(err);
        }
    };
    app.delete('/api/notes/:id', (req, res) => {
        //from the deleteNote function from the front end
        try {
            //  reads the json file
            notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
            // parses the data to produce an array of objects
            notesData = JSON.parse(notesData);
            // deletes the old note from the array of note objects
            notesData = notesData.filter(function (note) {
                return note.id != req.params.id;
            });
            // makes it into a string so it can be written to the file
            notesData = JSON.stringify(notesData);
            // write the new notes to the file
            fs.writeFile("./Develop/db/db.json", notesData, "utf8", function (err) {
                if (err) throw err;
            });

            //Changes the data back to an array of objects & sends it back to the browser
            res.send(JSON.parse(notesData));

        }
        catch (err) {
            throw err;
            console.log(err);
        }
    });

    app.listen(port, () => {
        console.log("Server is running on port", port);
    });