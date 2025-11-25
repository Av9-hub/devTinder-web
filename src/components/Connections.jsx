import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addConnection } from '../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'


const Connections = () => {
    const userConnections=useSelector(store=>store.connections);
    const dispatch=useDispatch();
    const getConnections=async()=>{
        const connections=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
        dispatch(addConnection(connections.data.data));
    }
    useEffect(()=>{
        getConnections();
    },[])
     if(!userConnections){
        return <h3 className='text-3xl text-center mt-10'>Loading..</h3>

     }
   if(userConnections.length===0){
        return <h3 className='text-3xl text-center mt-10'>No connections found..</h3>
    }
  return (
    <div>
        <h3 className='font-semibold text-3xl text-center mt-10 mb-3'>
        Connections
        </h3>
       { userConnections.map((c)=>{
            const {firstName,lastName,age,gender,about,image}=c;
            return  <div key={c._id} className='w-2/5 flex mx-auto bg-base-300 rounded-lg mb-5 overflow-hidden items-center '>
                <img className='w-20 h-20 mr-5 object-cover' src={image} alt=''/>
                <div>
                <span>{firstName}</span>
                <span> {lastName}</span><br></br>
                {age&&(<span className='text-sm'>{age +" "}</span>)}
                {gender&&(<span className='text-sm'>{gender}</span>)}
                <br/>
                 <p className='text-sm'>{about}</p> 
                </div>
                
                
            </div>
        })}
        
    </div>
  )
}

export default Connections