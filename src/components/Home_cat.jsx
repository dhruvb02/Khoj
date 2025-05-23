import React, { useContext } from "react";
import "./Home_cat.css";
import appliances from "../images/Frame 48 (1).png";
import Loud from "../images/Frame 49.png";
import book from "../images/Frame 50.png";
import call from "../images/Frame 51.png";
import tennis from "../images/Frame 52.png";
import appContext from "../context/AppContext";

const Home_cat = () => {
  const context = useContext(appContext);
  const { category, setcategory } = context;
  const appCat = async(e) => {
    const value = e.target.getAttribute("value");
    setcategory(value);

    const req = await fetch("http://localhost:3001/api/nav/cat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({category}),
    });

    const data= await req.json();
  };
  return (
    <div>
      <div className="cat-h">Popular Products</div>
      <div className="cat-icons">
        {/* <img src={appliances} alt="" />; */}
        <div>
          <img src={Loud} alt="" value={"Electronics"} onClick={appCat} />
          <p className="cat-text">Electronics</p>
        </div>
        <div>
          <img src={book} value={"Appliances"} alt="" />
          <p>Appliances</p>
        </div>
        <div>
          <img src={call} value={"Books"} alt="" />
          <p>Text Books</p>
        </div>
        <div>
          <img src={tennis} value={"Sports Equipments"} alt="" />
          <p>
            Sport <br />
            Equipments
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home_cat;
