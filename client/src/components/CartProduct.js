import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import CartContext from "../CartContext";

function CartProduct(props) {

    const { deleteFromCartCb } = useContext(CartContext);

return (
    <>
        <h3>{props.name}</h3>
        <p>{props.quantity}</p>
        <p>${ (props.quantity * props.price).toFixed(2) }</p>
        <Button size="sm" onClick={() => deleteFromCartCb(props.id)}>Remove</Button>
    </>
)

}

export default CartProduct;