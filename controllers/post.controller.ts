import { Response, Request } from 'express';
import connection from '../db/connection';

export const getPosts = async (req: Request, res: Response) => {
  try {
    connection.query('SELECT * FROM posts', function (err, results, fields) {
      res.json({
        ok: true,
        results,
      });
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't Create new Post",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, text } = req.body;
  console.log(title, text);
  // console.log(req.body);
  console.log('entro');
  try {
    connection.execute(
      'INSERT INTO posts (title, text) VALUES (?, ?)',
      [title, text],
      function (err, results, fields) {
        res.json({
          ok: true,
          post: { title, text },
        });
      }
    );
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't Create new Post",
    });
  }
};