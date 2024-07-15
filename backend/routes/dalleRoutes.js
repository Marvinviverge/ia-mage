import express from 'express';
import * as dotenv from 'dotenv';
import {test, generate} from '../controllers/dalle.js';
import { GuardAuth } from '../middleware/GuardAuth.js';

dotenv.config()

const router = express.Router()

router.get('/', GuardAuth, test)
router.post('/', GuardAuth, generate)

export default router