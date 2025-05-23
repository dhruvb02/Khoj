import { Fragment } from "react";
import "./Overlay.css";
import ChatComp from "../Chat/ChatComp";

export function Overlay({ isOpen, onClose }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="overlay">
          <div className="overlay__background" onClick={onClose} />
          <div className="overlay__container">
            <div className="overlay__controls">
              <button
                className="overlay__close"
                type="button"
                onClick={onClose}
              />
            </div>
            <ChatComp productId={"bike"} convId={"buyerId"} />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Overlay;