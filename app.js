const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement. 
const dir = __dirname;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require("fs");
const cons = require('consolidate');
require('./models/database.js');

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

app.get("/student-form", (req, res)=>{
    const majorModel = require('./models/major.js');
    const facultyModel = require('./models/faculty.js');

    var promise = [];
    promise.push(majorModel.find({}, null, {sort: {major: 1}}, (err, fun)=>{
        if(err){
            console.error(err);
        }
    }));

    promise.push(facultyModel.find({}, null, {sort: {facultyName: 1}}, (err, fun)=>{
        if(err){
            console.error(err);
        }
    }))
    
    // res.render('student_form');
    Promise.all(promise).then(values=>{
        console.log(values);
        res.render('student_form', {major: values[0], majorJS: JSON.stringify(values[0]), faculty: values[1], coCount: 0})
    }).catch((err)=>{
        console.log(err);
    })
})

app.get("/insert-major", (req, res)=>{
    const majorModel = require('./models/major.js');
    majorModel.find({}, null, {sort: {major: 1}},function (err, fun){
        if(err){
            res.send(err);
        }else{
            res.render('insert_major', {major: fun});
        }
    });
})

app.get("/insert-faculty", (req,res)=>{
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

app.get("/navbar", (req, res)=>{

    res.sendFile(__dirname + "/views/navbar.html");

})

//Catch all routing
app.get("*", (req,res)=>{
    var file = req.url.split("/")[1];
    var checkFile = file+".html";
    if(fs.existsSync(checkFile)){
        res.render(file);
    }else{
        res.status(404);
        res.render("404");
    }
    
})

// All Post Request
// Post request after submit button is pressed on the insert-major page
app.post("/insert-major", (req, res)=>{
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

    // Getting Variable from from
    var facultyName = req.body.facultyName;
    var facultyEmail = req.body.facultyEmail;
    var facultyPosition = req.body.facultyPosition;
    var facultyDepartment = req.body.facultyDepartment;
    var facultyCollege = req.body.facultyCollege;
    var facultyOffice = req.body.facultyOffice;
    var facultyPhone = req.body.facultyPhone;

    // Connection to DB
    const facultyModel = require('./models/faculty.js');

    // Creating faculty model to be inserted
    var newFaculty = new facultyModel({
        facultyName: facultyName,
        email: facultyEmail,
        position: facultyPosition,
        department: facultyDepartment,
        college: facultyCollege,
        officeLocation: facultyOffice,
        officePhone: facultyPhone
    });

    // Makes connection to db and inserts
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
app.post("/student-form", async (req,res)=>{
    var projectsModel = require("./models/projects.js");
    var studentModel  = require("./models/students.js");
    var primaryMongoID;
    var coPresenterID = [];

    // Project Info
    title = req.body.title;
    projectArea = req.body.projectArea;
    abstract = req.body.abstract;
    advisor = req.body.advisor;
    campusConducted = req.body.researchCampus;
    presentationType = req.body.presentationType;
    fundedBy = req.body.fundedBy;
    waiver = req.body.waiver; 
    onCampus = req.body.onCampus;

    // Lead Presenter Info
    name = `${req.body.firstName} ${req.body.lastName}`;
    leadID = req.body.keanID;
    email = req.body.keanEmail+"@kean.edu";
    major = req.body.major;
    classLevel = req.body.class;
    primaryLocation = req.body.campus;
    

    // First insert student
    var primaryStudent = new studentModel({
        name: name,
        stuID: leadID,
        email: email,
        major: major,
        classLevel: classLevel,
        primaryLocation: primaryLocation
    });

    if((await studentModel.exists({'stuID' : primaryStudent.stuID})) || (await studentModel.exists({'email': email}))){
        // Do Nothing
        primaryMongoID = (await studentModel.findOne({'stuID' : primaryStudent.stuID}).select("_id"));
        primaryMongoID = primaryMongoID._id
    }else{
        primaryMongoID = await primaryStudent.save();
        primaryMongoID = primaryMongoID.id;
    }
 
    // Co Presenters
    var coCount = req.body.coPresenterCount;

    if(coCount == 0){
        // Do Nothing
    }else{

        for(var i =0; i<coCount; i++){
            var current = i+1;
            
            var coName = `${req.body["firstName" + current]} ${req.body["lastName" + current]}`;
            var coStuID = req.body["keanID" + current];
            var coEmail = `${req.body["keanEmail" + current]}@kean.edu`;
            var coMajor = req.body["major" + current];
            var coClassLevel = req.body["class" + current];
            var coPrimaryLocation = req.body["campus" + current];

            var newCoPresenter = new studentModel({
                name: coName,
                stuID: coStuID,
                email: coEmail,
                major: coMajor,
                classLevel: coClassLevel,
                primaryLocation: coPrimaryLocation
            });
    
            if((await studentModel.exists({'stuID': coStuID})) || (await studentModel.exists({'email': coEmail}))){
                var temp = (await studentModel.findOne({'stuID' : coStuID}).select("_id"));
                coPresenterID.push(temp._id);
            }else{
                checkCo = await newCoPresenter.save();
                coPresenterID.push(checkCo.id);
            }

        }

    }
    
    var newProject = new projectsModel({

        presentationType: presentationType,
        title: title,
        abstract: abstract,
        projectArea: projectArea,
        researchLocation: campusConducted,
        researchFunding: fundedBy,
        rdYear: 2020,
        submitter: primaryMongoID,
        copis: coPresenterID,
        facultyAdvisor: advisor,
        onCampus: onCampus,
        waiver: waiver

    });
    
    // console.log(coMongoID);
    res.send(newProject);

})

app.listen(port, ()=>console.log(`Server now running at port ${port}`));