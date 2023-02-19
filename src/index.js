const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars')

//initialization
const app = express();

//settings
app.set('port', process.env.PORT || 3000); //si no hay un puerto usa el 3000
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs')//configura el motor de las vistas con .hbs

//midlewares


//gobal variables


//routes


//static files


//server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});