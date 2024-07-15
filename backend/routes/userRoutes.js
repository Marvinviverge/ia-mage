import express from 'express';
import * as dotenv from 'dotenv';
import {signin, signup, updateHasFreeTrial} from '../controllers/user.js'
import {GuardAuth} from '../middleware/GuardAuth.js'

dotenv.config()

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.patch('/updateFreeTrial', GuardAuth, updateHasFreeTrial);

export default router