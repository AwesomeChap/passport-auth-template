const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

const {mongoURI} = keys;

mongoose.connect(mongoURI).then(()=>{
    console.log('Connected to Database!');
}).catch((e)=>{
    console.log(e);
});

require('./config/passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.engine('handlebars',exphbs({
    defaultLayout:'main'
}));
app.set('view engine','handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
});

const index = require('./routes/index');
const auth = require('./routes/auth');

app.use('/',index);
app.use('/auth', auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});