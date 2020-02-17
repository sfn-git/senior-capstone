const express = require('express');
const path = require('path');
const app = express();

// Everything needed for db
const dbconfig = require('./dbconfig.json');
const mongoose = require('mongoose');
const host = dbconfig.host;
const user = dbconfig.user;
const pass = dbconfig.password;
const authdb = dbconfig.authenticationDatabase;
const dbport = dbconfig.port;
const database = dbconfig.database;
const uri = `mongodb://${user}:${pass}@${host}:${dbport}/${database}?authSource=${authdb}`;

const port = process.env.PORT || 3000; //3000 for Development. Can be changed when we are ready to implement. 
const dir = __dirname;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get("/", (req,res)=>{

    res.sendFile(htmlFile('/index.html'));

});

app.get("/login", (req,res)=>{

    res.sendFile(htmlFile('/login.html'))

})

// Routing for testing

app.get("/mongotest", (req,res)=>{

    console.log(uri)
    mongoose.connect(uri, {useNewUrlParser: true});
    var myModel = mongoose.model('capstone');
    myModel.find((error, result)=>{
        if(error){
            console.log(error);
        }else{
            console.log(result);
        }
    });
    res.sendFile(htmlFile('/index.html'));

})

//Catch all routing
app.get("*", (req,res)=>{

    res.sendFile(htmlFile(req.url));
    
})


app.listen(port, ()=>console.log(`Server now running at port ${port}`));


// Function to make it easier to call a page instead of having to do path.join everytime. Just need the name without the .html
function htmlFile(page){
    viewsPath = 'views' + page;
    return path.join(dir, viewsPath);
}