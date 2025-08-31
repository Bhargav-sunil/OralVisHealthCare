const db = require("../config/database");

const getUserByEmail = (email) =>
  new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

const createUser = ({ name, email, password, role }) =>
  new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [name, email, password, role],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });

module.exports = {
  getUserByEmail,
  createUser,
};
