import React from 'react'
import logo from '../assets/logo.jpeg'

const Logo = () => {
  return (
      <div className='object-cover'>
        <img height="56px" width="220px" src={logo} alt="logo" />
      </div>
  )
}

export default Logo;
