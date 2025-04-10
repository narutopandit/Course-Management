require('dotenv').config();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const md = require('mongoose');
const express = require('express');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');
const CSectionRouter = require('./routes/courseSection');
const progressRouter = require('./routes/progressRouter');
const { errorHandler } = require('./middlleware/errorMiddleware');

const app = express();
const Port = process.env.PORT || 6000;
const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true, // This is important for cookies
};

app.use(cors(corsOptions));
app.use(express.json()); // Parses incoming JSON requests
// Use cookie-parser
app.use(cookieParser());

md.connect(process.env.DATABASE_URL,{dbName:'Coures_manager'})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
app.use(express.json());

//------Routes----------
app.use('/api/v1/users',userRouter)
app.use('/api/v1/course',courseRouter)
app.use('/api/v1/section',CSectionRouter)
app.use('/api/v1/progress',progressRouter)

// ------Error Handler------
app.use(errorHandler);
app.listen(Port,()=>{console.log(`listening on ${Port}`)});
app.use("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});