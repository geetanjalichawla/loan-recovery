import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { dashBoard } from '../redux/user/userSlice';
import Sidebar from '../pages/Sidebar'
import AddAgentForm from '../pages/AddAgentForm'


const Dashboard = () => {
    const dispatch=useDispatch();
    const { currentUser,dashBoardData } = useSelector((state) => state.user);
    const arrayOfObjects = Object.values(dashBoardData);
    console.log(arrayOfObjects);


    const handleClick = async () => {
        try {
            const res = await axios.get('https://vehicle-node.onrender.com/backend/api/v1/dashboard',
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.user.token}`
                    }
                });
                dispatch(dashBoard(res.data));
                console.log(res.data);
        } catch (e) {
            console.log(e.message);
        }
    }

    // return (
        // <div className='w-full h-full flex mt-2 rounded-lg overflow-hidden'>
        //     <div className='w-[25%] bg-black h-full text-white'>
        //         <div className='flex flex-col '>
        //             <button type='button' onClick={() => {  }} className='cursor-pointer text-semibold text-xl p-5'>DashBoard</button>
        //         </div>
        //     </div>
        //     <div className='w-[75%] h-full'>
        //         {arrayOfObjects && arrayOfObjects.length > 0 ? (
        //             arrayOfObjects.map((data, index) => (
        //                 <div key={index}>
        //                     <p>{data}</p>
        //                 </div>
        //             ))
        //         ) : (
        //             <p>No data available</p>
        //         )}
        //     </div>
        // </div>

return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      <Sidebar />

      <main className="flex-1 ">

        <AddAgentForm />
        <footer className='bg-gray-400 w-auto h-6 relative top-96 '>
            <p className='text-center' >Copyright ©️ 2021<a href="#">Vinayak Associates.</a>All rights reserved</p>
      </footer>

      </main>
    </div>
  );
};

    

export default Dashboard