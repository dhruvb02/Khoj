import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import appContext from "../../context/AppContext";
import { useEffect, useContext } from "react";
import "./SaleDetails.css";

const Sale_Details = () => {
  const data = useLocation().state;
  const context = useContext(appContext);

  const navigate = useNavigate();


  const { getAllList, getAllRent, listing, rent, check_1, check_2, startChat, MyId, getMyId, setchatConvId, setchatProductId } = context;
  const [reqData, setreqData] = useState([]);
  const retrieveData = () => {
    listing.map((item) => {
      if (item._id == data) {
        setreqData(item);
      }
    });

    rent.map((item) => {
      if (item._id == data) {
        setreqData(item);
      }
    });
  };
  const [subcheck, setsubcheck] = useState(false);
  const sendUser = async () => {
    const ans = await startChat(reqData._id);
    console.log(ans);
    setsubcheck(true);
  };

  const GoChat = () => {
    // console.log("first");
    setchatConvId(MyId);
    setchatProductId(reqData._id);

    navigate("/chat");
  }

  useLayoutEffect(() => {
    getAllList();
    getAllRent();
    retrieveData();
    getMyId();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f6f3f0",
        height: "81vh",
        flexDirection: "column",
      }}
      className="d-flex justify-content-center"
    >
      {reqData && (
        <div className="d-flex justify-content-center">
          <div
            className="details-img"
            style={{ height: "300px", width: "300px", marginRight: "100px" }}
          >
            <img
              src={reqData.imageURL}
              alt=""
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="details-content" style={{ width: "500px" }}>
            <div
              className="details-title d-flex justify-content-between"
              style={{ paddingTop: "30px", alignItems: "center" }}
            >
              <p style={{ fontSize: "30px", fontWeight: "bolder" }}>
                {reqData.title}
              </p>
              <p
                style={{
                  color: "#EC5539",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                ₹{reqData.price} {reqData.isRental == true ? "/day" : ""}
              </p>
            </div>
            {reqData.condition && (
              <div>
                <p
                  style={{
                    color: "#8F8F8F",
                    fontSize: "14px",
                    fontWeight: "300",
                    marginBottom: "30px",
                  }}
                >
                  <span style={{ color: "black", fontWeight: "500" }}>
                    Condition :
                  </span>
                  {reqData.condition}
                </p>
              </div>
            )}
            <div style={{ marginBottom: "7px" }}>
              <p style={{ color: "#8F8F8F", fontSize: "18px" }}>
                {reqData.description}
              </p>
            </div>
            {reqData.otherDetails && (
              <div>
                <p style={{ fontSize: "20px", fontWeight: "500" }}>
                  Other Details
                </p>
                <ul
                  style={{
                    color: "#8F8F8F",
                    fontSize: "17px",
                    fontWeight: "300",
                    marginBottom: "30px",
                    listStyle: "revert",
                  }}
                >
                  {reqData.otherDetails[0] && (
                    <li style={{ listStyle: "revert" }}>
                      {reqData.otherDetails[0]}
                    </li>
                  )}
                  {reqData.otherDetails[1] && (
                    <li style={{ listStyle: "revert" }}>
                      {reqData.otherDetails[1]}
                    </li>
                  )}
                  {reqData.otherDetails[2] && (
                    <li style={{ listStyle: "revert" }}>
                      {reqData.otherDetails[2]}
                    </li>
                  )}
                </ul>
              </div>
            )}
            <div style={{display:'flex'}}>
              {!subcheck && (
                <button
                id="nav-post"
                style={{ width: "190px" }}
                onClick={sendUser}
                disabled={reqData.availability === false || reqData.seller === MyId}
              >
                Connect with the seller
              </button>
              )}
              {subcheck && (
                <div style={{border:'1px solid #EC5539', width:'fit-content'}}>
                  <p style={{ color: "#EC5539" ,padding:'5px'}}>Request sent successfully</p>
                </div>
              )}

                <button
                id="nav-post"
                style={{ width: "190px", marginLeft:'10px' }}
                onClick={GoChat}
                disabled={reqData.availability === false || reqData.seller === MyId}
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sale_Details;
