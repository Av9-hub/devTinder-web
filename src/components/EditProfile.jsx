import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = ({user}) => {

  const [firstName,setFirstName]=useState(user.firstName);
  const [lastName,setLastName]=useState(user.lastName);
  const [gender,setGender]=useState(user.gender);
  const [age,setAge]=useState(user.age);
  const [gmail,setGmail]=useState(user.gmail);
  const [about,setAbout]=useState(user.about);
  const [skills,setSkills]=useState(user.skills);
  const [image,setImage]=useState(user.image);
  const [degree,setDegree]=useState(user.degree);
  const [error,setError]=useState("");
  const dispatch=useDispatch();
  const [showToast,setShowToast]=useState(false);

  const handleClick=async()=>{
    setError("");
  try{
    const modifiedUser=await axios.patch(BASE_URL+"/profile/edit",
        {firstName,lastName,gmail,gender,age,image,skills,about,degree},
        {withCredentials:true})
    console.log(modifiedUser.data.data);
    dispatch(addUser(modifiedUser.data.data));
    setShowToast(true);
    setTimeout(()=>{
        setShowToast(false);
    },2000)
  }
  catch(err){
   
    setError(err.response.data);
  }
}

const Gender=["male","female","other"];

  return (
    <>
    <div className=' mt-14 mx-20 flex justify-evenly'>
    <fieldset className="fieldset flex bg-base-300 border-base-200 rounded-box  border p-6 w-1/2 ">
    <div className='mx-5 mt-1.5 w-1/2'>

    <label className="label font-semibold text-sm text-white mt-3">FirstName:</label>
    <input
       type="text"
        value={firstName}
         className="input bg-white h-9  text-neutral-950"
         onChange={(e)=>setFirstName(e.target.value)}
         />

    <label className="label font-semibold text-sm text-white mt-3">LastName:</label>
    <input 
      type="text"
        value={lastName}
        className="input bg-white h-9  text-neutral-950"  
         onChange={(e)=>setLastName(e.target.value)}

        />

      <label className="label font-semibold text-sm text-white mt-3">EmailID:</label>
    <input 
      type="email"
        value={gmail}
        className="input bg-white h-9  text-neutral-950" 
         onChange={(e)=>setGmail(e.target.value)}

        />
     
        <label className="label font-semibold text-sm text-white mt-3">About:</label>
    <textarea
       type="text"
        value={about}
         className="input bg-white h-[103px] mb-3.5  text-neutral-950  whitespace-pre-wrap wrap-break-words"
         onChange={(e)=>setAbout(e.target.value)}
         placeholder='Write about yourself.....'

         />
    </div>
    <div className='mt-1.5 w-1/2'>
       <label className="label font-semibold text-sm text-white mt-3">ImageURL:</label>
    <input 
      type="link"
        value={image}
        className="input bg-white h-9  text-neutral-950" 
         onChange={(e)=>setImage(e.target.value)}

        />

      <label className="label font-semibold text-sm text-white mt-3">Age:</label>
    <input
       type="number"
        value={age}
         className="input bg-white h-9  text-neutral-950"
         onChange={(e)=>setAge(e.target.value)}

         />

    

    <label className="label font-semibold text-sm text-white mt-3">Degree:</label>
    <input
       type="text"
        value={degree}
         className="input bg-white h-9   text-neutral-950"
         onChange={(e)=>setDegree(e.target.value)}

         />

    <label className="label font-semibold text-sm text-white mt-3">Skills:</label>
    <input 
      type="text"
        value={skills}
        className="input bg-white h-9  text-neutral-950" 
         onChange={(e)=>setSkills(e.target.value)}

        />

      <p className='text-red-600 mb-8'>{error}</p>
      <label className="label font-semibold text-sm text-white  mr-3.5">
      Gender:
    </label>
    <select
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="bg-white h-9 font-semibold rounded-md text-neutral-950 "
    >
      {Gender.map((g) => (
        <option className='font-bold mr-7 ' key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
    <button className="btn  bg-blue-900 ml-11 " onClick={handleClick} >Save</button>
    </div>

  </fieldset>
    <div className=''>
  <UserCard user={{firstName,lastName,image,age,gender,about}}/>
  </div>
  </div>

   {showToast&&(<div className="toast toast-top toast-center mt-8">
  
  <div className="alert alert-success">
    <span>Profile saved successfully!!</span>
  </div>
</div>)
}
  </>
  
  )

}

export default EditProfile