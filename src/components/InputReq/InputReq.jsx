import React from 'react'
import { useState, useContext } from "react";
import './InputReq.css'
import appContext from '../../context/AppContext';
import { useNavigate } from "react-router-dom";


function InputReq() {

  let navigate = useNavigate();
  const context = useContext(appContext);

  const { addRequest } = context;


  const handleChange = (e) => {
    setreqVal({ ...reqVal, [e.target.name]: e.target.value });
    console.log(reqVal);
  };

  const submitReq = async (e) => {
    e.preventDefault();
    console.log("data submitted");

    let  finalRental = true;
    if(reqVal.isRental == "Sale")
    {
      finalRental = false;
    }

    await addRequest(
      reqVal.inputTitle,
      reqVal.description,
      0,
      finalRental,
      reqVal.scategory
    );

    navigate('/request');
  }


  const [reqVal, setreqVal] = useState({
    inputTitle: "",
    description: "",
    scategory: "",
    isRental: "",
  });

  return (
    <>
      <div className="input-form ">
        <div className="post-heading">
          <p>Post a request for your need</p>
        </div>

        {/* form for input */}
        <div className="d-flex aligns-items-center">


          <form className="row g-3 ">
            {/* first row of input form */}
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  placeholder="Title"
                  name="inputTitle"
                  onChange={handleChange}
                />
                <label htmlFor="inputTitle">Title</label>
              </div>
            </div>





            <div className="col-md-3">
              <div className="form-floating">
                <select className="form-select" id="scategory" name="scategory" onChange={handleChange} >
                  <option selected value="Other">
                    Other
                  </option>
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Automobiles">Automobiles</option>
                  <option value="Appliances">Appliances</option>
                  <option value="SportsEquipment" >Sports Eqipment</option>
                  <option value="Games">Games</option>
                  <option value="Furniture">Furniture</option>
                </select>
                <label htmlFor="scategory">Select Category</label>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-floating">
                <select className="form-select" id="isRental" name="isRental" onChange={handleChange}>
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </select>
                <label htmlFor="isRental">Sale/Rent</label>
              </div>
            </div>


            <div className="mb-3 col-md-11">
              <textarea
                className="form-control"
                id="description"
                rows="5"
                placeholder="Wrtie a description"
                name="description"
                onChange={handleChange}
              ></textarea>
            </div>



            <div className="col-12">
              <button onClick={submitReq} id="SubmitAd" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default InputReq