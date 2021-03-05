import { Router } from 'express';
import {
  createPost,
  getPosts,
  updatePost,
} from '../controllers/post.controller';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);

export default router;
