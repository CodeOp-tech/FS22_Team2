import React, { useContext } from "react";
import CartContext from "../CartContext";

function BuyerPurchaseView() {
    const { purchasedItemsByUser } = useContext(CartContext);

  return (
    <div>
      <h1>Customer: Purchase History</h1>

        <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Shop</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Sum</th>
                <th scope="col">Reward Points</th>
                </tr>
            </thead>
            <tbody>
                {purchasedItemsByUser && 
                purchasedItemsByUser.map((p, idx) => (
                     <tr key={p.id}>
                        <th scope="row">{idx + 1}</th>
                        <td>{(p.purchase_date)}</td>
                        <td>{p.shop_name}</td>
                        <td>{p.product_name}</td>
                        <td>{p.price}</td>
                        <td>{p.purchase_quantity}</td>
                        <td>{p.price * p.purchase_quantity} </td>
                        <td>{p.purchase_points}</td>
                 </tr>
                ))}

            </tbody>
        </table>
    </div>
  );
}
export default BuyerPurchaseView;
