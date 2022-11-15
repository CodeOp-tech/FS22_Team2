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
                <th scope="col">Date</th>
                <th scope="col">Shop</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Sum</th>
                <th scope="col">Reward Points</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{purchasedItemsByUser.combo[0].date}</td>
                    <td>{purchasedItemsByUser.combo[0].shopName}</td>
                    <td>{purchasedItemsByUser.combo[0].productName}</td>
                    <td>{purchasedItemsByUser.combo[0].price}</td>
                    <td>{purchasedItemsByUser.quantity}</td>
                    <td>{purchasedItemsByUser.combo[0].price * purchasedItemsByUser.quantity} </td>
                    <td>{purchasedItemsByUser.combo[0].points}</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}
export default BuyerPurchaseView;
