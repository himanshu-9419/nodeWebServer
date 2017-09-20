const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();

const port=process.env.PORT || 3000;

app.get('/',(request,response)=>{
    response.render('home.hbs',{
        pageTitle:"Home",
        welocmeMessage:"Welocme to server"
    })
});

app.get('/project',(request,response)=>{
    response.render('project.hbs',{
        pageTitle:"project",
        welocmeMessage:"Welocme to server"
    })
});

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err) console.log("something bad");
    })
    console.log(`${now} ${req.method} ${req.url}`);
    next();
});

app.set('view engine','hbs')
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>new Date().getFullYear());
hbs.registerHelper('screamIt',(text)=> text.toUpperCase());
app.use(express.static(__dirname+'/public'));

app.get('/about',(request,response)=>{
    //response.send("about page");
    response.render('about.hbs',{
        pageTitle:"About",
    });
});

app.listen(port,()=>{
    console.log("Server is running on port 3000");
});