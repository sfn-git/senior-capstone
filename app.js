const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement. 
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
    if(fs.existsSync(`${__dirname}\\views\\${checkFile}`)){
        res.render(file);
    }else{
        res.status(404);
        res.render("404");
    }
    
})

app.post("/insert-file", async (req, res)=>{
    const majorModel = require('./models/major.js');
    var majors = req.body;

    for (const key in majors) {
        
        var newMajor = new majorModel({
            major:  majors[key].major,
            department:  majors[key].dept,
            college:  majors[key].college
        });

        if(await majorModel.exists({'major': majors[key].major})){
            console.log(`${majors[key].major} exist in db already`);
            // Do nothing
        }else{
            await newMajor.save();
        }
        
    }

    res.send("Backend reached");


});

// All Post Request
// Post request after submit button is pressed on the insert-major page
app.post("/insert-major", (req, res)=>{
    const majorModel = require('./models/major.js');
    
    var formMajor = req.body.major;
    var formCollege = req.body.college;
    var formDept = req.body.department;

    var newMajor = new majorModel({
        major: formMajor,
        department: formDept,
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
    var waiver = req.body.waiver; 
    var onCampus = req.body.onCampus;

    if(req.body.waiver == "on"){
        waiver = true;
    }else{
        waiver = false;
    }

    if(req.body.onCampus == "on"){
        onCampus = true;
    }else{
        onCampus = false;
    }

    // Project Info
    title = req.body.title;
    projectArea = req.body.projectArea;
    abstract = req.body.abstract;
    advisor = req.body.advisor;
    campusConducted = req.body.researchCampus;
    presentationType = req.body.presentationType;
    fundedBy = req.body.fundedBy;
    

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

        for(var i=0; i<coCount; i++){
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
    
    newProject.save((err, fun)=>{

        if(err){
            console.error(err);
        }else{
            console.log(fun);
        }
    })
    // console.log(coMongoID);
    res.send(newProject);

})

app.post("/remove-major", (req,res)=>{
    var major = require("./models/major.js");
    console.log();
    major.deleteOne({"_id": req.body.id}, (err, suc)=>{

        if(err){
            res.send(false);
        }else{
            res.send(true);
        }

    })


})

app.post('/', (req, res) => {
    const CLIENT_ID = '745501205386-1eib7vvmr41pa488m35bf2f9l88thd72.apps.googleusercontent.com';
    var token = req.body;
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token['idtoken'],
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
        res.send(userid);
    }
    verify().catch(console.error)
})

app.listen(port, ()=>console.log(`Server now running at port ${port}`));