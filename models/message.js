let connection = require('../config/db');

class Message {

    static create(content, callback) {
        connection.query('INSERT INTO messages SET content = ?, create_at = ?', 
        [content, new Date()], (err, result) => {
            if(err) throw err
            callback(result);
        })
    }

    static all(callback) {
        connection.query('SELECT * FROM messages', (err, rows) => {
            if(err) throw err;
            callback(rows);
        })
    }
}

module.exports = Message;