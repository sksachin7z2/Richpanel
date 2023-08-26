import Stripe from "stripe"
import dotenv from 'dotenv'

dotenv.config();
const stripe=Stripe(process.env.SECRET_KEY);

export const payment=async(req,res)=>{
    const {amount,currency,method}=req.body;
   
    // stripe.customers.create({
    //     email:email,
    //     name:name,
    // }).then((customer)=>{
    //     return stripe.charges.create({
    //         amount:amount,
    //         description:"Subscription testing",
    //         currency:currency,
    //         customer:customer.id
    //     })
    // })
    // .then((charge)=>{
    //     res.json({payment:charge})
    // })
    try {
        const payment=await stripe.paymentIntents.create({
            amount:(parseInt(amount)*100).toString(),
            currency:currency,
           payment_method_types:[method]
        })
        res.json({clientSecret:payment.client_secret})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error:{message:e.message}});
    }
   
}