import express from 'express';
import * as dotenv from 'dotenv';

import { createPost, getAllPosts } from '../controllers/post.js';
import { GuardAuth } from '../middleware/GuardAuth.js';

dotenv.config()

const router = express.Router()

router.get('/', getAllPosts)
router.post('/', GuardAuth, createPost)

export default router