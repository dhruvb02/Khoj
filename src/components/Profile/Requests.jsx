import React, { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RequestCards from "../Cards/RequestCards";
import appContext from "../../context/AppContext";
import { useContext } from "react";

const Requests = () => {
  const context = useContext(appContext);
  const { deactive_nav } = context;
  const userInfo = useLocation().state;
  const [arr, setArr] = useState([]);
  const data = async () => {
    const res = await fetch("http://localhost:3001/api/request/getReqUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInfo }),
    });
    const ans = await res.json();
    setArr(ans);
  };

  useLayoutEffect(() => {
    data();
    deactive_nav();
  }, []);
  return (
    <div>
      <div className="pl-h d-flex justify-content-around">
        {arr.map((res) => {
          if (res.valid === true) {
            return (
              <div className="c-data">
                <RequestCards
                  id={res._id}
                  key={res._id}
                  description={res.description}
                  category={res.category}
                  title={res.title}
                  bool={true}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Requests;
