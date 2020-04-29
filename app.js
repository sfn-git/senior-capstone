const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement.
const bodyParser = require("body-parser");
const fs = require("fs");
require("./models/database.js");

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
    secret: "RADS", //For testing, random string const should be used
    cookie: {
      httpOnly: false,
      sameSite: true,
      secure: false, //set true once into production(https)
    },
  })
);

// All basic routes
app.get("/", async (req, res) => {
  if (req.session.userId) {
    var studentModel = require("./models/students");
    var projectsModel = require("./models/projects");
    var facultyModel = require("./models/faculty");
    var fullProjects = []; //This will contain the projects that will be sent to the front end

    var studentID = await studentModel.find(
      { email: req.session.email },
      "_id"
    );
    var projects = await projectsModel.find({ submitter: studentID }); //This is the projects from the database that have ids instead of names

    for (index in projects) {
      console.log(projects[index]);
      facultyInfo = await facultyModel.findById(
        projects[index].facultyAdvisor,
        "facultyName"
      );
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

    var arr = [
      { bool: req.session.isFaculty },
      { bool: req.session.isORSP },
      { bool: req.session.isORSPAdmin },
      { bool: req.session.isStudent },
    ];
    const count = (arr, condition = true) => arr.filter(condition).length;

    if (count(arr, (o) => o.bool) > 1) {
      res.render("choose-dashboard", {
        isStudent: req.session.isStudent,
        isORSP: req.session.isORSP,
        isFaculty: req.session.isFaculty,
        isORSPAdmin: req.session.isORSPAdmin,
      });
    } else if (req.session.isORSPAdmin) {
      res.render("orspadmin-dashboard", {
        name: req.session.name,
        projects: fullProjects,
        count: fullProjects.length,
      });
    } else if (req.session.isORSP) {
      res.render("orsp-dashboard", {
        name: req.session.name,
        projects: fullProjects,
        count: fullProjects.length,
      });
    } else if (req.session.isStudent) {
      res.render("student-dashboard", {
        name: req.session.name,
        projects: fullProjects,
        count: fullProjects.length,
      });
    } else if (req.session.isFaculty) {
      res.render("faculty-dashboard", {
        name: req.session.name,
        projects: fullProjects,
        count: fullProjects.length,
      });
    }
  } else {
    res.render("index", { loggedIn: false, name: "" });
  }
});

app.get("/submission", (req, res) => {
  if (!req.session.userId) {
    res.render("signin");
  } else {
    // Get majors and faculty members for the dropdowns
    const majorModel = require("./models/major.js");
    const facultyModel = require("./models/faculty.js");

    var promise = [];
    promise.push(
      majorModel.find({}, null, { sort: { major: 1 } }, (err, fun) => {
        if (err) {
          console.error(err);
        }
      })
    );

    promise.push(
      facultyModel.find({}, null, { sort: { facultyName: 1 } }, (err, fun) => {
        if (err) {
          console.error(err);
        }
      })
    );

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
          console.log(err);
        });
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

// End Point to view all projects of student/faculty
app.get("/projects", (req, res) => {
  if (!req.session.userId) {
    res.render("signin");
  }

  res.render("student-profile", { name: req.session.name });
});

app.get("/admin", (req, res) => {});

app.get("/insert-major", (req, res) => {
  if (req.session.isORSP) {
    const majorModel = require("./models/major.js");
    majorModel.find({}, null, { sort: { major: 1 } }, function (err, fun) {
      if (err) {
        res.render("error", { error: `${err}` });
      } else {
        res.render("insert-major", { major: fun });
      }
    });
  } else {
    res.render("error", {
      error: "You are not authorized to access this page.",
    });
  }
});

app.get("/insert-faculty", (req, res) => {
  if (req.session.isORSP) {
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

app.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
  });
  res.clearCookie("sid");

  res.redirect("/");
});

app.get("/Student_Profile", (req, res) => {
  if (req.session.userId) {
    res.render("Student_Profile", { name: req.session.name });
  } else {
    res.redirect("/");
  }
});

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

// All Post Request
// Post request after submit button is pressed on the insert-major page
app.post("/insert-major", (req, res) => {
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
});

app.post("/insert-faculty", (req, res) => {
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
});

// Getting user submission for rd submission
app.post("/student-form", async (req, res) => {
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

  // First insert student
  var primaryStudent = new studentModel({
    name: name,
    stuID: leadID,
    email: email,
    major: major,
    classLevel: classLevel,
    primaryLocation: primaryLocation,
  });

  if (
    (await studentModel.exists({ stuID: primaryStudent.stuID })) ||
    (await studentModel.exists({ email: email }))
  ) {
    // Do Nothing
    primaryMongoID = await studentModel
      .findOne({ stuID: primaryStudent.stuID })
      .select("_id");
    primaryMongoID = primaryMongoID._id;
  } else {
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

      var newCoPresenter = new studentModel({
        name: coName,
        stuID: coStuID,
        email: coEmail,
        major: coMajor,
        classLevel: coClassLevel,
        primaryLocation: coPrimaryLocation,
      });

      if (
        (await studentModel.exists({ stuID: coStuID })) ||
        (await studentModel.exists({ email: coEmail }))
      ) {
        var temp = await studentModel.findOne({ stuID: coStuID }).select("_id");
        coPresenterID.push(temp._id);
      } else {
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

  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "orsptemp20@gmail.com",
      pass: "hedgehog20",
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
});

app.post("/remove-major", (req, res) => {
  var major = require("./models/major.js");
  major.deleteOne({ _id: req.body.id }, (err, suc) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

app.post("/signin", (req, res) => {
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
    req.session.userId = userid;
    req.session.name = payload.name;
    req.session.email = payload.email;
    req.session.isStudent = true;
    req.session.isFaculty = true;
    req.session.isORSP = true;
    req.session.isORSPAdmin = true;
    res.send(true);
  }
  verify().catch(console.error);
});

app.listen(port, () => console.log(`Server now running at port ${port}`));

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

//Catch all routing
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
