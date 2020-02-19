const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement. 
const dir = __dirname;
const bodyParser = require('body-parser');
// Database models
// const projectModel = require('./models/projects.js');
// const majorModel = require('./models/major.js');
// const dbConnection = require('./models/database.js');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req,res)=>{

    res.sendFile(htmlFile('/index.html'));

});

app.get("/login", (req,res)=>{

    res.sendFile(htmlFile('/login.html'));

})

app.get("/student-form", (req, res)=>{

    res.sendFile(htmlFile('/student_form.html'));

})

app.get("/insert-major", (req, res)=>{

    res.sendFile(htmlFile('/insert_major.html'));

})

//Catch all routing
app.get("*", (req,res)=>{

    res.sendFile(htmlFile(req.url));
    
})

// All Post Request
app.post("/insert-major", (req, res)=>{

    var major = req.body.major;
    var college = req.body.college;

    var newMajor = new majorModel({
        major: major,
        college: college
    });
    var db = dbConnection.db;
    var database = dbConnection.database;
    db.toString;
    majorModel.find({}, (err, find)=>{

        if(err) res.sendFile(htmlFile("/error.html"));
        console.log(find);
    });

    database.close();

})

app.listen(port, ()=>console.log(`Server now running at port ${port}`));


// Function to make it easier to call a page instead of having to do path.join everytime. Just need the name without the .html
function htmlFile(page){
    viewsPath = 'views' + page;
    return path.join(dir, viewsPath);
}