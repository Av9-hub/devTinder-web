import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [gmail,setGmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [isLoginForm,setIsLoginForm]=useState(true);
  const [firstName,setFirstName]=useState();
  const [lastName,setLastName]=useState();


  const dispatch=useDispatch();
  const navigate=useNavigate();

  // <GoogleLogin
  //   onSuccess={credentialResponse=>{
  //     console.log(credentialResponse);
  //   }}
  //   onError={()=>{
  //     console.log('Login Failed')
  //   }}
  //   />

  const login=useGoogleLogin({
    onSuccess:async(tokenResponse)=>{
    
    //fetch
    try{
    const userInfo=await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers:{
          Authorization:`Bearer ${tokenResponse.access_token}`,
        },
      }
    )
    console.log(userInfo.data);
    const {email,name,picture,sub}=userInfo.data

   const res= await axios.post(`${BASE_URL}/auth/google`,
      {email,name,picture,sub},
      {withCredentials:true}
    );
    dispatch(addUser(res.data.data));
    console.log(res);
    if(res){
      return navigate("/profile")
    }
  }
  

  catch(err){
    setError(err?.response?.data||"Something went wrong")
  }
}
  });
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
    <div className='flex justify-center items-center mt-10 overflow-y-scroll mb-36'>
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

      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer justify-center"
       onClick={()=>login()}><img
        src="https://www.svgrepo.com/show/355037/google.svg"
        className="w-5 h-5"
      />{isLoginForm?"Sign In":"Sign Up"} with Google </button>

    {isLoginForm?<button className="btn  bg-base-300 " onClick={handleLogin}>Login</button>:
    <button className="btn  bg-base-300 " onClick={handleSignUp}>SignUp</button>}

      {isLoginForm?<div className='text-center'>NewUser? <a onClick={()=>setIsLoginForm(!isLoginForm)} className='cursor-pointer font-bold'>SignUp Here</a></div>:
    <div>Already Registered? <a onClick={()=>setIsLoginForm(!isLoginForm)} className='cursor-pointer font-bold'>Login Here</a></div>}

  </fieldset>
  </div>
  )
}

export default Login