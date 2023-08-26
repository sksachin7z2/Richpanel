import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Switch from 'react-switch'
import Cookies from 'js-cookie';
import { useNavigate ,useLocation} from 'react-router-dom';
import queryString from 'query-string'
function PlanSelection({host,setProgress}) {
    let navigate=useNavigate();
    let location=useLocation();
    let {change}=queryString.parse(location.search);
const [Plans, setPlans] = useState([]);
const [durationType, setDurationType] = useState("monthly")
const [checked, setChecked] = useState(false)
const [planStatus, setPlanStatus] = useState("Basic")
const handleChange=(checked)=>{
    setChecked(checked)
    if(checked){
    document.getElementsByClassName("react-switch-handle")[0].classList.add("maintransform")
    setDurationType('yearly')
    }
else{
document.getElementsByClassName("react-switch-handle")[0].classList.remove("maintransform")
setDurationType('monthly')
}
}

const cmp=(a,b)=>{
    const obj={"Regular":2,"Premium":1,"Standard":0,"Basic":-1}
    if(obj[a.plan]<obj[b.plan])
    return -1;
    else   if(obj[a.plan]>obj[b.plan])
    return 1;
    else
    return 0;
   
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

const handlesubmit=()=>{
    Cookies.set('durationType',durationType)
    Cookies.set('plan',planStatus)
    let plan=Plans.filter(e=>e.plan===planStatus)
    console.log(plan)
    Cookies.set('price',plan[0].price[durationType])
    if(!change){
    navigate('/payment');
    }
else
navigate(`/payment?change=${true}`)
}
const getsubscription=async()=>{
    try {
      const subs=await axios.post(`${host}/api/subscribe/getSubscription`,{},{
        headers:{
          'auth-token':Cookies.get('auth-token__rich-p$nal')
        }
      })
      const data=subs.data;
      console.log(data)
        if(data && !change){
        navigate('/planStatus')
        return;
        }
    } catch (error) {
      
      console.log(error)
    }
}
useEffect(() => {
    if(!Cookies.get('auth-token__rich-p$nal')){
    navigate('/login')
    return;
    }
  
    getsubscription()

  getPlans();

}, [])
  return (
    <div className='container h-[100vh] w-[70rem] m-auto flex justify-center items-center'>
        <div className='m-3 p-6'>
            <div className='font-bold text-xl text-center mb-5'>
                Choose the right plan for you
            </div>
<div class="relative  overflow-x-auto">
    <div class=" w-full text-sm text-left text-gray-500 ">
        <div class="font-semibold mb-6 grid  grid-cols-5   gap-10 text-gray-700 ">
         
           
            <div>
                <div className='relative top-7   '>

            <Switch
    checked={checked}
    onChange={handleChange}
    handleDiameter={32}
    offColor="#2b4c8c"
    onColor="white"
    offHandleColor="white"
    onHandleColor="#2b4c8c"
    height={55}
    width={160}
    borderRadius={30}
    activeBoxShadow="0px 0px 1px 2px "
    uncheckedIcon={
      <div className='text-sm'
        style={{
          display: "flex",
          
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width:"100%",
        color:"white",
        fontWeight:400,
          fontSize:13
        //   paddingRight: 2
        }}
      >
       Yearly
      </div>
    }
    checkedIcon={
        <div className='text-sm'
        style={{
            display: "flex",
          paddingLeft:"6px",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width:"100%",
          color:"white",
          fontWeight:400,
          fontSize:13
         
        }}
      >
        Monthly
      </div>
    }
    uncheckedHandleIcon={
      <div className='text-sm'
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
       backgroundColor:"white",
       padding:"0 2rem",
       borderRadius:"15px",
color:"#2b4c8c",
fontSize:13
         
        }}
      >
        Monthly
      </div>
    }
    checkedHandleIcon={
      <div className='text-sm'
        style={{
         
            width:"70px",
          display: "flex",
        //   width:"100%",
        // transform:"translate(-43px)",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor:"white",
          padding:"0 2rem 0 2rem",
          borderRadius:"15px",
        color:"#2b4c8c",
        
        fontSize:13
         
        }}
      >
        Yearly
      </div>
    }
    className="react-switch"
    id="small-radius-switch"
  />
                </div>
            </div>
                {
                    Plans.map((e)=>{
                        return(
                            <div className={` cursor-pointer py-[3rem] ${e.plan===planStatus?"bg-[#2b4c8c]": 'bg-[#7e93b9]'}  text-white`} onClick={()=>setPlanStatus(e.plan)}>
                                <div className='relative'>
                                <div >
                                    <div className='text-center'>
                                    {e.plan}
                                    </div>
                                
                                </div>
                                    {e.plan===planStatus&&<div class="bottom-arrow absolute w-[20px] left-[45%] h-[20px] bg-[#2b4c8c]"></div>}
                                </div>
                               
                           
                        </div>
                        )
                    })
                }
               
            
        </div>
        <div >
        <div className='grid grid-cols-5 gap-10 bg-white border-b'>
            <th >
                Monthly price
            </th>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class={`px-6 py-3 ${e.plan===planStatus?"text-[#2b4c8c]": 'text-gray-400'} `}>
                                <div className='flex items-center justify-center gap-1'>
                                    <div>
                                    <svg fill={`${e.plan===planStatus?"#2b4c8c":"#9da3ae"}`} width="11px" height="11px" viewBox="-4.5 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m15.307 5.83v1.738.021c0 .29-.235.525-.525.525-.007 0-.015 0-.022 0h.001-2.864c-.23 1.609-1.032 2.998-2.19 3.981l-.009.008c-1.288 1.041-2.904 1.723-4.673 1.873l-.032.002q2.846 3.034 7.824 9.136c.086.085.139.202.139.332 0 .092-.026.177-.072.249l.001-.002c-.076.182-.252.308-.459.308-.013 0-.025 0-.037-.001h.002-3.324c-.006 0-.014 0-.021 0-.166 0-.313-.08-.404-.204l-.001-.001q-5.216-6.256-8.489-9.733c-.095-.093-.154-.222-.154-.365 0-.004 0-.007 0-.011v.001-2.167c.004-.3.246-.542.545-.546h1.909c.099.005.214.007.33.007 1.196 0 2.328-.273 3.338-.76l-.046.02c.855-.428 1.49-1.188 1.742-2.107l.005-.023h-7.28c-.006 0-.014 0-.021 0-.29 0-.525-.235-.525-.525 0-.007 0-.015 0-.022v.001-1.738c0-.006 0-.014 0-.021 0-.29.235-.525.525-.525h.022-.001 7.04q-.971-1.926-4.568-1.926h-2.471c-.3-.004-.542-.246-.546-.545v-2.268c0-.006 0-.014 0-.021 0-.29.235-.525.525-.525h.022-.001 14.182.021c.29 0 .525.235.525.525v.022-.001 1.738.021c0 .29-.235.525-.525.525-.007 0-.015 0-.022 0h.001-3.971c.526.689.908 1.516 1.085 2.417l.006.037h2.914.021c.29 0 .525.235.525.525v.022-.001z"></path></g></svg>
                                    </div>
                               
                                <div className='text-center'>
                                {e.price[durationType]}
                                </div>
                                </div>
                              
                               
                            
                        </th>
                        )
                    })
                }
               
            </div>
            <div className='grid grid-cols-5 gap-10 bg-white border-b' >
            <th>
                Video quality
                </th>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class={`px-6 py-3 ${e.plan===planStatus?"text-[#2b4c8c]": 'text-gray-400'} `}>
                                <div className='text-center'>
                                {e.video}
                                </div>
                           
                        </th>
                        )
                    })
                }
               
            </div>
            <div className='grid grid-cols-5 gap-10 bg-white border-b'>
            <th>
                Number of active screens at one time
                </th>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class={`px-6 py-3 ${e.plan===planStatus?"text-[#2b4c8c]": 'text-gray-400'} `}>
                                <div className='text-center'>
                                {e.screen}
                                </div>
                            
                        </th>
                        )
                    })
                }
               
            </div>
            <div className='grid grid-cols-5 gap-10 bg-white border-b'>
            <th>
                Resolution
                </th>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class={`px-6 py-3 ${e.plan===planStatus?"text-[#2b4c8c]": 'text-gray-400'} `}>
                                <div className='text-center'>
                                {e.resolution}
                                </div>
                            
                        </th>
                        )
                    })
                }
               
            </div>
            <div className='grid grid-cols-5 gap-10  bg-white '>
            <th>
                <div >

                Devices you can use to watch
                </div>
                </th>
                {
                    Plans.map((e)=>{
                        return(
                            <th scope="col" class=" py-[2rem] ">
                                <div className={`flex flex-col gap-6 ${e.plan==='Mobile'?"h-[138px]":""}`}>             
                            {
                                e.device.map((f)=>{
                                    return (
                                        <div  class={`text-xs text-center  ${e.plan===planStatus?"text-[#2b4c8c]": 'text-gray-400'} `}>
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
               
            </div>
        </div>
    </div>
</div>
<div className='text-center'>
    <button onClick={handlesubmit} className='text-white bg-[#2b4c8c] py-[2vh] px-[11vw] text-center'>Next</button>
</div>
        </div>
    </div>
  )
}

export default PlanSelection