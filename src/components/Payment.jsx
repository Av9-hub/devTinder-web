import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useState } from 'react'

const Payment = () => {
  const [isPremium,setIsPremium]=useState(false);
  useEffect(()=>{
    verifyPremiumUser()
  },[]);
  const verifyPremiumUser=async()=>{
    const res=await axios.get(BASE_URL+"/premium/verify",
      {withCredentials:true}
    )
    if(res.data.isPremium){
    setIsPremium(true);
    }

  }
  const handleClick=async(plan)=>{
    try{
      const paymentData=await axios.post(BASE_URL+"/payment/create",
      {membershipType:plan},
      {withCredentials:true}
    )
    console.log(paymentData);
    
    const {keyId,amount,currency,notes,orderId}=paymentData.data;
    var options = {
    key: keyId,
    amount,  
    currency,
    name: "Dev Tinder",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: orderId, 
    prefill: {
        "name": notes.firstName+" "+notes.lastName,
        "email": notes.gmail,
        "contact": "+919876543210"
    },
    notes: {
        "address": "Razorpay Corporate Office"
    },
    theme: {
        "color": "#3399cc"
    },
    handler:verifyPremiumUser,  
  }
    const rzp = new window.Razorpay(options);
    rzp.open();

    }
    catch(err){
      console.error("errmessage "+err);
    }
    
  }
  return (
    
    isPremium?("You are Premium User"):(<div className='flex justify-evenly mt-16 '>
          <div className="card w-96 bg-base-300 shadow-sm">
      <div className="card-body">
        <span className="badge badge-xs badge-warning">Most Popular</span>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">Silver</h2>
          <span className="text-xl">₹500/mo</span>
        </div>
        <ul className="mt-6 flex flex-col gap-2 text-xs">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>High-resolution image resolution</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>Customizable style templates</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>More bigger feed</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>More recommendation to profile</span>
          </li>
          <li className="opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span className="line-through">Unlimited swipes</span>
          </li>
          <li className="opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span className="line-through">Create story</span>
          </li>
        </ul>
        <div className="mt-6">
          <button className="btn btn-primary btn-block" onClick={()=>{handleClick("silver")}}>Subscribe</button>
        </div>
      </div>
    </div>

              <div className="card w-96 bg-base-300 shadow-sm">
      <div className="card-body">
        <span className="badge badge-xs badge-warning">More Recommended</span>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">Gold</h2>
          <span className="text-xl">₹1000/mo</span>
        </div>
        <ul className="mt-6 flex flex-col gap-2 text-xs">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>High-resolution image resolution</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>Customizable style templates</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>More bigger feed</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>More recommendation to profile then Silver</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>Create story</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>Unlimited swipes</span>
          </li>
          
        </ul>
        <div className="mt-6">
          <button className="btn btn-primary btn-block" onClick={()=>{handleClick("gold")}}>Subscribe</button>
        </div>
      </div>
    </div>
    </div>
  ))
}

export default Payment