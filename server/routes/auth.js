import express from 'express'
import { getUser,signup,login } from '../controller/authcontroller.js';
import fetchuser from '../middleware/fetchuser.js';
const router=express.Router();

router.post('/getUser',fetchuser,getUser);
router.post('/signup',signup);
router.post('/login',login);


export default router;