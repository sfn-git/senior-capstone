const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement. 
const dir = __dirname;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require("fs");
// Database models
// const projectModel = require('./models/projects.js');


app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// All basic routes
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
    var file = htmlFile(req.url)
    if(fs.existsSync(file)){
        res.sendFile(file);
    }else{
        res.sendFile(htmlFile("/404.html"));
    }
    
})

// All Post Request
// Post request after submit button is pressed on the insert-major page
app.post("/insert-major", (req, res)=>{
    require('./models/database.js');
    const majorModel = require('./models/major.js');
    
    var formMajor = req.body.major;
    var formCollege = req.body.college;

    var newMajor = new majorModel({
        major: formMajor,
        college: formCollege
    })
   //Saves Data into DB
    newMajor.save((err, fun)=>{
        if(err) console.error(err);
        console.log(fun);
        res.sendFile(htmlFile('/insert_major.html'));
    })
})

// Post request from ajax front end in insert-major page
app.post("/getmajors", (req,res)=>{
    require('./models/database.js');
    const majorModel = require('./models/major.js');

    majorModel.find({}, function (err, fun){
        if(err){
            console.error(err);
        }else{
            res.send(fun);
        }
    });
    
})

app.post("/student-form", (req,res)=>{

    var projectInfo = {};
    var studentInfo = {};
    var copresenterInfo= {};

    // Project Info
    projectInfo.title = req.body.title;
    projectInfo.projectArea = req.body.projectArea;
    projectInfo.abstract = req.body.abstract;
    projectInfo.advisor = req.body.advisor;
    projectInfo.campusConducted = req.body.researchCampus;
    projectInfo.presentationType = req.body.presentaionType;
    projectInfo.fundedBy = req.body.fundedBy;
    projectInfo.waiver = req.body.waiver; 

    // Lead Presenter Info
    studentInfo.leadFName = req.body.firstName;
    studentInfo.leadLName = req.body.lastName;
    studentInfo.leadID = req.body.keanID;
    studentInfo.leadEmail = req.body.keanEmail+"@kean.edu";
    studentInfo.leadMajor = req.body.major;
    studentInfo.leadClassLevel = req.body.class;
    studentInfo.leadCampus = req.body.campus;
    studentInfo.onCampus = req.body.onCampus;
    // Misc Info
    

    res.send(req.body);

})

app.listen(port, ()=>console.log(`Server now running at port ${port}`));

// Function to make it easier to call a page instead of having to do path.join everytime.
function htmlFile(page){
    viewsPath = 'views' + page;
    return path.join(dir, viewsPath);
}

