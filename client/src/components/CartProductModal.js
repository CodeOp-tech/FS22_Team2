// NOTE: CartProductModal is a child/lives within the NavbarShop component

import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import CartContext from "../CartContext";

function CartProductModal(props) { // props received from parent NavbarShop

    // NOTE: Only deleteFromCartCb needed in this context
    const { deleteFromCartCb } = useContext(CartContext);

return (
    <>
        <h3>{props.name}</h3>
        <p>{props.quantity}</p>
        <p>${ (props.quantity * props.price).toFixed(2) }</p>
        <Button size="sm" onClick={() => deleteFromCartCb(props.id)}>Remove</Button>
        <hr></hr> {/* hr = line break */}
    </>
)

}

export default CartProductModal;