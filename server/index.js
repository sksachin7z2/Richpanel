import express from 'express'
import cors from 'cors'
import connectToMongo from './db.js';
import authRoute from './routes/auth.js'
import subscribeRoute from './routes/subscription.js'
import planRoute from './routes/plan.js'
import bodyParser from 'body-parser'
import paymentRoute from './routes/payment.js'
const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());

// app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

connectToMongo();

app.get('/getkey',async(req,res)=>{
    res.send(process.env.PUBLISHABLE_KEY)
})

app.use('/api/auth',authRoute);
app.use('/api/payment',paymentRoute);
app.use('/api/plan',planRoute);
app.use('/api/subscribe',subscribeRoute);



app.listen(PORT,()=>{
    console.log(`server is listing at http://localhost:${PORT}`);
})



