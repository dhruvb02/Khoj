import React from 'react'
import './Hpost.css'
import { useNavigate } from 'react-router-dom'
const H_Post = () => {
  const navigate=useNavigate();
  const nav=()=>{
    navigate('/post')
  }
  return (
    <div className='Hpost' style={{display:'flex',justifyContent:'center',marginBottom:'50px'}}>
        <div className="h-cont">
            <p style={{margin:'10px'}}>Want to sell goods - electronics, appliances, books etc ?</p>
            <button  className='h-btn' id="nav-post" style={{width:'100px',height:'28px'}} onClick={nav}>Post an ad</button>
        </div>
    </div>
  )
}

export default H_Post