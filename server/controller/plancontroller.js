import Plans from '../models/plan.js'

export const initiateplans=async()=>{
    try {


        const plans=[
                {
                    plan: "Basic",
                    video:"Good",
                    resolution:"480p",
                    device:["Phone","Tablet"],
                    price:{
                        monthly:100,
                        yearly:1000
                    },
                    screen:1
                },
                {
                    plan: "Standard",
                    video:"Good",
                    resolution:"720p",
                    device:["Phone","Tablet"],
                    price:{
                        monthly:200,
                        yearly:2000
                    },
                    screen:3
                },
                {
                    plan: "Premium",
                    video:"Better",
                    resolution:"1080p",
                    device:["Phone","Tablet","Computer"],
                    price:{
                        monthly:500,
                        yearly:5000
                    },
                    screen:5
                },
                {
                    plan: "Regular",
                    video:"Best",
                    resolution:"4K+HDR",
                    device:["Phone","Tablet","TV"],
                    price:{
                        monthly:700,
                        yearly:7000
                    },
                    screen:10
                },
        ]
        
        let res=plans.map(async(e)=>{
            try {
                const isplanpresent=await Plans.findOne({plan:e.plan});
                if(isplanpresent){
                    return "plan exist";
                }
                const r=await Plans.create(e);
                return `${e.plan} plan added`;

            } catch (error) {
                console.log(error);
                return "error while creating plan";
            }
         
        })
        let response=await Promise.all(res);
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}
export const getPlans=async(req,res)=>{
    try {
        const getdata=await Plans.find();
        res.json(getdata);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error");
    }
}

