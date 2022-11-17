import React from "react";

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn">X</button>
                POP-UP
            </div>
        </div>
    ) : "";
}

export default Popup;