import { useEffect, useContext } from "react";
import CartContext from "../CartContext";

function Success() {
    const { addPurchasesCb } = useContext(CartContext);
    // Jess Note: Upon successfully loading success page, 
    // addPurchasesCb is called upon to insert purchases and purchased_items into database

    useEffect(() => {
        addPurchasesCb();
    }, [])

    return(
        <h1>Thank you for your purchase!</h1>
    )
}

export default Success;