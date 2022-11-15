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
                {/* {purchasedItemsByUser.map((p) => (
                     <tr key={p.id}>
                        <th scope="row">{p.id}</th>
                        <td>{p.combo[p.id].date}</td>
                        <td>{p.combo[p.id].shopName}</td>
                        <td>{p.combo[p.id].productName}</td>
                        <td>{p.combo[p.id].price}</td>
                        <td>{p.quantity}</td>
                        <td>{p.combo[p.id].price * purchasedItemsByUser.quantity} </td>
                        <td>{p.combo[p.id].points}</td>
                 </tr>
                ))} */}
                {purchasedItemsByUser && 
                    <tr key={purchasedItemsByUser.id}>
                        <th scope="row">1</th>
                        <td>{purchasedItemsByUser.combo[0].date}</td>
                        <td>{purchasedItemsByUser.combo[0].shopName}</td>
                        <td>{purchasedItemsByUser.combo[0].productName}</td>
                        <td>{purchasedItemsByUser.combo[0].price}</td>
                        <td>{purchasedItemsByUser.quantity}</td>
                        <td>{(purchasedItemsByUser.combo[0].price * purchasedItemsByUser.quantity).toFixed(2)} </td>
                        <td>{purchasedItemsByUser.combo[0].points}</td>
                 </tr>
                 }
                    
                {/* <tr>
                <th scope="row">2</th>
                        <td>{purchasedItemsByUser.combo[1].date}</td>
                        <td>{purchasedItemsByUser.combo[1].shopName}</td>
                        <td>{purchasedItemsByUser.combo[1].productName}</td>
                        <td>{purchasedItemsByUser.combo[1].price}</td>
                        <td>{purchasedItemsByUser.quantity}</td>
                        <td>{(purchasedItemsByUser.combo[1].price * purchasedItemsByUser.quantity).toFixed(2)} </td>
                        <td>{purchasedItemsByUser.combo[1].points}</td>
                </tr>

                <tr>
                <th scope="row">3</th>
                        <td>{purchasedItemsByUser.combo[2].date}</td>
                        <td>{purchasedItemsByUser.combo[2].shopName}</td>
                        <td>{purchasedItemsByUser.combo[2].productName}</td>
                        <td>{purchasedItemsByUser.combo[2].price}</td>
                        <td>{purchasedItemsByUser.quantity}</td>
                        <td>{(purchasedItemsByUser.combo[2].price * purchasedItemsByUser.quantity).toFixed(2)} </td>
                        <td>{purchasedItemsByUser.combo[2].points}</td>
                </tr> */}
            </tbody>
        </table>
    </div>
  );
}
export default BuyerPurchaseView;
