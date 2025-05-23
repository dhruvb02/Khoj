import React, { useEffect, useState } from "react";
import appContext from "../context/AppContext";
import { useContext } from "react";
import Cards from "../components/Cards/Cards";
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Footer from "../components/Footer/Footer";

const Search = () => {
  const text = useLocation().state;

  const context = useContext(appContext);
  const { searchData, searchCon } = context;

  useLayoutEffect(() => {
    const data = async () => {
      await searchCon(text);
    };
    data();
  }, []);

  return (
    <div style={{height:'500px',display:'flex',justifyContent:'center',flexDirection:'column'}}>
      {/* <h1 style={{width:'fit-content',marginLeft:'50px',color:'#EC5539'}}> Results for : {searchData.ans && searchData.ans[0].title}</h1> */}

      <div className="pl-h d-flex justify-content-around">
        {searchData.ans && searchData.ans.map((res) => {
          return (
            <div className="c-data">
              <Cards
                id={res._id}
                key={res._id}
                imageURL={res.imageURL}
                category={res.category}
                title={res.title}
                price={res.price}
              />
            </div>
          );
        })}
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Search;
