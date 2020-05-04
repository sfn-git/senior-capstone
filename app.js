// =================================================//
//             All packages required                //
//==================================================//
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement.
const bodyParser = require("body-parser");
const fs = require("fs");
require("./models/database.js");
const config = require('./config.json');

// =================================================//
//                  Express Configs                 //
//==================================================//

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret:  config.sessionSecret, //For testing, random string const should be used
    cookie: {
      httpOnly: false,
      sameSite: true,
      secure: false, //set true once into production(https)
    },
  })
);

// =================================================//
//                  All Get Request                 //
//==================================================//

/*
  Index Endpoint that handles first request and logged in request
*/
app.get("/", async (req, res) => {
  // -----------------------
  // Checks if session exist
  // -----------------------
  if (req.session.userId) {
    /*
      Puts all checking variables in an array to 
      see if more than one of them are true
    */
    var arr = [
      { bool: req.session.isFaculty },
      { bool: req.session.isORSP },
      { bool: req.session.isORSPAdmin },
      { bool: req.session.isStudent },
    ];
    const count = (arr, condition = true) => arr.filter(condition).length;

    /*
      If the user logged in is more than one rank,
      they are sent to a page where they choose who
      they would like to log in as. 
    */
    if (count(arr, (o) => o.bool) > 1) {
      res.render("choose-dashboard", {
        isStudent: req.session.isStudent,
        isORSP: req.session.isORSP,
        isFaculty: req.session.isFaculty,
        isORSPAdmin: req.session.isORSPAdmin,
      });
    //------------------------------------------------------------
    //Will send user to orspadmin-dashboard if they an ORSP Admin
    //------------------------------------------------------------
    } else if (req.session.isORSPAdmin) {
      res.render("orspadmin-dashboard", {
        name: req.session.name,
      });
    //---------------------------------------------------------
    //Will send user to orsp-dashboard if they are ORSP Staff
    //---------------------------------------------------------
    } else if (req.session.isORSP) {
      res.render("orsp-dashboard", {
        name: req.session.name
      });
    //----------------------------------------------------------
    //Will send user to student-dashboard if they are a student
    //----------------------------------------------------------
    } else if (req.session.isStudent) {
      var studentModel = require("./models/students");
      var projectsModel = require("./models/projects");
      var facultyModel = require("./models/faculty");
      var fullProjects = []; //This will contain the projects that will be sent to the front end

      var studentID = await studentModel.find({ email: req.session.email },"_id");
      var projects = await projectsModel.find({ submitter: studentID }); //This is the projects from the database that have ids instead of names

      for (index in projects) {
        console.log(projects[index]);
        facultyInfo = await facultyModel.findById(projects[index].facultyAdvisor,"facultyName");
        facultyName = facultyInfo.facultyName;

        var thisProject = {
          id: projects[index]._id,
          primaryPresenter: req.session.name,
          coPresenter: [],
          faculty: facultyName,
          title: projects[index].title,
          abstract: projects[index].abstractSubmitted,
          dateSubmitted: projects[index].dateSubmitted,
          dateApproved: null,
          dataDenied: null,
          dataLastModified: null,
        };

        for (coIndex in projects[index].copis) {
          coPresenterName = await studentModel.findById(
            projects[index].copis[coIndex],
            "name"
          );
          if (coPresenterName == null) {
          } else {
            thisProject.coPresenter.push(coPresenterName.name);
          }
        }
        fullProjects.push(thisProject);
      }
      
      res.render("student-dashboard", {
        name: req.session.name,
        projects: fullProjects,
        count: fullProjects.length,
      });
    //-----------------------------------------------------------------
    //Will send user to faculty-dashboard if they are a faculty member
    //-----------------------------------------------------------------
    } else if (req.session.isFaculty) {

      var facultyProjectModel = require("./models/facultyProjects.js");
      var facultyModel = require("./models/faculty.js");

      var facultyID = await facultyModel.find({"email": req.session.email}).select("_id");
      var facultyProjects = await facultyProjectModel.find({"primaryInvestigator": facultyID});

      res.render("faculty-dashboard", {
        name: req.session.name,
        count: facultyProjects.length,
        projects: facultyProjects
      });
    }
    //---------------------------------------------------------
    //If user is not logged in, will send to information index
    //---------------------------------------------------------
  } else {
    res.render("index", { loggedIn: false, name: "" });
  }
});

