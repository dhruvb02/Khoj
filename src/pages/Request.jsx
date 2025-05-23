import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer/Footer'
import RequestCards from '../components/Cards/RequestCards'
import Reqarea from '../components/ReqCard/Reqarea'
import H_req from '../components/h_post/H_req'
import appContext from '../context/AppContext'
import { useContext } from 'react'

const Request = () => {
  const context = useContext(appContext);
  const{active_nav_3}=context;
  useEffect(() => {
    active_nav_3();
  },[]);
  return (
    <div style={{backgroundColor:'#f6f3f0'}}>
        <SearchBar/>
       <Reqarea/>
       <H_req/>
        {/* <Footer/> */}
    </div>
  )
}

export default Request;