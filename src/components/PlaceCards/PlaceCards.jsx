import React, { useContext, useEffect, useState } from "react";
import "./PlaceCards.css";
import appContext from "../../context/AppContext";
import Cards from "../Cards/Cards";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PlaceCards = () => {
  const context = useContext(appContext);
  const { listing, getAllList } = context;

  useEffect(() => {
    getAllList();
  }, []);

  const [search, setsearch] = useState("");
  const [searchCat, setsearchCat] = useState("");

  const handlechange = (e) => {
    setsearch(e.target.value);
    console.log(search);
  };

  const changeCategory = (e) => {
    setsearchCat(e.target.value);
  };

  return (
    <div>
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

      <div className="pl-title cat-h">Recetly Added</div>
      <div className="pl-h d-flex justify-content-around">
        {listing.map((res) => {
          {
            if ((res.title.toUpperCase().indexOf(search.toUpperCase()) > -1) && (searchCat == "" || searchCat == "Categories" || res.category==searchCat) && (res.availability === true)) {
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
            }
          }

        })}
      </div>
    </div>
  );
};

export default PlaceCards;
