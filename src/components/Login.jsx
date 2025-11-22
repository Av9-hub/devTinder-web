import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [gmail,setGmail]=useState("abhinav@gmail.com");
  const [password,setPassword]=useState("Abhi@123");
  const [error,setError]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleLogin=async()=>{
    try{
      const res=await axios.post(BASE_URL+"/login",
      {gmail,password},
      {withCredentials:true}
    );
    console.log(res.data);
    dispatch(addUser(res.data));
    return navigate("/");
  }
  catch(err){
    setError(err?.response?.data||"Something went wrong");
  }
  }

  return (
    <div className='flex justify-center items-center mt-32  '>
    <fieldset className="fieldset bg-base-200 border-base-100 rounded-box  border p-6 w-1/4 ">

    <label className="label font-semibold text-sm text-white ">Email</label>
    <input
       type="email"
        value={gmail}
         className="input bg-white mb-3.5  text-neutral-950"
         onChange={(e)=>setGmail(e.target.value)}/>

    <label className="label font-semibold text-sm text-white ">Password</label>
    <input 
      type="password"
        value={password}
        className="input bg-white  text-neutral-950"  
        onChange={(e)=>setPassword(e.target.value)}/>
      <p className='text-red-600 mb-10'>{error}</p>

    <button className="btn  bg-base-300 " onClick={handleLogin}>Login</button>
  </fieldset>
  </div>
  )
}

export default Login