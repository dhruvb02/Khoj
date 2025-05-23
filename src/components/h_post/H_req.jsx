import React from "react";
import { useNavigate } from "react-router-dom";

const H_req = () => {
  const navigate=useNavigate();
  const nav=()=>{
    navigate('/postreq')
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "50px",
      }}
    >
      <div className="h-cont">
        <p style={{ margin: "10px" }}>
          Looking to find the items you want - electronics, appliances, books,
          and more? <br /> Request what you need and let fellow students help fulfill
          your wishes!
        </p>
        <button
          className="h-btn"
          id="nav-post"
          style={{ width: "fit-content", height: "28px" ,marginLeft:'20px'}}
          onClick={nav}
        >
          Post a request
        </button>
      </div>
    </div>
  );
};

export default H_req;
