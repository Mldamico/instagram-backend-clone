import connection from '../db/connection';

class Post {
  private title: string;
  private text: string;
  constructor(title: string, text: string) {
    this.title = title;
    this.text = text;
  }

  static getPosts() {
    return new Promise(function (resolve, reject) {
      connection.query('SELECT * FROM posts', function (err, results, fields) {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  save() {
    connection.execute('INSERT INTO posts (title, text) VALUES (?, ?)', [
      this.title,
      this.text,
    ]);
  }

  static update(id: number, title: string, text: string) {
    return new Promise(function (resolve, reject) {
      connection.execute(
        'UPDATE posts SET title = ?, text = ? where idposts = ?',
        [title, text, id],
        function (err, results) {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
}

export default Post;
