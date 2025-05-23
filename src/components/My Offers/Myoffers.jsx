import OfferCard from "../Cards/OfferCard";
import React, { useLayoutEffect , useContext} from "react";
import appContext from "../../context/AppContext";

function Myoffers() {

  const context = useContext(appContext);
  const { getMyOffers , myOffers} = context;



  useLayoutEffect(() => {
    getMyOffers();
  }, []);


  return (
    
    <div className="reqall">
      {myOffers.map((res) => {
          return (
            <div className="c-data">
              <OfferCard
                id={res._id}
                title={res.offerTitle}
                description={res.offerDescription}
                amount={res.offerAmount}
                condition={res.offerCondition}
                confirm={true}
              />
            </div>
          );
      })}
    </div>
  )
}

export default Myoffers