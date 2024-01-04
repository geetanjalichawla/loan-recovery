import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { dashBoard } from '../redux/user/userSlice';
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

    return (
        <div className='w-full h-full flex mt-2 rounded-lg overflow-hidden'>
            <div className='w-[25%] bg-black h-full text-white'>
                <div className='flex flex-col '>
                    <p onClick={() => { handleClick() }} className='cursor-pointer text-semibold text-xl p-5'>DashBoard</p>
                </div>
            </div>
            <div className='w-[75%] h-full'>
                {arrayOfObjects && arrayOfObjects.length > 0 ? (
                    arrayOfObjects.map((data, index) => (
                        <div key={index}>
                            <p>{data}</p>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard