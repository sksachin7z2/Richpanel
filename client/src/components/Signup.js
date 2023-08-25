import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import axios from 'axios'
function Signup({host}) {
    let navigate=useNavigate()
    // const [rememberme, setRememberme] = useState(false)
    const [creadentials, setCreadentials] = useState({name:"",email:"",password:""});
const handlechange=(e)=>{
    setCreadentials({...creadentials,[e.target.name]:e.target.value});
}
const handleSignUp=async()=>{
try {
    let rememberme=document.getElementById('remembermesignup').checked;
    console.log(rememberme)
    console.log(creadentials)
    const user=await axios.post(`${host}/api/auth/signup`,{name:creadentials.name,email:creadentials.email,password:creadentials.password});

    const data=user.data;
    if(rememberme)
    Cookie.set('auth-token__rich-p$nal',data.authToken,{expires:365});
    else
    Cookie.set('auth-token__rich-p$nal',data.authToken);
    navigate('/login');
} catch (error) {
    console.log(error)
    alert(error.response.data.error)
}
}
  return (
    <section className='h-[100vh] flex items-center justify-center w-[100vw] bg-[#2a4b8b]'>

            <div className='bg-white p-10   border border-gray-300 rounded-[5%] w-[24rem] m-4 '>
                <h1 className='flex items-center justify-center text-xl p-4 pb-6 font-semibold text-gray-800'>
                    Create Account
                </h1>
                <div className='space-y-4' >
                <div className='space-y-1'>
                        <label className='font-medium text-gray-900 '>Name</label>
                        <input type='text' name='name' value={creadentials.name} onChange={handlechange} class='w-full border  border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2' placeholder='Manoj Kumar' required='' />
                    </div>
                    <div className='space-y-1'>
                        <label className='font-medium text-gray-900 '>Email</label>
                        <input type='email' name='email' value={creadentials.email} onChange={handlechange}  class='w-full border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2' placeholder='manoj@richpanel.com' required='' />
                    </div>
                    <div  className='space-y-1'>
                        <label className='font-medium text-gray-900 '>Password</label>
                        <input type='password' value={creadentials.password}  onChange={handlechange} name='password' placeholder='••••••••••••••' className='border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2' required='' />
                    </div>
                    <div className='flex items-center h-5'>
                        <input type='checkbox' class='w-4 h-4' id='remembermesignup'  />
                        <label className='px-2 text-gray-900 ' htmlFor='remembermesignup'>Remember me</label>
                    </div>
                    <button onClick={handleSignUp} type="submit" class="w-full bg-primary-700  text-white bg-[#2b4c8c] focus:ring-2 font-medium rounded-md text-sm px-5 py-3 text-center">Sign Up</button>
                    <div className='flex items-center justify-center'>
                        <p className="mt-3 text-gray-900 text-sm font-semibold">Already have an account?
                        <Link to="/login" className="text-blue-500 text-sm m-2">Login</Link>
                    </p>
                    </div>
                </div>
            </div>

        </section>
  )
}

export default Signup