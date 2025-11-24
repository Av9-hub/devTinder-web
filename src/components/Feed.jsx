import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {
  const feed=useSelector(store=>store?.feed);
  const dispatch=useDispatch();

    const getFeed=async()=>{
    try{  
      if(feed){
        return;
      }
      const feedUser=await axios.get(BASE_URL+"/feed",{withCredentials:true});
      // console.log(feedUser.data.data);
      dispatch(addFeed(feedUser?.data?.data));
    }
    catch(err){
      console.error("Error in get feed"+err);
    }
    }
    useEffect(()=>{
      getFeed()
    },[]);

  return (
    feed&&(<div className='mt-14'>
      
      <UserCard user={feed[0]}/> 
    </div>)
  )
}

export default Feed