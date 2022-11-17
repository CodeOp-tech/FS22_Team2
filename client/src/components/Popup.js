import React from "react";
import "./Popup.css";
import PopupList from "./PopupList"

function Popup(props) {
    const product = props.product; // received from parent ProductCard

    function removePopup() {
        props.setTriggerCb();
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={removePopup}>X</button>
                <PopupList product={product}/> {/* Pass child PopupList product as a prop*/}
            </div>
        </div>
    ) : "";
}

export default Popup;