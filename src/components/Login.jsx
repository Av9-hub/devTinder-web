import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [gmail,setGmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [isLoginForm,setIsLoginForm]=useState(true);
  const [firstName,setFirstName]=useState();
  const [lastName,setLastName]=useState();


  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleLogin=async()=>{
    try{
      const res=await axios.post(BASE_URL+"/login",
      {gmail,password},
      {withCredentials:true}
    );
  
    dispatch(addUser(res.data));
    return navigate("/");
  }
  catch(err){
    setError(err?.response?.data||"Something went wrong");
  }
  }
  const handleSignUp=async()=>{
    try{
      const res=await axios.post(BASE_URL+"/signUp",{firstName,lastName,gmail,password},
        {withCredentials:true}
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    }
    catch(err){
    setError(err?.response?.data||"Something went wrong");

    }
  }

  return (
    <div className='flex justify-center items-center mt-10  '>
    <fieldset className="fieldset bg-base-200 border-base-100 rounded-box  border p-6 w-1/4 ">

    {!isLoginForm&&(<><label className="label font-semibold text-sm text-white ">First Name</label>
    <input
       type="text"
        value={firstName}
         className="input bg-white mb-3.5 h-9 text-neutral-950"
         onChange={(e)=>setFirstName(e.target.value)}/>
    <label className="label font-semibold text-sm text-white ">Last Name</label>
    <input
       type="text"
        value={lastName}
         className="input bg-white mb-3.5 h-9 text-neutral-950"
         onChange={(e)=>setLastName(e.target.value)}/></>)}

    <label className="label font-semibold text-sm text-white ">Email</label>
    <input
       type="email"
        value={gmail}
         className="input bg-white mb-3.5 h-9 text-neutral-950"
         onChange={(e)=>setGmail(e.target.value)}/>

    <label className="label font-semibold text-sm text-white ">Password</label>
    <input 
      type="password"
        value={password}
        className="input bg-white h-9 text-neutral-950"  
        onChange={(e)=>setPassword(e.target.value)}/>
      <p className='text-red-600 mb-10'>{error}</p>

    {isLoginForm?<div className='text-center'>NewUser? <a onClick={()=>setIsLoginForm(!isLoginForm)} className='cursor-pointer font-bold'>SignUp Here</a></div>:
    <div>Already Registered? <a onClick={()=>setIsLoginForm(!isLoginForm)} className='cursor-pointer font-bold'>Login Here</a></div>}

    {isLoginForm?<button className="btn  bg-base-300 " onClick={handleLogin}>Login</button>:
    <button className="btn  bg-base-300 " onClick={handleSignUp}>SignUp</button>}

  </fieldset>
  </div>
  )
}

export default Login