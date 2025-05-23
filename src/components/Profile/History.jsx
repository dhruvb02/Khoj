import React ,{useLayoutEffect,useState}from 'react'
import { useLocation } from 'react-router-dom'
import Cards from '../Cards/Cards'
import appContext from '../../context/AppContext';
import { useContext } from 'react';

function History() {
    const context=useContext(appContext);
    const {deactive_nav}=context;

    const userInfo=useLocation().state;

    const [arr,setArr]=useState([]);

    const data=async()=>{
        const res=await fetch('http://localhost:3001/api/listing/getListUser',{
            method:'POST',
            headers:{ 'Content-Type': 'application/json'},
            body:JSON.stringify({userInfo})
        })
        const ans=await res.json();
        setArr(ans);

    }
    useLayoutEffect(() => {
        data();
        deactive_nav();

    }, [])
  return (
    <div>
        <div className="pl-h d-flex justify-content-around">
        {arr.map((res) => {
            if (res.availability === false) {
          return (
                <div className="c-data">
                <Cards
                id={res._id}
                key={res._id}
                imageURL={res.imageURL}
                category={res.category}
                title={res.title}
                price={res.price}
                bool={false}
                />
                </div>
            
          );
          }
        })}
      </div>
    </div>
  )
}

export default History