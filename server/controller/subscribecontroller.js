import Subscriptions from "../models/subscription.js";


export const getSubscription=async(req,res)=>{
    try {
        const subscription = await Subscriptions.find({ user: req.user.id });
        res.send(subscription[0]);
      } catch (error) {
        console.error(message);
        res.status(500).send("Internal Server Error Occured");
      }
}
export const createSubscription=async(req,res)=>{
    try {
      console.log(req.body,req.user.id)
        const { plan,durationType,paymentIntent,isActive} = req.body;
        const issubscription = await Subscriptions.find({ user: req.user.id });
        
        if(issubscription.length!==0){
          return res.json({subscription:issubscription[0]})
        }

        const subscription =await Subscriptions.create({
            user:req.user.id,
            durationType:durationType,
            plan:plan,
            paymentIntent:paymentIntent,
            isActive:isActive
        })

        res.json({subscription:subscription});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
      }
}
export const updateSubscription=async(req,res)=>{
    const {id}=req.params;
    const {plan,durationType,paymentIntent,isActive}=req.body;

    try {
// console.log(id,isActive)
        const subscription=await Subscriptions.findById(id);

        if (!subscription) {
            return res.status(404).send("Not found");
          }
          if (subscription.user.toString() !== req.user.id) {
            return res.status(401).send("not authorised");
          }

          const updatedSubscription=await Subscriptions.findByIdAndUpdate(id,{
                    user:req.user.id,
                    plan:plan?plan:subscription.plan,
                    isActive:isActive,
                    durationType:durationType?durationType:subscription.durationType,
                    paymentIntent:paymentIntent?paymentIntent:subscription.paymentIntent,
          },{new:true})
          res.json({updatedSubscription:updatedSubscription})

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
export const deleteSubscription=async(req,res)=>{
        const {id}=req.params;
        try {
           
            let subscription = await Subscriptions.findById(id);
            if (!subscription) {
              return res.status(404).send("Not found");
            }
         
            if (subscription.user.toString() !== req.user.id) {
              return res.status(401).send("not authorised");
            }
            project = await Subscriptions.findByIdAndDelete(id);
            res.json({ success: "subscription has been deleted", subscription: subscription });
          } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occured");
          }

}