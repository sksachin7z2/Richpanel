import express from 'express'
import cors from 'cors'
import connectToMongo from './db.js';
import authRoute from './routes/auth.js'

const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());

app.use(express.json());

connectToMongo();




app.listen(PORT,()=>{
    console.log(`server is listing at http://localhost:${PORT}`);
})



