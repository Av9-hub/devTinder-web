import React from 'react'


const UserCard = ({user}) => {
    const {firstName,lastName,image,age,gender,about}=user;
    console.log(gender);
    console.log(age);
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
        <button className="btn btn-primary h-8">Ignore❌</button>
        <button className="btn bg-pink-200 h-8 text-black">Intrested❤️</button>

        </div>
    </div>
    </div>
        
    </div>
  )
}

export default UserCard