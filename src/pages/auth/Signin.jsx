import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setError,
  setMessage,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import logo from "../../assets/logo.jpeg";
import { BASE_URL } from "../../main";
import { useForm } from 'react-hook-form';

// const Signin = () => {
//   const [formData, setFormData] = useState({});
//   const { loading, error, currentUser } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       dispatch(signInStart());
//       const res = await fetch(`${BASE_URL}/login-user`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       localStorage.setItem("user", JSON.stringify(data));
//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         return;
//       }

//       // storing token in local storage
//       dispatch(signInSuccess(data));
//       localStorage.setItem("token", data.user.token);
//       navigate("/dashboard");
//       console.log(data);
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };
//   return (

    // <div className="p-3 max-w-lg mx-auto border mt-16">
    //   <h1 className="text-3xl text-center font-semibold my-7 ">Login </h1>
    //   <img src={logo} alt="" />
    //   <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    //     <input
    //       type="email"
    //       placeholder="email"
    //       className="border p-3 rounded-lg"
    //       id="email"
    //       onChange={handleChange}
    //     />
    //     <input
    //       type="password"
    //       placeholder="password"
    //       className="border p-3 rounded-lg"
    //       id="password"
    //       onChange={handleChange}
    //     />
    //     <button disabled={loading}  className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>{loading ? 'Loading...' : 'Login'}</button>
    //   </form>
      // <div className="flex justify-between gap-2 mt-5">
      //   <div className="font-semibold">
      //     <span>Don't have an account?</span>
      //     <Link to="/register">
      //       <span className="text-blue-700"> Register</span>
      //     </Link>
      //   </div>
      //   <p className="text-red-700 font-semibold">Forgot password ?</p>
      // </div>
    //   {error && <p className="text-red-500 mt-5">{error}</p>}
    // </div>
//   );
// };

// export default Signin;

import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const schema = object({
  email: string().email(),
  password: string().min(3), // min 6
});

const Signin = () => {
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
      setApiError(null); // Clear any previous errors
      await axios.post(`${BASE_URL}/login-user`, data)
      .then(res=>{
        const userToken = res.data.user.token;
        localStorage.setItem('token', userToken);
        dispatch(setMessage("logged in successfully"))
      }).catch((err)=>{
        console.log(err.data.message)
        dispatch(setError(err.data.message))
        setApiError('Invalid email or password. Please try again.');
      })   
  };
  

  return (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
  {/* Logo Section */}
  <div className="w-full max-w-md text-center mb-6">
    <img src={logo} alt="Logo" className="mx-auto" />
  </div>

  {/* Sign In Form */}
  <form className="w-full max-w-md p-8 bg-white rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        {...register('email')}
        className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:border-blue-300"
      />
      <p className="text-red-500">{errors.email?.message}</p>
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-700">Password</label>
      <input
        type="password"
        id="password"
        {...register('password')}
        className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:border-blue-300"
      />
      <p className="text-red-500">{errors.password?.message}</p>
    </div>

    {apiError && <p className="text-red-500">{apiError}</p>}

    <button
      type="submit"
      className="w-full p-2 mt-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'signing in...' : 'Sign In'}
    </button>
  </form>

  <div className="flex justify-between gap-2 mt-5">
        <div className=" font-semibold">
          <span className="text-black" >Don't have an account?</span>
          <Link to="/register">
            <span className="text-blue-700"> Register</span>
          </Link>
        </div>
        {/* <p className="text-red-700 font-semibold">Forgot password ?</p> */}
      </div>

</div>
  );
};

export default Signin;