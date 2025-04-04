require('dotenv').config();

const md = require('mongoose');
const express = require('express');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');
const CSectionRouter = require('./routes/courseSection');

const app = express();
const Port = process.env.PORT || 6000;


md.connect(process.env.DATABASE_URL,{dbName:'Coures_manager'})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
app.use(express.json());

//------Routes----------
app.use('/',userRouter)
app.use('/',courseRouter)
app.use('/',CSectionRouter)
app.listen(Port,()=>{console.log(`listening on ${Port}`)});