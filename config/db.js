var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'livreOR'
});
 
connection.connect();

// Exportation de la connexion qui pourra être utilisée partout dans l'application
module.exports = connection;