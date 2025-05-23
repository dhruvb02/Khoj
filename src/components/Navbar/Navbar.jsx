import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import appContext from "../../context/AppContext";
import { useContext } from "react";
import userImg from "../../images/Vector (3).png";

const Navbar = () => {
  const context = useContext(appContext);
  const {
    check_1,
    check_2,
    check_3,
    active_nav_1,
    active_nav_2,
    active_nav_3,
  } = context;

  const navigate = useNavigate();

  const POST = () => {
    navigate("/post");
  };
  const LOG = () => {
    navigate("/login");
  };
  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const home = () => {
    active_nav_1();
  };

  return (
    <div className="navb">
      <div className="nav-first d-flex justify-content-between  align-items-center">
        <div className="nav-title">
          <p onClick={home}>Khoj</p>
        </div>
        <div className="nav-btn d-flex">
          {!localStorage.getItem("token") ? (
            <button id="signIn" onClick={LOG}>
              Sign In
            </button>
          ) : (
            <div className="d-flex">
              <Link to={"/profile"}>
                <img src={userImg} alt="" style={{ margin: "0 10px" }} />
              </Link>
              <button id="signIn" onClick={handleLogout}>
                Sign Out
              </button>
              <button id="nav-post" onClick={POST}>
                Post an ad
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="nav-second">
        <ul class="nav nav-tabs">
          <li
            class="nav-item"
            style={
              check_1
                ? {
                    border: "1px solid #ec5539",
                    borderRadius: "6px 6px 0px 0px",
                  }
                : {}
            }
          >
            <a
              class="nav-link"
              aria-current="page"
              onClick={active_nav_1}
              style={
                check_1 ? { color: "#ec5539", backgroundColor: "#f6f3f0" } : {}
              }
            >
              Sale
            </a>
          </li>
          <li
            class="nav-item"
            style={
              check_2
                ? {
                    border: "1px solid #ec5539",
                    borderRadius: "6px 6px 0px 0px",
                  }
                : {}
            }
          >
            <a
              class="nav-link "
              onClick={active_nav_2}
              style={
                check_2 ? { color: "#ec5539", backgroundColor: "#f6f3f0" } : {}
              }
            >
              Rent
            </a>
          </li>
          <li
            class="nav-item"
            style={
              check_3
                ? {
                    border: "1px solid #ec5539",
                    borderRadius: "6px 6px 0px 0px",
                  }
                : {}
            }
          >
            <a
              class="nav-link"
              onClick={active_nav_3}
              style={
                check_3 ? { color: "#ec5539", backgroundColor: "#f6f3f0" } : {}
              }
            >
              Request
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
