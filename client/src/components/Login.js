import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <section className='h-[100vh] flex items-center bg-blue-900'>

            <div className='bg-white w-[28%] p-10 m-auto  border border-gray-300 rounded-[5%]'>
                <h1 className='leading-tight tracking-tight flex items-center justify-center text-xl p-4 font-bold text-gray-800'>
                    Login to your account
                </h1>
                <form className='space-y-4' action='#'>
                    <div className='space-y-1'>
                        <label className='font-medium text-gray-900 '>Email</label>
                        <input type='email' name='email' class='w-full border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2' placeholder='manoj@richpanel.com' required='' />
                    </div>
                    <div  className='space-y-1'>
                        <label className='font-medium text-gray-900 '>Password</label>
                        <input type='password' name='password' placeholder='••••••••••••••' className='border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2' required='' />
                    </div>
                    <div className='flex items-center h-5'>
                        <input type='checkbox' class='w-4 h-4' />
                        <label className='px-2 text-gray-900 '>Remember me</label>
                    </div>
                    <button type="submit" class="w-full bg-primary-700  text-white bg-blue-900 focus:ring-2 font-medium rounded-md text-sm px-5 py-3 text-center">Login</button>
                    <div className='flex items-center justify-center'>
                        <p className="mt-3 text-gray-900 ">New to MyApp?
                        <Link to="/Signup" className="text-blue-500 m-2">Sign Up</Link>
                    </p>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default Login