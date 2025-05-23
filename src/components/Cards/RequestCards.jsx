import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import "./RequestCards.css";
import { useNavigate } from "react-router-dom";
import appContext from "../../context/AppContext";

const RequestCards = (props) => {
  const context = useContext(appContext);
  const { setofferProps,acceptoffer,rejectoffer, setchatConvId, setchatProductId} = context;

  const warr = props.description.split(" ");
  const wshow = warr.splice(0, 7).join(" ");
  const navigate = useNavigate();
  const handleChange = () => {
    setofferProps(props);
    if (props.bool) {
      navigate("/offers");
    } else {
      navigate("/offerinput", { state: { request: props } });
    }
  };
  const handleAccept = () => {
    acceptoffer(props.id);

    navigate("/request");
  }
  const handleReject = () => {
    rejectoffer(props.id);
  }

  const GoChat = () => {
    setchatConvId(props.OfferedBy);
    setchatProductId(props.id);
    navigate("/chat");
  }

  return (
    <div className="req-body">
      <div className="req-title">
        <p>{props.title}</p>
      </div>
      {!props.confirm && (
        <div>
          <div className="req-cat">
            <p>{props.category}</p>
          </div>
          <div className="req-des">
            <p>{warr.length > 1 ? wshow + "..." : wshow}</p>
          </div>
        </div>
      )}
      {props.confirm && (
        <div>
          <div className="d-flex justify-content-between mt-2">
          <div className="req-cat">
            <p> ₹{props.amount}</p>
          </div>
          <div className="req-des">
            <p><span style={{color:'black'}}>Condition:</span> {props.condition}</p>
          </div>
          </div>
          <div className="req-des">
            <p>{props.description}</p>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <button style={{width:'100px'}} onClick={handleAccept}>Accept Offer</button>
            <button style={{width:'100px'}} onClick={handleReject}>Reject Offer</button>
            </div>
            <button style={{marginTop:'8px',width:'100%'}} onClick={GoChat} >Chat with Seller</button>
          
        </div>
      )}
       {props.bool && <button onClick={handleChange}>View offers</button>}
      {!props.confirm && !props.bool && <button onClick={handleChange}>Make an offer</button>}
    </div>
  );
};

export default RequestCards;
