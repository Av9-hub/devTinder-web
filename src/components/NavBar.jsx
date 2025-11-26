import {Link} from 'react-router-dom';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { clearConnection } from '../utils/connectionSlice';
import {clearFeed} from '../utils/feedSlice'
import { clearRequest } from '../utils/requestSlice';
import logo from '../assets/Logo.png'

const NavBar = () => {
    const user=useSelector(store=>store.user);
    const request=useSelector(store=>store.requests);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogout=async()=>{
        try{
            await axios.post(BASE_URL+"/logout",{},
            {withCredentials:true}
        )
        navigate("/login");
        dispatch(removeUser());
        dispatch(clearConnection());
        dispatch(clearFeed());
        dispatch(clearRequest());
        }
        catch(err){
            console.error(err);
        }
    }
    
  return (
       <div className="navbar bg-base-300 shadow-sm ">
    <div className="flex-1 mx-10 ">
        <div className='flex'>
        {/* //<img className='w-10 h-10 ' src={logo}/> */}
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
    </div>
    {user&&(<div className="flex gap-2 items-center">
        <Link to="/requests"><button className="btn">
        Request{ request&&<div className="badge badge-sm">{request.length}</div>}
        </button>

        </Link>
        <div className='font-bold'>{"Welcome, "+user.firstName}</div>
        <div className="dropdown dropdown-end mx-10">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            <img
                alt="Tailwind CSS Navbar component"
                src={user.image} />
            </div>
        </div>
        <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
            <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
            </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
        </div>
    </div>)}
    </div>
  )
}

export default NavBar