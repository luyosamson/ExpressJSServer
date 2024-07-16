const express=require('express');
const app=express();
const path = require('path');
const PORT=process.env.PORT || 3500;

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

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));//302 by default

})

//Route Handlers





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

