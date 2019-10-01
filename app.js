const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

//  Load routes
const users = require('./routes/users');

//  DB config
const db = require('./config/database');

//  Connect to mongoose
mongoose.connect(db.mongoURI, {

    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//  Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//  Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//  Static folder
app.use(express.static(path.join(__dirname, 'public')));

//  Method override middleware
app.use(methodOverride('_method'));

//  Express session middleware
app.use(session({

    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//  Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//  Connect flash middleware
app.use(flash());

//  Global variables
app.use(function(req, res, next) {

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//  Index route
app.get('/', (req, res) => {

    res.render('index');
});

app.get('/about', (req, res) => {

    res.render('about');
});

//  Use routes
app.use('/users', users);

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server is running on ${port}`));