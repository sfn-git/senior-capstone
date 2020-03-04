const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement. 
const dir = __dirname;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require("fs");
const cons = require('consolidate')
// Database models
// const projectModel = require('./models/projects.js');

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// All basic routes
app.get("/", (req,res)=>{

    res.render('index');
});

app.get("/contact", (req,res)=>{
    res.render('contact');
})

app.get("/login", (req,res)=>{
    res.render('login');
})

app.get("/student-form", (req, res)=>{
    require('./models/database.js');
    const majorModel = require('./models/major.js');
    const facultyModel = require('./models/faculty.js');
    var promise = [];
    promise.push(majorModel.find({}, null, {sort: {major: 1}},function (err, fun){
        if(err){
            console.error(err);
        }else{
            console.log("Callback Major")
        }
    }));

    promise.push(facultyModel.find({}, null, {sort: {facultyName: 1}}, (err, fun)=>{

        if(err){
            console.error(err);
        }else{
            console.log("Callback Faculty");
        }

    }))
    
    // res.render('student_form');
    Promise.all(promise).then(values=>{
        console.log(values);
        res.render('student_form', {major: values[0], majorJS: JSON.stringify(values[0]), faculty: values[1]})
    })
    
})

app.get("/insert-major", (req, res)=>{
    require('./models/database.js');
    const majorModel = require('./models/major.js');
    majorModel.find({}, null, {sort: {major: 1}},function (err, fun){
        if(err){
            res.send(err);
        }else{
            console.log(fun);
            res.render('insert_major', {major: fun});
        }
    });
})

app.get("/insert-faculty", (req,res)=>{
    require('./models/database.js');
    const facultyModel = require('./models/faculty.js');
    facultyModel.find({}, null, {sort: {faculty: 1}}, (err, fun)=>{
        if(err){
            res.send(err);
        }else{
            console.log(fun);
            res.render('insert-faculty', {faculty: fun});
        }
    })
})

//Catch all routing
app.get("*", (req,res)=>{
    var file = htmlFile(req.url)
    if(fs.existsSync(file)){
        res.render(req.url);
    }else{
        res.render("404");
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
        res.redirect(303,'/insert-major');
    })
})

app.post("/insert-faculty", (req,res)=>{

    var facultyName = req.body.facultyName;
    var facultyEmail = req.body.facultyEmail;
    var facultyPosition = req.body.facultyPosition;
    var facultyDepartment = req.body.facultyDepartment;
    var facultyCollege = req.body.facultyCollege;
    var facultyOffice = req.body.facultyOffice;
    var facultyPhone = req.body.facultyPhone;

    require('./models/database.js');
    const facultyModel = require('./models/faculty.js');

    var newFaculty = new facultyModel({

        facultyName: facultyName,
        email: facultyEmail,
        position: facultyPosition,
        department: facultyDepartment,
        college: facultyCollege,
        officeLocation: facultyOffice,
        officePhone: facultyPhone

    });

    newFaculty.save((err, fun)=>{

        if(err){
            console.log(err);
        }else{
            console.log(fun);
            res.redirect(303, '/insert-faculty');
        }

    })

})

// Getting user submission for rd submission
app.post("/student-form", (req,res)=>{

    var projectInfo = {};
    var studentInfo = {};
    var copresenterInfo= [];

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
    studentInfo.name = `${req.body.firstName} ${req.body.lastName}`;
    studentInfo.stuID = req.body.lastName;
    studentInfo.leadID = req.body.keanID;
    studentInfo.email = req.body.keanEmail+"@kean.edu";
    studentInfo.major = req.body.major;
    studentInfo.classLevel = req.body.class;
    studentInfo.primaryLocation = req.body.campus;
    studentInfo.onCampus = req.body.onCampus;
    
    // Co Presenters
    var coCount = req.body.coPresenterCount;

    for(var i =0; i<coCount; i++){
        var current = i+1;
        
        name = `${req.body["firstName" + current]} ${req.body["lastName" + current]}`;
        stuID = req.body["keanID" + current];
        email = req.body["keanEmail" + current];
        major = req.body["major" + current];
        classLevel = req.body["class" + current];
        primaryLocation = req.body["campus" + current];

        copresenterInfo.push({
            "name": name,
            "stuID": stuID,
            "email": email,
            "major": major,
            "classLevel": classLevel,
            "primaryLocation": primaryLocation
        })
    }

    
    console.log()
    res.send(copresenterInfo);

})

app.listen(port, ()=>console.log(`Server now running at port ${port}`));

// Function to make it easier to call a page instead of having to do path.join everytime.
function htmlFile(page){
    viewsPath = 'views' + page;
    return path.join(dir, viewsPath);
}

