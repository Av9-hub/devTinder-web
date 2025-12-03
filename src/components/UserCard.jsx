import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';


const UserCard = ({user}) => {
    const {firstName,lastName,image,age,gender,about,_id}=user;
    const dispatch=useDispatch();
    
    const sendRequest=async(status)=>{
      try{
        const data=await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},
          {withCredentials:true});
        dispatch(removeFeed(_id));

      }
      catch(err){
        console.error("error in useCard"+err);
      }
}
  
    
  return (
        <div className=' '>
          <div className="card bg-base-300 w-70 h-[450px] mx-auto shadow-sm">
    <figure className='overflow-hidden w-full h-3/4'>
        <img className='w-full h-full mt-0'
        src={image}
        alt="Shoes" />
    </figure>
    <div className="card-body">
        <h2 className="card-title ">{firstName +" "+lastName}</h2>
        <p className='mt-0'>{user.about}</p>
        {age&&gender&&<span>{age +"  "+gender}</span>}
        <div className="card-actions justify-between">
        <button onClick={()=>sendRequest("ignored")} className="btn btn-primary h-8">Ignore❌</button>
        <button onClick={()=>sendRequest("interested")} className="btn bg-pink-200 h-8 text-black">Intrested❤️</button>

        </div>
    </div>
    </div>
        
    </div>
  )
}

export default UserCard