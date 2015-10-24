var index = require('./routes/test/pages_public');


module.exports.setup = function( app ) {
    app.get(   '/',            index.index );
    app.get(   '/api',         index.api );
    app.get(   '/login',       index.login );
    app.get(   '/logout',      index.logout );
    app.get(   '/register',    index.register );
    
};