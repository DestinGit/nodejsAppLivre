let connection = require('../config/db');
let moment = require('../config/moment');

class Message {

    constructor(row) {
        this.row = row;
    }

    // Getters
    //id
    get id() {
        return this.row.id;
    }

    //content
    get content() {
        return this.row.content;
    }

    //create_at
    get create_at() {
        return moment(this.row.create_at);
    }
    
    static create(content, callback) {
        connection.query('INSERT INTO messages SET content = ?, create_at = ?', 
        [content, new Date()], (err, result) => {
            if(err) throw err;
            callback(result);
        })
    }

    static all(callback) {
        connection.query('SELECT * FROM messages', (err, rows) => {
            if(err) throw err;
            // A Eclaircir
            callback(rows.map((row) => new Message(row)));
        })
    }

    static find(id, callback) {
        connection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id],(err, rows) => {
            if(err) throw err;
            // A Eclaircir
            callback(new Message(rows[0]));
        })
    }
}

module.exports = Message;