/*
  Submission endpoint that sends users to the project submission page
  with all of the information needed. 
*/
app.get("/submission", (req, res) => {
  // If user is not signed in, send to signin page.
  if (!req.session.userId) {
    res.render("signin");
  } else {
    // Models required to get majors and faculty
    const majorModel = require("./models/major.js");
    const facultyModel = require("./models/faculty.js");

    var promise = [];

    // -----------------------
    // Getting all Majors
    // -----------------------
    promise.push(
      majorModel.find({}, null, { sort: { major: 1 } }, (err, fun) => {
        if (err) {
          console.error(err);
        }
      })
    );

    // -----------------------
    // Getting all Faculty
    // -----------------------
    promise.push(
      facultyModel.find({}, null, { sort: { facultyName: 1 } }, (err, fun) => {
        if (err) {
          console.error(err);
        }
      })
    );

    // -----------------------------------------
    // Checks if student then sends student page
    // -----------------------------------------
    if (req.session.isStudent) {
      Promise.all(promise)
        .then((values) => {
          res.render("student-form", {
            major: values[0],
            majorJS: JSON.stringify(values[0]),
            faculty: values[1],
            coCount: 0,
            fname: req.session.name.split(" ")[0],
            lname: req.session.name.split(" ")[1],
            email: req.session.email.split("@")[0],
          });
        })
        .catch((err) => {
          res.render("error", {
            error: "Something went wrong when determining user access level.",
          });
        });

    // -----------------------------------------
    // Checks if Faculty then sends Faculty page
    // -----------------------------------------
    } else if (req.session.isFaculty) {
      Promise.all(promise)
        .then((values) => {
          res.render("faculty-form", {
            major: values[0],
            majorJS: JSON.stringify(values[0]),
            faculty: values[1],
            coCount: 0,
            fname: req.session.name.split(" ")[0],
            lname: req.session.name.split(" ")[1],
            email: req.session.email.split("@")[0],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.render("error", {
        error: "Something went wrong when determining user access level.",
      });
    }
  }
});

/* 
  TO-DO, Setup admin page
*/
app.get("/admin", (req, res) => {});

/*
  End Point for ORSP-Admins to modify majors database
*/
app.get("/insert-major", (req, res) => {
  // If they are apart of ORSP, then they will be allowed to enter the page. 
  if (req.session.isORSPAdmin) {
    const majorModel = require("./models/major.js");
    majorModel.find({}, null, { sort: { major: 1 } }, function (err, fun) {
      if (err) {
        res.render("error", { error: `${err}` });
      } else {
        res.render("insert-major", { major: fun });
      }
    });
  // If they are not apart of ORSP, they will be sent to an error page. 
  } else {
    res.render("error", {
      error: "You are not authorized to access this page.",
    });
  }
});

/*
  End Point for ORSP-Admins to modify the faculty database
*/
app.get("/insert-faculty", (req, res) => {
  if (req.session.isORSPAdmin) {
    const facultyModel = require("./models/faculty.js");
    facultyModel.find({}, null, { sort: { faculty: 1 } }, (err, fun) => {
      if (err) {
        res.send(err);
      } else {
        res.render("insert-faculty", { faculty: fun });
      }
    });
  } else {
    res.render("error", {
      error: "You are not authorized to access this page.",
    });
  }
});

/*
  End Point for ORSP-Admin to modify ORSP database
*/

app.get("/orsp-staff", (req, res)=>{

  if(req.session.isORSPAdmin){

    var orspModel = require("./models/orsp.js");
    orspModel.find({}, (err, fun)=>{
      if(err){res.render("error", {error: err});}
      res.render('add-staff', {orspStaff: fun});
    })

  }else{
    res.render("error", {
      error: "You are not authorized to access this page.",
    });
  }

})

/*
  Used to render the sitewide navbar. 
*/
app.get("/navbar", (req, res) => {
  if (req.session.userId) {
    res.render("navbar", {
      loggedIn: true,
      name: req.session.name,
      isORSP: req.session.isORSP,
    });
  } else {
    res.render("navbar", { loggedIn: false, isORSP: false });
  }
});

/*
  End point that allows user to signout
*/
app.get("/signout", (req, res) => {
  // Destroys the session
  req.session.destroy((err) => {
    if (err) {
      res.render('error', {error: err});
    }
  });

  // Clears all cookies and redirect user
  res.clearCookie("sid");
  res.redirect("/");
});

/*
  Routing for Rank Selector.
*/
app.get("/student", (req, res) => {
  req.session.isStudent = true;
  req.session.isFaculty = false;
  req.session.isORSP = false;
  req.session.isORSPAdmin = false;
  res.redirect("/");
});

app.get("/orsp", (req, res) => {
  req.session.isStudent = false;
  req.session.isFaculty = false;
  req.session.isORSP = true;
  req.session.isORSPAdmin = false;
  res.redirect("/");
});

app.get("/orspadmin", (req, res) => {
  req.session.isStudent = false;
  req.session.isFaculty = false;
  req.session.isORSP = false;
  req.session.isORSPAdmin = true;
  res.redirect("/");
});

app.get("/faculty", (req, res) => {
  req.session.isStudent = false;
  req.session.isFaculty = true;
  req.session.isORSP = false;
  req.session.isORSPAdmin = false;
  res.redirect("/");
});

/*
Catch all routing
*/
app.get("*", (req, res) => {
  var file = req.url.split("/")[1];
  var checkFile = file + ".ejs";
  if (fs.existsSync(`${__dirname}\\views\\${checkFile}`)) {
    res.render(file);
  } else {
    res.status(404);
    res.render("404");
  }
});

// =================================================//
//                  All Post Request                //
//==================================================//

app.post("/insert-file", async (req, res) => {
  const majorModel = require("./models/major.js");
  var majors = req.body;

  for (const key in majors) {
    var newMajor = new majorModel({
      major: majors[key].major,
      department: majors[key].dept,
      college: majors[key].college,
    });

    if (await majorModel.exists({ major: majors[key].major })) {
      console.log(`${majors[key].major} exist in db already`);
      // Do nothing
    } else {
      await newMajor.save();
    }
  }

  res.send("Backend reached");
});

// Post request after submit button is pressed on the insert-major page
app.post("/insert-major", (req, res) => {
  
  if(req.session.isORSPAdmin){
    const majorModel = require("./models/major.js");

    var formMajor = req.body.major;
    var formCollege = req.body.college;
    var formDept = req.body.department;

    var newMajor = new majorModel({
      major: formMajor,
      department: formDept,
      college: formCollege,
    });
    //Saves Data into DB
    newMajor.save((err, fun) => {
      if (err) console.error(err);
      res.redirect(303, "/insert-major");
    });
  }
});

app.post("/remove-major", (req, res) => {
  if(req.session.isORSPAdmin){
    var major = require("./models/major.js");
    major.deleteOne({ _id: req.body.id }, (err, suc) => {
      if (err) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
  }else{
    res.send("You are not authorized to access this endpoint.");
  }
});

app.post("/insert-faculty", (req, res) => {
  
  if(req.session.isORSPAdmin){
    // Getting Variable from from
    var facultyName = req.body.facultyName;
    var facultyEmail = req.body.facultyEmail;
    var facultyPosition = req.body.facultyPosition;
    var facultyDepartment = req.body.facultyDepartment;
    var facultyCollege = req.body.facultyCollege;
    var facultyOffice = req.body.facultyOffice;
    var facultyPhone = req.body.facultyPhone;

    // Connection to DB
    const facultyModel = require("./models/faculty.js");

    // Creating faculty model to be inserted
    var newFaculty = new facultyModel({
      facultyName: facultyName,
      email: facultyEmail,
      position: facultyPosition,
      department: facultyDepartment,
      college: facultyCollege,
      officeLocation: facultyOffice,
      officePhone: facultyPhone,
    });

    // Makes connection to db and inserts
    newFaculty.save((err, fun) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect(303, "/insert-faculty");
      }
    });
  }else{
    res.render('error', {error: "You are not authorized to access this page"});
  }
});

app.post("/remove-faculty", async (req,res)=>{

  if(req.session.isORSPAdmin){
    var projectsModel = require("./models/projects.js");
    var facultyProjectsModel = require("./models/facultyProjects.js");
    var facultyModel = require("./models/faculty.js");

    console.log(await projectsModel.find({facultyAdvisor: req.body.id}));

    if(await projectsModel.exists({facultyAdvisor: req.body.id})){
      res.send({status: false, message: "Unable to remove faculty as they are apart of student's project"});
    }else if(await facultyProjectsModel.exists({primaryInvestigator: req.body.id})){
      res.send({status: false, message: "Unable to remove faculty as they are apart of faculty projects"});
    }else{
      facultyModel.remove({_id: req.body.id}, (err)=>{
        if(err){
          res.send({status: false, message: "Something went wrong"});
        }else{
          res.send({status: true, message: "Removed"});
        }
      })
    }
  }else{
    res.render('error', {error: "You are not authorized to access this endpoint."});
  }
})

// Insert ORSP Staff Post End-Point
app.post("/insert-orsp-staff", (req,res)=>{

  if(req.session.userId && req.session.isORSPAdmin){

    var orspStaffModel = require("./models/orsp");

    var newStaff = new orspStaffModel({
      name: req.body['staff-name'],
      email: req.body['staff-email'],
      isAdmin: false
    })

    if(req.body.onCampus == "on"){
      newStaff.isAdmin = true;
    }
    
    newStaff.save((err, fun)=>{

      if(err){
        res.render("error", {error: `An error occurred when trying to add ${req.body['staff-name']} to the database: ${err}`});
      }else{
        res.redirect(303, "/orsp-staff");
      }
    })

  }else{
    res.render("error", {error: "You are not authorized to view this page"});
  }

})

// Endpoint to remove ORSP Staff
app.post("/remove-orsp-staff", async (req,res)=>{

  if(req.session.userId && req.session.isORSPAdmin){

    var orspStaffModel = require("./models/orsp.js");

    if(await orspStaffModel.count({isAdmin: true}) <= 1){
      res.send({status: false, message:"You must assign another user as admin before removing the last admin."});
    }else if(req.session.email == req.body.email){
      res.send({status: false, message:"You must get another user to remove yourself. You cannot remove yourself as admin."});
    }else{
      orspStaffModel.findByIdAndDelete(req.body.id, (err)=>{
        if(err){
          res.send({status: false, message:`Something went wrong ${err}`})
        }else{
          res.send({status: true, message:`User removed from table`})
        }
      })
    }


  }else{
    res.render("error", {error: "You are not authorized to view this page."})
  }

})

// Getting user submission for rd submission
app.post("/student-form", async (req, res) => {
  
  if(req.session.userId && req.session.isStudent){
    var projectsModel = require("./models/projects.js");
    var studentModel = require("./models/students.js");
    var primaryMongoID;
    var coPresenterID = [];
    var waiver = req.body.waiver;
    var onCampus = req.body.onCampus;
    var ccList = "";
    var coPresenters = "";

    if (req.body.waiver == "on") {
      waiver = true;
    } else {
      waiver = false;
    }

    if (req.body.onCampus == "on") {
      onCampus = true;
    } else {
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
    name = req.session.name;
    leadID = req.body.keanID;
    email = req.session.email;
    major = req.body.major;
    classLevel = req.body.class;
    primaryLocation = req.body.campus;

    if(await studentModel.exists({email: email })){
      primaryMongoID = await studentModel.findOne({email: email});
      primaryMongoID = primaryMongoID.id;
    } else {
      // First insert student
      var primaryStudent = new studentModel({
        name: name,
        stuID: leadID,
        email: email,
        major: major,
        classLevel: classLevel,
        primaryLocation: primaryLocation,
      });
      primaryMongoID = await primaryStudent.save();
      primaryMongoID = primaryMongoID.id;
    }

    // Co Presenters
    var coCount = req.body.coPresenterCount;

    if (coCount == 0) {
      // Do Nothing
    } else {
      for (var i = 0; i < coCount; i++) {
        var current = i + 1;

        var coName = `${req.body["firstName" + current]} ${
          req.body["lastName" + current]
        }`;
        var coStuID = req.body["keanID" + current];
        var coEmail = `${req.body["keanEmail" + current].toLowerCase()}@kean.edu`;
        var coMajor = req.body["major" + current];
        var coClassLevel = req.body["class" + current];
        var coPrimaryLocation = req.body["campus" + current];

        ccList += coEmail + ", ";
        coPresenters += coName + ", ";

        if (
          (await studentModel.exists({ email: coEmail }))
        ) {
          var temp = await studentModel.findOne({ email: coEmail }).select("_id");
          coPresenterID.push(temp._id);
        } else {
          var newCoPresenter = new studentModel({
            name: coName,
            stuID: coStuID,
            email: coEmail,
            major: coMajor,
            classLevel: coClassLevel,
            primaryLocation: coPrimaryLocation,
          });
          checkCo = await newCoPresenter.save();
          coPresenterID.push(checkCo.id);
        }
      }
    }

    var newProject = new projectsModel({
      presentationType: presentationType,
      title: title,
      abstractSubmitted: abstract,
      projectArea: projectArea,
      researchLocation: campusConducted,
      researchFunding: fundedBy,
      rdYear: 2020,
      submitter: primaryMongoID,
      copis: coPresenterID,
      facultyAdvisor: advisor,
      onCampus: onCampus,
      waiver: waiver,
    });

    newProject.save((err, fun) => {
      if (err) {
        console.error(err);
      } else {
      }
    });

    var facultyModel = require("./models/faculty.js");
    var facultyDB = await facultyModel.findOne({_id: advisor});
    var facultyName = facultyDB.facultyName;

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "orsptemp20@gmail.com",
        pass: config.emailPass,
      },
    });
    var emailMessage =
      "Your project: " +
      title +
      ", has been submitted!\n\n" +
      "Abstract: " +
      abstract +
      "\n" +
      "Primary Presenter: " +
      name +
      "\n" +
      "Faculty Advisor: " +
      facultyName +
      "\n" +
      "Co-Presenter(s): " +
      coPresenters;
    var mailOptions = {
      from: "orsptemp20@gmail.com",
      to: email,
      cc: ccList,
      subject: "Your Project Has Been Submitted!",
      text: emailMessage,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
    res.redirect("/");
  }else{
    res.render('signin');
  }
});

app.post("/faculty-form", async (req,res)=>{
  if(req.session.userId && req.session.isFaculty){
  var facultyProjectModel = require('./models/facultyProjects');
  var faculty = require('./models/faculty.js');

  var facultyProject = new facultyProjectModel({
    title: req.body.title,
    abstract: req.body.abstract,
    description: req.body.description,
    primaryInvestigator: "",
    onCampus: false,
    coFacultyInvestigator: [],
    coStudentInvestigator: [],
    consent: false,
  })

  var facultyEmail = `${req.body.keanEmail}@kean.edu`;
  var facultyInfo = await faculty.findOne({"email": facultyEmail}).select("_id");
  facultyProject.primaryInvestigator = facultyInfo.id;

  var coFacultyInvestigatorCount = req.body.additionalFacultyCount;

  if(coFacultyInvestigatorCount == 0){
    // Do Nothing
    console.log(false);
  }else{
    for(var i=0; i<coFacultyInvestigatorCount; i++){

      facultyProject.coFacultyInvestigator.push({
        name: `${req.body["firstName"+(i+1)]} ${req.body["lastName"+(i+1)]}`,
        position: req.body["facultyPosition"+(i+1)],
        campus: req.body["campus"+(i+1)],
        email: `${req.body["keanEmail"+(i+1)]}@kean.edu`
      })
    }
  }

  if(req.body.onCampus == "on"){
    facultyProject.onCampus = true;
  }
  if(req.body.waiver == "on"){
    facultyProject.consent = true;
  }

  facultyProject.save();
  res.redirect("/");
  
  }else{
    res.render('error', {error: "Please login to continue"});
  }
})

app.post("/signin", async (req, res) => {
  const CLIENT_ID =
    "745501205386-1eib7vvmr41pa488m35bf2f9l88thd72.apps.googleusercontent.com";
  var token = req.body;
  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token["idtoken"],
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    // All user info
    req.session.userId = userid;
    req.session.name = payload.name;
    req.session.email = payload.email;

    // Checking if they exist in db.
    var studentModel = require('./models/students.js');
    var facultyModel = require('./models/faculty.js');
    var orspModel = require('./models/orsp.js');

    req.session.isORSP = false;
    req.session.isORSPAdmin = false;
    req.session.isStudent = true;

    if(await facultyModel.exists({email: req.session.email})){
      req.session.isFaculty = true;
      req.session.isStudent = await facultyModel.exists({email: req.session.email});
    }

    if(await orspModel.exists({email: req.session.email})){

      req.session.isORSP = true;
      req.session.isStudent = await facultyModel.exists({email: req.session.email});
      var orspCheck = await orspModel.findOne({email:  req.session.email});
      if(orspCheck.isAdmin){
        req.session.isORSPAdmin = true;
      }

    }

    // orspInfo = await orspModel.findOne({email: req.session.email});

    // if(orspInfo == null){
    //   req.session.isORSP = false;
    //   req.session.isORSPAdmin = false;
    // }else{

    // }

    res.send(true);
  }
  verify().catch(console.error);
});

app.listen(port, () => console.log(`Server now running at port ${port}`));