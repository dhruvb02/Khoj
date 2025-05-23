import React,{useContext, useState} from 'react'
import './searchBar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import appContext from '../context/AppContext';
import {Link, useNavigate} from 'react-router-dom';


const SearchBar = () => {
  const context=useContext(appContext);
  const {searchCon}=context;
  const [search, setsearch] = useState("");
  const navigate=useNavigate();
  const handlechange=(e)=>{
    setsearch(e.target.value);
    console.log(search);
  }
  // const Onsearch=async(e)=>{
  //   e.preventDefault();
  //   searchCon(search);
  // }
  return (
    <>
   
    </>
  )
}

export default SearchBar