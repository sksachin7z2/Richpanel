import express from 'express'
import { getPlans } from '../controller/plancontroller.js';

const router=express.Router();

router.get('/getPlans',getPlans);


export default router;