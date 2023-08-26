import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function PlanStatus({host}) {
  let navigate=useNavigate();
  const [subscription, setSubscription] = useState({isActive:true,plan:"",durationType:"",date:new Date(),paymentIntent:{amount:0}});
  const [device, setDevice] = useState([])
  const [price, setPrice] = useState()
  let month=['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec']
  const getsubscription=async()=>{
      try {
        const subs=await axios.post(`${host}/api/subscribe/getSubscription`,{},{
          headers:{
            'auth-token':Cookies.get('auth-token__rich-p$nal')
          }
        })
        const data=subs.data;
        console.log(data)
        
          setSubscription(data);

        const getdevic=await axios.get(`${host}/api/plan/getPlans`);
const getdevice=getdevic.data
console.log(getdevice)
      let device=getdevice.filter(e=>e.plan===data.plan)[0];
      setPrice(device.price['yearly'])
      // console.log(device)
          setDevice(device.device)
          
      } catch (error) {
        
        console.log(error)
        navigate('/planSelection')
      }
  }
  useEffect(() => {
    if(!Cookies.get('auth-token__rich-p$nal')){
    navigate('/login')
    return;
    }
   getsubscription();
  }, [])
  const cancelplan=async()=>{
try {
  try {
    const cancel=await axios.put(`${host}/api/subscribe/updateSubscription/${subscription._id}`,{
      isActive:false
    },{
      headers:{
        'auth-token':Cookies.get('auth-token__rich-p$nal')
      }
    })
    getsubscription();
  } catch (error) {
    console.log(error)
  }
  
  
} catch (error) {
  console.log(error)
}
  }
  const changeplan=()=>{
try {
  navigate(`/planSelection?change=${true}`)
} catch (error) {
  console.log(error)
}
  }
 
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center bg-[#2a4b8b] '>
      <div className='p-5 rounded-md bg-white w-[40rem] m-3'>
        <div className='flex justify-between mb-5'>
          <div className='flex gap-2'>
            <div className=' font-semibold text-xl '>
              Current Plan Details
            </div>
            <div>
            <div class={`font-bold inline-flex items-center ${subscription.isActive? "bg-[#c7dbf9] text-[#365da5]":"text-[#d57670] bg-[#f9f0f0]"} text-xs mr-2 px-2.5 py-0.5 rounded-full `}>
                {subscription.isActive? <div>Active</div>: <div>Cancelled</div> }
            </div>
            </div>
          </div>
          <div>
      {subscription.isActive? <div className='text-md text-[#2a4c8c] font-semibold cursor-pointer' onClick={cancelplan}>Cancel</div>: <div></div> }
          </div>
        </div>

        <div className='font-semibold'>
          {subscription.plan}
        </div>
        <div>
          {
            device.map((e,i)=>{
              return (
                <span className='text-gray-500'>
                 {i<(device.length-1)? <span>{e}+</span>: <span>{e}</span> }
                  </span>
              )
            })
          }
        </div>
        <div>
        <div className='flex items-center my-3  gap-1'>
                                    <div>
                                    <svg fill="black" width="24px" height="24px" viewBox="-4.5 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m15.307 5.83v1.738.021c0 .29-.235.525-.525.525-.007 0-.015 0-.022 0h.001-2.864c-.23 1.609-1.032 2.998-2.19 3.981l-.009.008c-1.288 1.041-2.904 1.723-4.673 1.873l-.032.002q2.846 3.034 7.824 9.136c.086.085.139.202.139.332 0 .092-.026.177-.072.249l.001-.002c-.076.182-.252.308-.459.308-.013 0-.025 0-.037-.001h.002-3.324c-.006 0-.014 0-.021 0-.166 0-.313-.08-.404-.204l-.001-.001q-5.216-6.256-8.489-9.733c-.095-.093-.154-.222-.154-.365 0-.004 0-.007 0-.011v.001-2.167c.004-.3.246-.542.545-.546h1.909c.099.005.214.007.33.007 1.196 0 2.328-.273 3.338-.76l-.046.02c.855-.428 1.49-1.188 1.742-2.107l.005-.023h-7.28c-.006 0-.014 0-.021 0-.29 0-.525-.235-.525-.525 0-.007 0-.015 0-.022v.001-1.738c0-.006 0-.014 0-.021 0-.29.235-.525.525-.525h.022-.001 7.04q-.971-1.926-4.568-1.926h-2.471c-.3-.004-.542-.246-.546-.545v-2.268c0-.006 0-.014 0-.021 0-.29.235-.525.525-.525h.022-.001 14.182.021c.29 0 .525.235.525.525v.022-.001 1.738.021c0 .29-.235.525-.525.525-.007 0-.015 0-.022 0h.001-3.971c.526.689.908 1.516 1.085 2.417l.006.037h2.914.021c.29 0 .525.235.525.525v.022-.001z"></path></g></svg>
                                    </div>
                               
                                <div  className='font-bold text-center  text-[30px]'>
                                {price}<span className='font-normal'>/yr</span> 
                                </div>
                                </div>

                                <div className='mb-4'>
                                  <button onClick={changeplan} className='border-2 text-[#2a4c8c] font-semibold border-[#2a4c8c] py-2 px-6 rounded-md'>{subscription.isActive?"Change Plan":"Choose Plan"}</button>
                                </div>
                                <div className='bg-[#f6f6f7] py-1 px-2 rounded'>
                           <span className='font-normal'> Your subscription has started from </span> <span className='font-semibold'> {month[new Date(subscription.date).getMonth()]+" "+new Date(subscription.date).getDate()+", "+ new Date(subscription.date).getFullYear()}</span> <span className='font-normal'> and will auto renew on </span><span className='font-semibold'> {month[new Date(subscription.date).getMonth()]+" "+new Date(subscription.date).getDate()+", "+ parseInt(new Date(subscription.date).getFullYear()+1)}</span>
                                </div>
        </div>
        <div>

        </div>
      </div>

    </div>
  )
}

export default PlanStatus