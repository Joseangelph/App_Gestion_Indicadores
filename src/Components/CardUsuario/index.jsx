import React from 'react'

const CardUsuario = ({user}) => {
  return (
    
    <div className='' >
        <h1>{user.username}</h1>
        <p>{user.role}</p>
        <hr />
    </div>
    
  )
}

export default CardUsuario
