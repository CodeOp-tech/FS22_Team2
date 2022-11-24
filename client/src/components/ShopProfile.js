import React from "react";
// import "./PopUpList.css";

function ShopProfile(props) {
  const shopProfile = props.shopProfile; // received from parent UserProfileView

    return (
        <div className="container ShopProfile">
            HELLO
            <div className="row">
                <div className="col-sm-4">
                    {/* <img className="shop-img" src={product.url} /> */}
                </div>

                <div className="col-sm-8">
                  <ul className="shopProfile-list">
                        <li><h2>{shopProfile.shop_name}</h2></li>
                    </ul>
                </div>
            </div>
        </div>
  );
}

export default ShopProfile;