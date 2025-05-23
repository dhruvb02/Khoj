import React from "react";
import appContext from "./AppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppState = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:3001";

  const InitialRequests = [];
  const InitialListings = [];
  const InitialRent = [];
  const InitialOffers = [];
  const InitialUsers = [];
  const InitialProps = [];

  const [requests, setrequests] = useState(InitialRequests);
  const [listing, setlisting] = useState(InitialListings);
  const [rent, setrent] = useState(InitialRent);
  const [offers, setoffers] = useState(InitialOffers);
  const [users, setusers] = useState(InitialUsers);
  const [data, setdata] = useState([]);
  const [potentialCustomers, setpotentialCustomers] = useState([]);
  const[profileListId,setprofileListId]=useState([]);
  
  const [chatProductId, setchatProductId] = useState("default");
  const [chatConvId, setchatConvId] = useState("default");

  const [myOffers, setmyOffers] = useState([]);


  const [offerProps, setofferProps] = useState(InitialProps);

  // Category
  const [category, setcategory] = useState("");
  // navbar
  const [check_1, setcheck_1] = useState(true);
  const [check_2, setcheck_2] = useState(false);
  const [check_3, setcheck_3] = useState(false);
  const [option, setoption] = useState("sale");
  const [searchData, setsearchData] = useState([]);
  const [MyId, setMyId] = useState("");


  const active_nav_1 = (e) => {
      setcheck_1(true);
      setcheck_2(false);
      setcheck_3(false);

    console.log(check_1);
    console.log(check_2);
    console.log(check_3);
    navigate("/");
  };
  const active_nav_2 = (e) => {
   
      setcheck_2(true);
      setcheck_1(false);
      setcheck_3(false);
     
   
    // console.log(check_1);
    // console.log(check_2);
    // console.log(check_3);
    navigate("/rent");
  };
  const active_nav_3 = (e) => {
  
      setcheck_3(true);
      setcheck_2(false);
      setcheck_1(false);
   
    // console.log(check_1);
    // console.log(check_2);
    // console.log(check_3);
    navigate("/request");
  };

  const deactive_nav = () => {
    setcheck_1(false);
    setcheck_2(false);
    setcheck_3(false);
  };

  const startChat = async (productId) => {
    // API call to start a chat
    const response = await fetch(`${host}/api/chat/startchat/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    return json; 
    // TODO: code to send mail to seller
  };

  const getbuyers = async (productId) => {
    // API call
    const response = await fetch(`${host}/api/chat/getbuyers/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();    
    setpotentialCustomers(json);

    return json;      
  };

  // add a new request
  const addRequest = async (
    title,
    description,
    offeringAmount,
    isRental,
    category
  ) => {
    // API call
    const response = await fetch(`${host}/api/request/makerequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({
        title,
        description,
        offeringAmount,
        isRental,
        category,
      }),
    });

    console.log(response);

    // console.log("adding a new card");
    const newReq = {
      _id: "63a4c599dd6cd2769bd0b956",
      title: title,
      description: description,
      requester: "6488a9ee521f4d0860b028ac",
      valid: true,
      offeringAmount: offeringAmount,
      date: "2023-06-13T18:04:01.211Z",
      category: category,
      isRental: isRental,
      __v: 0,
    };
    setrequests(requests.concat(newReq));
  };

  // function to get all requests from the database
  const getAllRequests = async () => {
    // API CAll
    const response = await fetch(`${host}/api/request/getrequest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    setrequests(json);
  };

  // function to mark a request as fulfilled
  const markRequest = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/request/markrequest${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    console.log(response);
  };

  // function to get all Sell listing from the database
  const getAllList = async () => {
    // API CAll
    const response = await fetch(`${host}/api/listing/getlistings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setlisting(json);
  };
  // function to get all Sell listing from the database
  const getAllRent = async () => {
    // API CAll
    const response = await fetch(`${host}/api/listing/getrent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setrent(json);
  };

  const makeoffer = async (
    productId,
    offerTitle,
    offerAmount,
    offerDescription,
    offerCondition,
    offerLocation
  ) => {
    // API call
    console.log(productId);
    const response = await fetch(`${host}/api/request/makeoffer/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({
        productId,
        offerTitle,
        offerAmount,
        offerDescription,
        offerCondition,
        offerLocation,
      }),
    });

    console.log(response);

    // console.log("adding a new card");
  };

  const getalloffers = async (productId) => {
    // API call
    const response = await fetch(
      `${host}/api/request/getalloffers/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setoffers(json);
  };

  const acceptoffer = async (offerId) => {
    const response = await fetch(`${host}/api/request/acceptoffer/${offerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json);
  };

  const rejectoffer = async (offerId) => {
    const response = await fetch(`${host}/api/request/rejectoffer/${offerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json);
  };

  const searchCon = async (search) => {
    if (check_1) {
      setoption("sale");
    }
    else if (check_2) {
      setoption("rent");
    }
    else if (check_3) {
      setoption("req");
    }

    const data = await fetch(`${host}/api/nav/${option}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });
    const ans = await data.json();
    setsearchData({ ans });
    console.log(ans);
    // navigate('/searchResults');
  };

  const getAllUsers = async () => {
    // API CAll
    const response = await fetch(`${host}/api/auth/getalluser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setusers(json);
    
  };
  const getData = async () => {
    const res = await fetch("http://localhost:3001/api/interest/getinterest", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
   const ans=await res.json();
    setdata(ans);
  }; 

  const getMyId = async () => {
    // API CALL
    const res = await fetch("http://localhost:3001/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      }
    }
    );

    const data = await res.json();
    setMyId(data._id);
  };

  const getMyOffers = async () => {
    // API CALL
    const res = await fetch("http://localhost:3001/api/request/getmyoffers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      }
    });

    const data = await res.json();
    setmyOffers(data);

    console.log(data);
  }

  const marklisting = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/listing/marklisting/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    console.log(response);
  }


  return (
    <appContext.Provider
      value={{
        requests,
        listing,
        startChat,
        getbuyers,
        potentialCustomers,
        setpotentialCustomers,

        addRequest,
        getAllRequests,
        markRequest,
        getAllList,
        requests,
        setrequests,
        rent,
        getAllRent,
        offers,
        makeoffer,
        getalloffers,
        acceptoffer,
        rejectoffer,
        check_1,
        check_2,
        check_3,
        active_nav_1,
        active_nav_2,
        active_nav_3,
        category,
        setcategory,
        searchCon,
        searchData,
        deactive_nav,
        users,
        getAllUsers,
        data,
        getData,
        setofferProps,
        offerProps,
        profileListId,
        setprofileListId,

        MyId,
        getMyId,

        chatProductId,
        setchatProductId,
        chatConvId,
        setchatConvId,

        getMyOffers,
        myOffers,

        marklisting
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export default AppState;
