import Cookies from 'js-cookie'
import React,{useState,useEffect} from 'react'
import {CardElement, useElements} from '@stripe/react-stripe-js'
import { useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'

function Payment({host}) {
  const elements=useElements();
  const stripe=useStripe();
  const [userinfo, setUserinfo] = useState({})
  const cap=(a)=>{
    let f=a[0].toUpperCase();
    return f+a.slice(1)
}
const getdata=async()=>{
  try {
    const user=await axios.post(`${host}/api/auth/getUser`,{},{
      headers:{
        "auth-token":Cookies.get('auth-token__rich-p$nal')
      }
    })
    setUserinfo(user.data)
  } catch (error) {
    console.log(error)
  }
}
// useEffect(() => {
// // getdata();
// }, [])

const handlesubmit=async()=>{
  if(!stripe || !elements)
  return;
  try {
    const createpayment=await axios.post(`${host}/api/payment/create`,{
      currency:"INR",
      method:'card',
      amount:Cookies.get('price')
    },{
      headers:{
        'Content-Type':"application/json"
      }
    })
    const clientSecret=createpayment.data.clientSecret
    console.log(clientSecret)
   const {paymentIntent}=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:elements.getElement(CardElement)
      }
    })
    // console.log(paymentIntent)
    
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className='bg-[#2b4b8b] h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className=' rounded-md bg-white'>
          <div className='grid grid-cols-[60%_40%] w-[70vw] rounded-md ' >
            <div className='p-9'>
                  <div className='font-semibold text-[1.5rem] '>Complete Payment</div>
                  <div className='text-sm text-gray-500'>Enter your credit or debit card details below</div>

                  <div className='my-5 border-2 rounded py-2 px-2 border-gray-500 '>
                    <CardElement/>
                  </div>
                  <div className='mt-3 '>
                    <button onClick={handlesubmit} className='bg-[#2b4c8c]  text-white py-2 px-5'>Confirm Payment</button>
                  </div>
            </div>
            <div className='bg-[#f5f5f6] rounded-md p-9'>
              <div>
                <div className='text-xl font-semibold mb-5'>Order Summary</div>

                <div className='flex justify-between'>
                  <div className='text-sm font-medium'>
                      Plan Name
                  </div>
                  <div className='font-semibold text-sm'>
              {Cookies.get('plan')}
                  </div>
                </div>
<hr className='my-2'/>
                <div className='flex justify-between'>
                  <div className='text-sm font-medium'>
                      Billing Cycle
                  </div>
                  <div className='font-semibold text-sm'>
              {cap(Cookies.get('durationType'))}
                  </div>
                </div>
                <hr className='my-2'/>
                <div className='flex justify-between'>
                  <div className='text-sm font-medium'>
                      Plan Price
                  </div>
                  <div>
        
                  <div className='flex items-center justify-center gap-1'>
                                    <div>
                                    <svg fill="black" width="11px" height="11px" viewBox="-4.5 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m15.307 5.83v1.738.021c0 .29-.235.525-.525.525-.007 0-.015 0-.022 0h.001-2.864c-.23 1.609-1.032 2.998-2.19 3.981l-.009.008c-1.288 1.041-2.904 1.723-4.673 1.873l-.032.002q2.846 3.034 7.824 9.136c.086.085.139.202.139.332 0 .092-.026.177-.072.249l.001-.002c-.076.182-.252.308-.459.308-.013 0-.025 0-.037-.001h.002-3.324c-.006 0-.014 0-.021 0-.166 0-.313-.08-.404-.204l-.001-.001q-5.216-6.256-8.489-9.733c-.095-.093-.154-.222-.154-.365 0-.004 0-.007 0-.011v.001-2.167c.004-.3.246-.542.545-.546h1.909c.099.005.214.007.33.007 1.196 0 2.328-.273 3.338-.76l-.046.02c.855-.428 1.49-1.188 1.742-2.107l.005-.023h-7.28c-.006 0-.014 0-.021 0-.29 0-.525-.235-.525-.525 0-.007 0-.015 0-.022v.001-1.738c0-.006 0-.014 0-.021 0-.29.235-.525.525-.525h.022-.001 7.04q-.971-1.926-4.568-1.926h-2.471c-.3-.004-.542-.246-.546-.545v-2.268c0-.006 0-.014 0-.021 0-.29.235-.525.525-.525h.022-.001 14.182.021c.29 0 .525.235.525.525v.022-.001 1.738.021c0 .29-.235.525-.525.525-.007 0-.015 0-.022 0h.001-3.971c.526.689.908 1.516 1.085 2.417l.006.037h2.914.021c.29 0 .525.235.525.525v.022-.001z"></path></g></svg>
                                    </div>
                               
                                <div  className='font-semibold text-center  text-sm'>
                                {Cookies.get('price')}
                                </div>
                                </div>
                              
              
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Payment