const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement. 
const dir = __dirname;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Database models
// const projectModel = require('./models/projects.js');
const majorSchema = require('./models/major.js');
// const dbConnection = require('./models/database.js');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req,res)=>{

    console.log(req);
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

    var formMajor = req.body.major;
    var formCollege = req.body.college;

    var majorModel = mongoose.model('Major', majorSchema);

    var newMajor = new majorModel({

        major: formMajor,
        college: formCollege

    })
    // var db = dbConnection.db;
    // var database = dbConnection.database;
    // db.toString;
    // majorModel.find({}, (err, find)=>{

    //     if(err) res.sendFile(htmlFile("/error.html"));
    //     console.log(find);
    // });

    // database.close();

    res.send(newMajor);

})

app.listen(port, ()=>console.log(`Server now running at port ${port}`));


// Function to make it easier to call a page instead of having to do path.join everytime. Just need the name without the .html
function htmlFile(page){
    viewsPath = 'views' + page;
    return path.join(dir, viewsPath);
}