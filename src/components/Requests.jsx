import React, {useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addRequest,removeRequest } from '../utils/requestSlice';
import {useDispatch, useSelector} from 'react-redux';


const Requests = () => {
    const dispatch=useDispatch();
    const requestData=useSelector(store=>store.requests);

    const getRequests=async()=>{
        try{
        const requests=await axios.get(BASE_URL+"/user/requests/receieved",{withCredentials:true});
        dispatch(addRequest(requests.data.connectionRequests));
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        getRequests();
    },[])

    const reviewRequest=async(status,requestId)=>{
        try{
        const data=await axios.post(BASE_URL+"/request/review/"+status+"/"+requestId,{},
            {withCredentials:true}
        );
         dispatch(removeRequest(requestId));
    }
    catch(err){
        console.error(err);
    }
    }
    
    if(!requestData){
        return <h2 className='text-3xl text-center mt-10'>Please wait...</h2>

    }
    if(requestData.length===0){
        return <h2 className='text-3xl text-center mt-10'>No Request Found.</h2>
    }
  return (
      
    <div>
        <h3 className='font-semibold text-3xl text-center mt-10 mb-3'>
        Requests
        </h3>
      { requestData.map((r)=>{

            const {firstName,lastName,age,gender,about,image,_id}=r.fromUserId;
            
            return  <div key={_id} className='w-2/5 flex mx-auto bg-base-300 rounded-lg mb-5 overflow-hidden items-center '>
                
                <img className='w-20 h-20 mr-5' src={image} alt=''/>
                <div className='w-5/4'>
                <span>{firstName}</span>
                <span> {lastName}</span><br></br>
                {age&&(<span className='text-sm'>{age +", "}</span>)}
                {gender&&(<span className='text-sm'>{gender}</span>)}
                <br/>
                 <p className='text-[12px]'>{about}</p> 
                </div>
                <button onClick={()=>reviewRequest("accepted",r._id)} className='bg-blue-500 mx-3 text-black font-semibold rounded-sm p-1'>Accepted</button>
                <button onClick={()=>reviewRequest("rejected",r._id)} className='bg-pink-300 font-semibold text-black rounded-sm mr-1.5 p-1'>Rejected</button>
                
            </div>
            
        })} 
        
    </div>
  )
}

export default Requests;