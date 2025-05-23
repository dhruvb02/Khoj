import React from "react";
import "./Cards.css";
import img from "../Cards/Appliances.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import appContext from "../../context/AppContext";
import { useContext } from "react";
const Cards = (props) => {
  const context = useContext(appContext);
  const { getData, data , getbuyers, setprofileListId } = context;
  const navigate = useNavigate();


  // const details=()=>{
  //   navigate("/details")

  // }
  // const handleChange = async() => {
  //   await getData();
  //   setTimeout(() => {
  //     console.log(data);
  //   }, 3000);
  // }
  
  const getcustomers = async () => {
    // let response = await getbuyers(props.id);
    
    // const json = await response.json();    


    // console.log(response);
    // await setpotentialCustomers(response);
    // console.log("err" + err);
    setprofileListId(props.id);
    navigate("/customer");
  }


  return (
    <div className="c-body">
      <div className="image">
        <img src={props.imageURL} alt="" /> 
      </div>
      <div className="c-about">
        <p id="category">{props.category}</p>
        <p id="c-price">₹{props.price}</p>
      </div>
      <div className="c-title">{props.title}</div>
      {props.bool && 
            <button onClick={getcustomers}>View potential customers</button>
          }
      {!props.bool && (
        
          <Link to={`/details`} state={props.id}>
            <button>View more details</button>
          </Link>
      
      )}
    </div>
  );
};

export default Cards;
