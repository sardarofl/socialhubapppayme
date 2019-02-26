const express   = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var cors=require('cors');
const config = require("./config/database")
const passport = require('passport');


//connect to database
mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected', () => {
  console.log('connected to database '+config.database);
});
//on error
mongoose.connection.on('error', () => {
  console.log('Database Erro '+config.database);
});



//express
const app = express();

app.use(express.static(path.join(__dirname, 'paymeangular/dist/paymeangular')));
app.use('/posts_images', express.static(path.join(__dirname, 'posts_images')))
app.use('/profile_images', express.static(path.join(__dirname, 'profile_images')))

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//port
const port = process.env.PORT || 80;

//cors
app.use(cors());

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//index route
app.get('/',(req,res) =>{
  res.sendFile(path.join(__dirname, 'paymeangular/dist/index.html'));
})


//routers
const fetch = require('./routes/fetchs');
const add = require('./routes/adds');
const d_delete = require('./routes/deletes');
const s_set = require('./routes/sets');
const users = require('./routes/users');

//use routers
app.use('/fetchs',fetch);
app.use('/additems',add);
app.use('/deletes',d_delete);
app.use('/sets',s_set);
app.use('/users',users);


app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'paymeangular/dist/paymeangular/index.html'));
});



app.listen(port,  () => {
  console.log('Server started on port'+port);
});
