import express from 'express'
import cors from 'cors'
import connectToMongo from './db.js';
import authRoute from './routes/auth.js'
import subscribeRoute from './routes/subscription.js'

const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());

app.use(express.json());

connectToMongo();



app.use('/api/auth',authRoute);
app.use('/api/subscribe',subscribeRoute);



app.listen(PORT,()=>{
    console.log(`server is listing at http://localhost:${PORT}`);
})



