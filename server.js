require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./app/routes');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
app.use(cors({
    origin: ["http://localhost:3000", "https://phonesellfrontend.onrender.com"]
}));
mongoose.connect("mongodb+srv://zincgao:GAOxin991231@zinc.h7k65is.mongodb.net/PhoneSelling",{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
},(err) => {
    if (err){
        console.log(err);
    }else{
        console.log("Successfully connected!")
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.APP_SESSION_SECRET,
    cookie: {
        maxAge: 1800000
    },
    resave: true,
    saveUninitialized: true
}));

app.use(routes);
app.listen(PORT, () => {
    console.log('Server listening on port 8080!');
})