import React, { useLayoutEffect } from "react";
import appContext from "../../context/AppContext";
import { useContext } from "react";
import RequestCards from "../Cards/RequestCards";

const Offers = () => {
  const context = useContext(appContext);
  const { getalloffers, offerProps, deactive_nav, offers } = context;

  useLayoutEffect(() => {
    getalloffers(offerProps.id);
    deactive_nav();
  }, []);
  return (
    <div className="reqall">
      {offers.map((res) => {
        if (res.offerStatus ==="Pending") {
          return (
            <div className="c-data">
              <RequestCards
                id={res._id}
                title={res.offerTitle}
                description={res.offerDescription}
                amount={res.offerAmount}
                condition={res.offerCondition}
                confirm={true}
                OfferedBy={res.offeredBy}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Offers;
