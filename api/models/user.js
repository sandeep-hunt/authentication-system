const bcrypt = require('bcryptjs');

module.exports = {
    async findUserByEmail(db, email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    
    async createUser(db, username, email, password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    },
    
    async comparePassword(inputPassword, storedPassword) {
        return bcrypt.compare(inputPassword, storedPassword);
    }
};
