import React, { useState, useContext } from "react";
import CartContext from "../CartContext";
import Local from "../helpers/Local.js";

function SellerPurchaseView() {
  const { purchasedItemsByShop } = useContext(CartContext);
  return (
    <div>

      <h1 style={{color:'#278080', fontWeight:'bolder'}}>{Local.getShopName()}'s Sales History</h1>


      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Customer ID</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Sum</th>
          </tr>
        </thead>
        <tbody>
          {purchasedItemsByShop &&
            purchasedItemsByShop.map((p, idx) => (
              <tr key={p.id}>
                <th scope="row">{idx + 1}</th>
                <td>
                  {p.purchase_date.slice(0, 10)} {p.purchase_date.slice(11, 19)}
                </td>
                <td>{p.user_id}</td>
                <td>{p.product_name}</td>
                <td>{p.price.toFixed(2)}</td>
                <td>{p.purchase_quantity}</td>
                <td>{(p.price * p.purchase_quantity).toFixed(2)} </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default SellerPurchaseView;
