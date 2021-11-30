const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


//Static File Routing
app.use(express.static(path.join(__dirname,"public")));

//HTML Routing
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"));
});
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"));
});

//API Routing
app.get('/api/notes',(req,res) =>{
  //from the front end getNotes function  
});
app.post('/api/notes',(req,res) =>{
//from the saveNote function from the front end
});
app.delete('/api/notes/:id',(req,res) =>{
    //from the deleteNote function from the front end
});










app.listen(port, ()=>{
    console.log("Server is running on port", port);
});