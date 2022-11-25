import React from "react";
import "./PopUpList.css";

function PopUpList(props) {
  const product = props.product; // received from parent PopUpView

  return (
        <div className="container popuplist">
          <div className="row">
            <div className="col-sm-4">
              <img className="popup-img" src={product.url} style={{height:'20rem', width:'18rem', borderRadius:'10px', marginRight: '100px'}}/>
            </div>

            <div className="col-sm-8">
              <ul className="popup-list" style={{marginRight: '100px'}}>
                <li>
                  <h1 style={{fontSize:'60px', padding:'10px'}}>{product.product_name}</h1> from{" "}
                  <i>{product.shop_name}</i>
                </li>
                <li style={{fontWeight:'bolder', paddingBottom:'30px', fontSize:'25px'}}>{product.product_description}</li>
                <img style={{width:'70px'}} src={product.recycled===1?"https://img.icons8.com/bubbles/100/null/recycle-sign.png":" "}/>  
                <img style={{width:'70px'}} src={product.no_fridge===1?"https://img.icons8.com/bubbles/100/null/greenhouse-effect.png":""}/>
                <img style={{width:'70px'}} src={product.fair_trade===1?"https://img.icons8.com/bubbles/100/000000/certificate.png":""}/>
                <img style={{width:'70px'}} src={product.local===1?"https://img.icons8.com/bubbles/100/null/shop-local--v1.png":""}/>
                <img style={{width:'70px'}} src={product.organic===1?"https://img.icons8.com/bubbles/100/000000/sprout.png":""}/>
                <li className='pointStyle' style={{fontSize:'40px'}}>
                  Total points:{" "}
                  {product.recycled +
                    product.no_fridge +
                    product.fair_trade +
                    product.local +
                    product.organic}
                </li>
              </ul>
            </div>
            </div>
          </div>
  );
}

export default PopUpList;
