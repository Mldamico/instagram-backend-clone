import connection from '../db/connection';

class User {
  private email: string;
  private password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static getUsers() {
    return new Promise(function (resolve, reject) {
      connection.query('SELECT * FROM users', function (err, results, fields) {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  save() {
    connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [
      this.email,
      this.password,
    ]);
  }
}

export default User;
