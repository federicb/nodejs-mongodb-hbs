const express = require('express');
const path = require('path')
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const { request } = require('http');


//initialization
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000); //si no hay un puerto usa el 3000
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
    //handlerbar action pass like object
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', '.hbs')//configura el motor de las vistas con .hbs

//midlewares
app.use(express.urlencoded({extended: false}))//method to stand data 
app.use(methodOverride('_method')); //sirve para que los formularios puedan enviar otros metodos como PUT y DELETE
app.use(session({
    secret: 'potatoes',
    resave: true,
    saveUninitialized: true
})); //permite autenticar al usuario y almacenar temporalmente
app.use(flash());

//gobal variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');

    next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});