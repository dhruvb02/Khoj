import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import "./Home.css";
import Footer from "../components/Footer/Footer";
import Sell from "../components/Sell/Sell";
import appContext from "../context/AppContext";
import { useContext,useLayoutEffect } from "react";
const Home = () => {
  const context=useContext(appContext);
  const {active_nav_1}=context;
  useLayoutEffect(()=>{
    active_nav_1();
  },[])

  return (
    <div className="home">
      <SearchBar />
      <Sell/>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
