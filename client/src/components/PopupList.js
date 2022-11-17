import React from "react";
import "./PopupList.css";

function PopupList(props) {
    const product = props.product; // received from parent Popup


    return (
        <div className="popuplist">
            <img className="popup-img" src={product.url} />
                <ul className="popup-list">
                    <li><h2>{product.product_name}</h2></li>
                    <li>{product.product_description}</li>
                    <li>Recycled: {product.recycled}</li>
                    <li>Not refrigerated: {product.no_fridge}</li>
                    <li>Fair trade: {product.fair_trade}</li>
                    <li>Local: {product.local}</li>
                    <li>Organic: {product.organic}</li>
                </ul>
        </div>
    ) 
}

export default PopupList;