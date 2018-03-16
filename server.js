let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');

// Moteur de template
app.set('view engine','ejs');

// --- Mes Middleware

// Session configure
app.use(session({
    secret: 'destinsecretkeys',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
// Route static
app.use('/assets', express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//-- Mes Routes
app.get('/', (request, response) => {
    if (request.session.error) {
        response.locals.error = request.session.error;
        request.session.error = undefined;
    }
    response.render('pages/index', {test: 'Salut'});
});

app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message === '') {
        request.session.error = 'Il y a une erreur';
        response.redirect('/');
    }
});

// Lancement du serveur
app.listen(8010);