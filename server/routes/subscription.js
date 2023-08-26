import express from 'express'
import { getSubscription,createSubscription,updateSubscription,deleteSubscription } from '../controller/subscribecontroller.js';
import fetchuser from '../middleware/fetchuser.js';
const router=express.Router();

router.post('/getSubscription',fetchuser,getSubscription);
router.post('/createSubscription',fetchuser,createSubscription);
router.put('/updateSubscription/:id',fetchuser,updateSubscription);
router.delete('/deleteSubscription/:id',fetchuser,deleteSubscription);


export default router;