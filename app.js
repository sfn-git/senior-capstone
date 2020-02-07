const express = require('express');
const path = require('path');
const app = express();
const port = 3000; //3000 for Development. Can be changed when we are ready to implement. 
const dir = __dirname;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get("/", (req,res)=>{

    res.sendFile(htmlFile('index'));

});

app.get("/student-form", (req,res)=>{

    res.sendFile(htmlFile("student_form"));

})

app.post("/student-form", (req,res)=>{

    console.log("Post requeest from student form works!")
    res.sendFile(htmlFile("index"));

})

app.listen(port, ()=>console.log(`Server now running at port ${port}`));


// Function to make it easier to call a page instead of having to do path.join everytime. Just need the name without the .html
function htmlFile(page){
    viewsPath = 'views/' + page + '.html';
    return path.join(dir, viewsPath);
}