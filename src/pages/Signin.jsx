import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import logo from "../assets/logo.jpeg"
import { BASE_URL } from '../main';

const Signin = () => {

  const [formData,setFormData]=useState({});
  const {loading,error,currentUser}=useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleChange = (e)=>{
    setFormData({
      ...formData,[e.target.id]:e.target.value
    })
  }

  const handleSubmit =async (e)=>{
      try {
        e.preventDefault();
        dispatch(signInStart())
        const res=await fetch(`${BASE_URL}/login-user`,{
          method : 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        });
        const data=await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        if(data.success === false){
           dispatch( signInFailure(data.message))
          return;
        }
    //     const { token } = data;

    // // storing token in local storage
    dispatch(signInSuccess(data))
    localStorage.setItem('token', data.user.token);
    navigate('/dashboard')
    // console.log("jvjhj", currentUser);
        console.log(data);
      } catch (error) {
        dispatch(signInFailure(error.message))
      }
  }
  return (
    <div className='p-3 max-w-lg mx-auto border mt-16'>
      <h1 className='text-3xl text-center font-semibold my-7 '>Login </h1>
        <img src={logo} alt="" />
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        {/* <button disabled={loading}  className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>{loading ? 'Loading...' : 'Login'}</button> */}
        <button className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>Login</button>
      </form>
      <div className='flex justify-between gap-2 mt-5'>
          <div className='font-semibold'>
          <span>Don't have an account?</span>
        <Link to='/register'><span className='text-blue-700'> Register</span></Link>
          </div>     
          <p className='text-red-700 font-semibold'>Forgot password ?</p>   
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signin