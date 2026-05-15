const db = require('../config/db');

class Auth {
    static async register(data){
        const { username, email, password, role, status } = data;
        return db.promise().query('INSERT INTO users (username, email, password, role, status) VALUES (?, ?, ?, ?, ?)', [username, email, password, role, status]);
    }

    static async getEmail(email){
        return db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    }

    static async getUserById(id){
        return db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
    }
}

module.exports = Auth;