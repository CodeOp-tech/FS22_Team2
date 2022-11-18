import React from "react";
import "./PopUpView.css";
import PopUpList from "../components/PopUpList";
import ProductReview from "../components/ProductReview";

function PopUpView(props) {
  const product = props.product; // received from parent ProductCard

  function removePopup() {
    props.setTriggerCb();
  }

  return props.trigger ? (
    <div className="container popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={removePopup}>
          X
        </button>
        
            <div className="row">
            <PopUpList className="popup-list" product={product} /> {/* Pass child PopupList product as a prop*/}
            </div>

            <div className="row">
            <ProductReview className="popup-productreview" product={product} /> {/* Pass child ProductRevew product as a prop*/}
            </div>
        </div>
    </div>
  ) : (
    ""
  );
}

export default PopUpView;