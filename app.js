const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement. 
const dir = __dirname;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Database models
// const projectModel = require('./models/projects.js');
const database = mongoose.connection;


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
    require('./models/database.js');
    const majorModel = require('./models/major.js');
    
    majorModel.find({}, (err, fun)=>{
        if(err) console.error(err);
        console.log(fun);
        database.close();
    })
    
})

//Catch all routing
app.get("*", (req,res)=>{
    res.sendFile(htmlFile(req.url));
})

// All Post Request
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
        database.close();
        res.send(newMajor);
    })
    

})

app.post("/getmajors", (req,res)=>{
    require('./models/database.js');
    const majorModel = require('./models/major.js');
    var sendThis;

    console.log('Post received from Major Insert');

    majorModel.find({}, function (err, fun){
        if(err) console.error(err);
        console.log('Test');
    });

    res.send(sendThis);
    database.close();
})

app.listen(port, ()=>console.log(`Server now running at port ${port}`));

// Database listeners
database.on('error', console.error.bind(console, 'Error connecting to db'));
database.once('open', ()=>{console.log('Connection to database successful!')});


// Function to make it easier to call a page instead of having to do path.join everytime. Just need the name without the .html
function htmlFile(page){
    viewsPath = 'views' + page;
    return path.join(dir, viewsPath);
}