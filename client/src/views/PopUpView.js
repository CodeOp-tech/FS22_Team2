import React from "react";
import "./PopUpView.css";
import PopUpList from "../components/PopUpList";
import ProductReviewView from "./ProductReviewView";
import {  Col, Row } from "react-bootstrap";
import {GiCancel} from "react-icons/gi"


function PopUpView(props) {
  const product = props.product; // received from parent ProductCard

  function removePopup() {
    props.setTriggerCb();
  }

  return props.trigger ? (
    <div className="container popup">
  
      <div className="popup-inner" id='scroll'>
        <button className="close-btn" onClick={removePopup} style={{width:'50px', height:'100px'}}>
        <GiCancel style={{width:'35px', height:'40px', color:'indianred'}}/>
        </button>

        <div className="row">
          <PopUpList className="popup-list" product={product} />{" "}
          {/* Pass child PopupList product as a prop*/}
        </div>

        <div className="proRev" >
          <ProductReviewView 
           
            className="popup-productreview"
            product={product}
          />{" "}
          {/* Pass child ProductRevew product as a prop*/}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopUpView;
