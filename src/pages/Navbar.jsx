import React from 'react'
import logo from '../assets/logo.jpeg'
import { useSelector } from 'react-redux'
const Navbar = () => {
    const {currentUser} = useSelector(state => state.user);
    console.log(currentUser);
  return (
    <div className='h-[50px] w-screen bg-black flex justify-between'>
        <div className='h-[100px] w-[170px] object-cover'><img src={logo} alt="logo" /></div>
        <div className='text-white px-4 py-3'>{currentUser.user.name}</div>
    </div>
  )
}

export default Navbar