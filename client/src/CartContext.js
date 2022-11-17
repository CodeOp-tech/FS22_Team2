import React from "react";

// just the pipeline for all things related to the Shopping Cart context (abit over overlap with Product is unavoidable)
const CartContext = React.createContext();

export default CartContext;

// just the pipeline, does not include the storage (which will be in App/Lowest Common Ancestor)