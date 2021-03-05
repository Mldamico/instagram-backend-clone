import { Response, Request } from 'express';
import connection from '../db/connection';
import Post from '../models/Post';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const results = await Post.getPosts();
    console.log(results);
    res.json({
      ok: true,
      results,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't find any posts",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, text } = req.body;
  console.log(title, text);
  const post = new Post(title, text);

  try {
    await post.save();
    res.json({
      ok: true,
      post,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't Create new Post",
    });
  }
};

export const updatePost = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, text } = req.body;
  try {
    connection.execute(
      'UPDATE posts SET title = ?, text = ? where idposts = ?',
      [title, text, id],
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
      msg: "Couldn't update post",
    });
  }
};
