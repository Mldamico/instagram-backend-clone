import { Router } from 'express';
import { createPost, getPosts } from '../controllers/post.controller';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
