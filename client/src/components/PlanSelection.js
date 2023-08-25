import React,{useState,useEffect} from 'react'
import axios from 'axios'

function PlanSelection({host}) {
const [Plans, setPlans] = useState([]);
const [durationType, setDurationType] = useState("monthly")
const cmp=(a,b)=>{
    if(a.plan==="Mobile")
    return -1;
    else   if(a.plan==='Basic')
    return 0;
    else if(a.plan==='Standard')
    return 1;
    else
    return 2;
}
const getPlans=async()=>{
    try {
        
        const getplans=await axios.get(`${host}/api/plan/getPlans`);
        const data=getplans.data;
        data.sort(cmp);
        setPlans(getplans.data);
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
  getPlans();
}, [])

  return (
    <div className='container h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='m-3 p-6'>
            <div className='font-bold text-xl text-center mb-3'>
                Choose the right plan for you
            </div>
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 ">
            <tr>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class="px-6 py-3">
                            {e.plan}
                        </th>
                        )
                    })
                }
               
            </tr>
        </thead>
        <tbody>
        <tr className='bg-white border-b'>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class="px-6 py-3">
                            {e.price[durationType]}
                        </th>
                        )
                    })
                }
               
            </tr>
            <tr className='bg-white border-b'>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class="px-6 py-3">
                            {e.video}
                        </th>
                        )
                    })
                }
               
            </tr>
            <tr className='bg-white border-b'>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class="px-6 py-3">
                            {e.resolution}
                        </th>
                        )
                    })
                }
               
            </tr>
            <tr className='bg-white'>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class="px-6 py-3">
                                <div className='flex flex-col gap-3 justify-center'>             
                            {
                                e.device.map((f)=>{
                                    return (
                                        <div>
                                            {f}
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </th>
                        )
                    })
                }
               
            </tr>
        </tbody>
    </table>
</div>

        </div>
    </div>
  )
}

export default PlanSelection