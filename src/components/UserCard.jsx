import React from 'react'


const UserCard = ({user}) => {
    const {firstName,lastName,image,age,gender,about}=user;
  return (
        <div className='mt-10 '>
            <div className="card bg-base-300 w-80 h-96 mx-auto shadow-sm">
    <figure className='overflow-hidden w-full h-3/4'>
        <img className='w-full h-full mt-0'
        src={image}
        alt="Shoes" />
    </figure>
    <div className="card-body">
        <h2 className="card-title mb-0">{firstName}</h2>
        <p>{user.about}</p>
        {age&&gender&&<p>{"Age: "+age+" "+"Gender: "+gender}</p>}
        <div className="card-actions justify-between">
        <button className="btn btn-primary h-9">Ignore❌</button>
        <button className="btn bg-pink-200 h-9 text-black">Intrested❤️</button>

        </div>
    </div>
    </div>
        
    </div>
  )
}

export default UserCard