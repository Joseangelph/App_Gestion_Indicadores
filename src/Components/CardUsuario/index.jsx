import React from 'react'


const CardUsuario = ({user}) => {
  return (
    
    < >
      <div className='flex justify-between items-center m-4 h-10 bg-red-500'>
        <h1>{user.username}</h1>
        <h1>{user.first_name}</h1>
        <h1>{user.last_name}</h1>
        <p>{user.role}</p>
        <button>

        </button>
      </div>
        
    </>
    
  )
}

export default CardUsuario
