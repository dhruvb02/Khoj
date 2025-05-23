import React, { useState, useEffect, useLayoutEffect } from 'react'
import './Profile.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import appContext from '../../context/AppContext';
import { useContext } from 'react';



function Profile() {
    const context=useContext(appContext);
    const {deactive_nav}=context;
    useEffect(() => {
        deactive_nav();
    }, []);


    const [userdata, setuserdata] = useState([]);

    const getUserdata = async () => {
        // API call
        const response = await fetch('http://localhost:3001/api/auth/getuser',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            }
        );

        const data = await response.json();
        data.date = data.date.substring(0, 10);
        setuserdata(data);
    }

    useLayoutEffect(() => {
        getUserdata();
    }, []);

    return (
        <>
            <div className="container user-d">
                <div className="row justify-content-md-left">
                    <div className="col col-lg-auto">
                        <FontAwesomeIcon icon={faUser} id="user-icon" />
                    </div>
                    <div className="col-md-2">
                        {/* <p>{userdata.name}</p> */}
                        <div className="container">
                            <div className="row">
                                <div className="col align-self-start">
                                    <p> <b>{userdata.name} </b> </p>
                                </div>
                                <div className="col align-self-end">
                                    <p>{userdata.college}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-around" style={{width:'100vw'}}>
                <div class="col-4">
                    <div className="column-heading">
                        <p>Personal Details</p>
                    </div >
                    <div className="column-body">
                        <div className="details">
                            {userdata.name}
                        </div>
                        <div className="details">
                            {userdata.email}
                        </div>
                        <div className="details">
                            {userdata.college}
                        </div>
                        <div className="details">
                            <p>Account Created : {userdata.date}</p>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div className="column-heading">
                        <p>Active Listing</p>
                    </div>
                    <div className="column-body">
                        <div className="details">
                            <Link to="/listing" state={userdata}>
                                Listings
                            </Link>
                        </div>
                        <div className="details">
                            <Link to="/requests" state={userdata}>
                                Requests
                            </Link>
                        </div>
                        <div className="details">
                            <Link to="/history" state={userdata}>
                                Listing History
                            </Link>
                        </div>
                        <div className="details">
                            <Link to="/myoffers" state={userdata}>
                                My Offers
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile