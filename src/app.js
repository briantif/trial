const express = require('express');
const path = require('path');
const morgan = require('morgan');
const myConnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const conexion = require('./database/dbCon')
const customRoutes = require('./routes/routes');
app.use(session({
    secret : 'TEravmoe',
    resave : false,
    saveUninitialized : true
  }));
//configuraciones

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customRoutes);


// static files
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000, ()=>{
    console.log('Server on  port 3000');
})