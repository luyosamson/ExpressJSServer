const express=require('express');
const app=express();
const path = require('path');
const cors=require('cors');
const {logger}=require('./middleware/logEvents');
const errorHandler=require('./middleware/errorHandler');
const PORT=process.env.PORT || 3500;

//Custom middleware logger
app.use(logger);

//Cross origin resource sharing
const whitelist=['https://www.mysite.com','http://127.0.0.1:5500','http://localhost:3500']
const corsOptions={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin)!== -1 || !origin) {
            callback(null,true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}


app.use(cors(corsOptions));

//Buildin middlware to handle urlencoded data,in other words,form data
//'content-Type: application/x-www-form-urlencoded'

app.use(express.urlencoded({extended:false}));//Middleware for handling url encoded data-form data

//build-in middleware for json
app.use(express.json());

//serving static file
//The below public route will be serched before other routes
app.use(express.static(path.join(__dirname,'/public')));

app.get('^/$|/index(.html)?',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname});
    res.sendFile('./views/index.html',{root:__dirname});
});

app.get('/new-page(.html)?',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,'views','new-page.html'));
});

//Redirectold-page to newpage.html
app.get('/old-page(.html)?',(req,res)=>{
    
    res.redirect(301,'/new-page.html');
});


//Route Handlers
app.get('/hello(.html)?',(req,res,next)=>{
    console.log("Attempted to load Hello.html");
    next()
 },(req,res)=>{
     res.send("Hello world!!!!")

 })

 //Chaining route handlers
 const one=(req,res,next)=>{
    console.log("ONE");
    next()
 }
 const two=(req,res,next)=>{
    console.log("TWO");
    next()
 }
 
 const three=(reg,res)=>{
    console.log("Three")
    res.send("FINISHED")
 }

 app.get('/chain(.html)?',[one,two,three]);



app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));//302 by default

})

app.use(errorHandler);
 







app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

