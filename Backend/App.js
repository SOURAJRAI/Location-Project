const express=require('express')
const cors=require('cors')
const locationRoutes=require('./Routes/LocationRoutes')
const groupRoutes=require('./Routes/GroupRoutes')
const status=require('express-status-monitor')
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(status());

app.use('/api',locationRoutes)
app.use('/api',groupRoutes)


module.exports=app;