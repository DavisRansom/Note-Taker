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
        // reads the notes from json file
        notesData = fs.readFileSync("Develop/db/db.json", "utf8");
        console.log("hello!");
        // parse it so notesData is an array of objects
        notesData = JSON.parse(notesData);

        // error handling
    } catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }
    //   send objects to the browser
    res.json(notesData);
});

app.post('/api/notes', (req, res) => {
    //from the saveNote function from the front end
    {
        try {
            // reads the json file
            notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
            console.log(notesData);
            // parse the data to get an array of objects
            notesData = JSON.parse(notesData);
            // Set new notes id
            req.body.id = notesData.length;
            // add the new note to the array of note objects
            notesData.push(req.body); // req.body - user input
            // make it string(stringify)so you can write it to the file
            notesData = JSON.stringify(notesData);
            // writes the new note to file
            fs.writeFile("./Develop/db/db.json", notesData, "utf8", function (err) {
                // error handling
                if (err) throw err;
            });
            // change it back to an array of objects & send it back to the browser(client)
            res.json(JSON.parse(notesData));

            // error handling
        } catch (err) {
            throw err;
            console.error(err);
        }
    };
app.delete('/api/notes/:id', (req, res) => {
    //from the deleteNote function from the front end
    try {
        //  reads the json file
        notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
        // parse the data to get an array of objects
        notesData = JSON.parse(notesData);
        // delete the old note from the array on note objects
        notesData = notesData.filter(function (note) {
            return note.id != req.params.id;
        });
        // make it into a string so I can write it to the file
        notesData = JSON.stringify(notesData);
        // write the new notes to the file
        fs.writeFile("./Develop/db/db.json", notesData, "utf8", function (err) {
            // error handling
            if (err) throw err;
        });

        // change it back to an array of objects & send it back to the browser
        res.send(JSON.parse(notesData));

        // error handling
    } catch (err) {
        throw err;
        console.log(err);
    }
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});