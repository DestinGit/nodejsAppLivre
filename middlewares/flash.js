// Exportation du module middleware
module.exports = function(request, response, next) {
    // logique de gestion des message flass dans la session
    if(request.session.flash) {
        response.locals.error = request.session.flash;
        request.session.flash = undefined;
    }
    
    // Ajout d'une clé flash dans la requête
    request.flash = function(type, content) {
        if (request.session.flash === undefined) {
            request.session.flash = {};
        }
        request.session.flash[type] = content;
    }
    
    // appel vers middleware qui suit
    next();
};