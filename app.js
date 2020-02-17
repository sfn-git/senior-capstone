const express = require('express');
const path = require('path');
const app = express();
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