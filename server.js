const express=require('express');
const app=express();
const path = require('path');
const PORT=process.env.PORT || 3500;

app.get('/',(req,res)=>{
    res.send("HELLO WORLD!");
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

