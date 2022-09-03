import React from 'react'

export default function Die(props) {
  
  
  
  return (
    <div 
    className= {`Die ${props.value.isHeld? 'selected':''}` }
    onClick={()=>props.toggleHold(props.indx)}
    >{props.value.number}</div>
  )
}
