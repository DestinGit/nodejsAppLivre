let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');

// Moteur de template
app.set('view engine', 'ejs');

// --- Mes Middleware

// Session configure
app.use(session({
    secret: 'destinsecretkeys',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(require('./middlewares/flash'))
// Route static
app.use('/assets', express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//-- Mes Routes
app.get('/', (request, response) => {
    // importation de model
    let Message = require('./models/message');
    Message.all(function (messages) {
        response.render('pages/index', { messages: messages });
    });
});

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        request.flash('error', `Vous n'avez pas posté de message`);
        console.log(request.session);
        // redirection vers la page d'accueil
        response.redirect('/');
    } else {
        // importation de model
        let Message = require('./models/message');

        // Création/insertion du message dans la BD
        Message.create(request.body.message, () => {
            request.flash('success', `Merci ! :-)`);
            console.log(request.session);
            // redirection vers la page d'accueil
            response.redirect('/');
        });
    }
});

// Lancement du serveur
app.listen(8010);