import React from "react";
import "./Input.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


function Input() {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  // const inputRef = useRef(null);


//   UTHAYA HUA CODE
  // const handleUpload = () => {
  //   inputRef.current?.click();
  // };
  const handleDisplayFileDetails = (e) => {
    // inputRef.current?.files &&
    //   setUploadedFileName(inputRef.current.files[0].name);
    setUploadedFileName(e.target.files[0]);
  };


  let navigate = useNavigate();



  const handleChange = (e) => {
    setformVal({ ...formVal, [e.target.name]: e.target.value });
    console.log(formVal);
  };

  const submitAd = async(event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("image", uploadedFileName);
    formData.append('json',JSON.stringify(formVal));

   

    const response = await fetch('http://localhost:3001/api/listing/addlisting',{
        method:'POST',
        headers:{
          "auth-token": localStorage.getItem("token"),
        },
        body:formData,
      })

    
      navigate('/');
    
  }


  const [formVal, setformVal] = useState({
    inputTitle: "",
    inputPrice: "",
    description: "",
    Option1: "",
    Option2: "",
    Option3: "",
    category: "Other",
    isRental: "Sale",
    condition: "Good",
  });

  return (
    <>
      <div className="input-form ">
        <div className="post-heading">
          <p>Post an ad for your product</p>
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
              <input
                type="number"
                className="form-control"
                id="inputPrice"
                placeholder="Price"
                name="inputPrice"
                onChange={handleChange}
              />
              <label htmlFor="inputPrice">Enter Price(in ₹)</label>
            </div>
          </div>

          <div className="col-md-3"></div>

          <div className="col-md-4">
            <div className="form-floating">
              <select className="form-select" id="condition" name="condition"  onChange={handleChange}>
                <option value="Bad">Bad</option>
                <option value="Fair">Fair</option>
                <option selected value="Good">
                  Good
                </option>
                <option value="Very Good" >Very Good</option>
                <option value="Excellent">Excellent</option>
              </select>
              <label htmlFor="condition">Condition of Product</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <select className="form-select" id="scategory" name="category"  onChange={handleChange} >
                <option selected value="Other">
                  Other
                </option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Automobiles">Automobiles</option>
                <option value="Appliances">Appliances</option>
                <option value="SportsEquipment" >Sports Equipment</option>
                <option value="Games">Games</option>
                <option value="Furniture">Furniture</option>
              </select>
              <label htmlFor="category">Select Category</label>
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-floating">
              <select className="form-select" id="isRental" name="isRental"  onChange={handleChange}>
                <option value="Sale">Sale</option>
                <option value="Rent">Rent</option>
              </select>
              <label htmlFor="isRental">Sale/Rent</label>
            </div>
          </div>

          <div className="mb-3 col-md-9">
            <textarea
              className="form-control"
              id="description"
              rows="5"
              placeholder="Wrtie a description"
              name="description"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-md-5">
            <label htmlFor="Other details" className="form-label">
              Other details(Optional)
            </label>
            <input type="text" className="form-control" placeholder="Option-1"  name="Option1"
              onChange={handleChange}/>
          </div>
          <div className="col-md-5">
            <div className="m-3">
              <label className="mx-3">Upload Image:</label>
              <input
                // ref={inputRef}
                accept="image/*"
                onChange={handleDisplayFileDetails}
                // className="d-none"
                type="file"
              />
              {/* <button
                // onClick={handleUpload}
                className={`btn btn-outline-${
                  uploadedFileName ? "success" : "primary"
                }`}
              >
                {uploadedFileName ? uploadedFileName : "Upload"}
              </button> */}
            </div>
          </div>

          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Option-2"   name="Option2"
              onChange={handleChange}/>
          </div>

          <div className="col-md-5"></div>

          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Option-3"  name="Option3"
              onChange={handleChange}/>
          </div>

          <div className="col-12">
            <button onClick={submitAd} id="SubmitAd" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}

export default Input;
