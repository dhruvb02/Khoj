import React, { useEffect, useContext, useState } from "react";
import "./Reqarea.css";
import appContext from "../../context/AppContext";
import RequestCards from "../Cards/RequestCards";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Reqarea = () => {
  const context = useContext(appContext);
  const { getAllRequests, requests } = context;

  useEffect(() => {
    getAllRequests();
  }, []);

  const [search, setsearch] = useState("");
  const [searchCat, setsearchCat] = useState("");

  const changeCategory = (e) => {
    setsearchCat(e.target.value);
  };

  const handlechange = (e) => {
    setsearch(e.target.value);
    console.log(search);
  };

  return (
    <>
      <div className="searchBar">
        <FontAwesomeIcon icon={faSearch} id="s-icon" />
        <input
          type="text"
          name="search"
          value={search}
          id=""
          placeholder="Search an Item"
          onChange={handlechange}
        />
        <div className="col-md-1" id="cat-selector">
          <select
            class="form-select"
            id="change-drop"
            aria-label="Default select example"
            onChange={changeCategory}
          >
            <option value="Categories" selected>
              Categories
            </option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Automobiles">Automobiles</option>
            <option value="Appliances">Appliances</option>
            <option value="SportsEquipment">Sports Eqipment</option>
            <option value="Games">Games</option>
            <option value="Furniture">Furniture</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="req-area">
        <div className="req-ah cat-h">All Requests</div>
        <div className="reqall">
          {requests.map((res) => {
            {
              if (
                res.title.toUpperCase().indexOf(search.toUpperCase()) > -1 &&
                (searchCat == "" ||
                  searchCat == "Categories" ||
                  res.category == searchCat)
              ) {
                if (res.valid === true) {
                  return (
                    <div className="c-data">
                      <RequestCards
                        id={res._id}
                        key={res._id}
                        description={res.description}
                        category={res.category}
                        title={res.title}
                      />
                    </div>
                  );
                }
              }
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Reqarea;
