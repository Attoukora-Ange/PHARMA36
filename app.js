require('dotenv').config({path:'Config/Config.env'});
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodeOveride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const cors = require('cors')

const ROUTE_ADMIN = require('./Routes/ROUTE_ADMIN');
const ROUTE_UTILISATEUR = require('./Routes/ROUTE_UTILISATEUR');
const ROUTE_TRESORIERE = require('./Routes/ROUTE_TRESORIERE');
const mongoose = require('./Controllers/Data/data');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());
app.use(morgan('tiny'));
app.use(methodeOveride('_method'));
app.use(express.static(path.join(__dirname + '/Public')));
app.use('css', express.static(path.join(__dirname + 'css')));
app.use('images', express.static(path.join(__dirname + 'images')));
app.use('js', express.static(path.join(__dirname + 'js')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(flash());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized:true,
    cookie: {
        maxAge: 30 * 60 * 1000, 
        sameSite: "lax",
        httpOnly: true,
      },
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', ROUTE_UTILISATEUR);
app.use('/admin', ROUTE_ADMIN);
app.use('/tresoriere', ROUTE_TRESORIERE);
app.use((req, res) =>{
    res.status(404).send('Page non trouvée');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`SERVER DEMARER AU PORT ${PORT}`));