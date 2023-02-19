const express = require('express');
const path = require('path')
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');


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
    extname: '.hbs'
}));
app.set('view engine', '.hbs')//configura el motor de las vistas con .hbs

//midlewares
app.use(express.urlencoded({extended: false}))//method to stand data 
app.use(methodOverride('_methods')); //sirve para que los formularios puedan enviar otros metodos como PUT y DELETE
app.use(session({
    secret: 'potatoes',
    resave: true,
    saveUninitialized: true
})); //permite autenticar al usuario y almacenar temporalmente

//gobal variables


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