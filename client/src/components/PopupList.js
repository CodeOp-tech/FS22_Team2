import React from "react";
import "./PopUpList.css";

function PopUpList(props) {
    const product = props.product; // received from parent PopUpView


    return (
        <div className="container popuplist">
            <div className="row">
                <div className="col-sm-4">
                    <img className="popup-img" src={product.url} />
                </div>

                <div className="col-sm-8">
                    <ul className="popup-list">
                        <li><h2>{product.product_name}</h2> from <i>{product.shop_name}</i></li>
                        <li>{product.product_description}</li>
                        <li>Recycled: {product.recycled}</li>
                        <li>Not refrigerated: {product.no_fridge}</li>
                        <li>Fair trade: {product.fair_trade}</li>
                        <li>Local: {product.local}</li>
                        <li>Organic: {product.organic}</li>
                        <li>Total points: {product.recycled + product.no_fridge + product.fair_trade + product.local + product.organic}</li>
                    </ul>
                </div>
            </div>
        </div>
    ) 
}

export default PopUpList;