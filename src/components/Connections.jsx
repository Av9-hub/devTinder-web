import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addConnection } from '../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'

const Connections = () => {
    const userConnections=useSelector(store=>store.connections);
    const dispatch=useDispatch();
    const getConnections=async()=>{
          const connections=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
          dispatch(addConnection(connections.data.data));
      }
    useEffect(()=>{
       
        getConnections();
      
    },[]);

     if(!userConnections){
        return <h3 className='text-3xl text-center mt-10'>Loading..</h3>

     }
   if(userConnections.length===0){
        return <h3 className='text-3xl text-center mt-10'>No connections found..</h3>
    }
  
return (
  <div className="p-6">
    <h3 className="font-bold text-3xl text-center mt-4 mb-8 tracking-wide">
      Connections
    </h3>

    <div className="flex flex-col items-center gap-4 pb-28">
      {userConnections.map((c) => {
        const { firstName, lastName, age, gender, about, image } = c;

        return (
          <div
            key={c._id}
                className="
                w-full max-w-xl
                flex items-center justify-between
                bg-base-200 shadow-md 
                rounded-xl p-3 pl-4 pr-10
                hover:shadow-lg transition-all duration-300
                min-h-24
            "
          >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded-lg object-cover shadow-sm"
                src={image}
                alt=""
              />

              <div>
                <span className="text-lg font-semibold">
                  {firstName} {lastName}
                </span>

                {(age || gender) && (
                  <span className="text-xs text-gray-500 block">
                    {age && `${age} • `}{gender}
                  </span>
                )}

                {about && (
                  <p className="text-xs text-gray-700 mt-1 max-w-xs leading-snug">
                    {about}
                  </p>
                )}
              </div>
            </div>

            {/* SMALL RIGHT SPACE */}
            <Link to={"/chat/"+c._id}>
                <div className="w-10 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" 
                    className="w-6 h-6 text-gray-600" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" 
                        d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-3-6.708L21 3v9z"/>
                </svg>
            </div>
            </Link>
          </div>
        );
      })}
    </div>
  </div>
);

}

export default Connections