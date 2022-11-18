import { useEffect, useContext } from "react";
import CartContext from "../CartContext";

function Success() {
    // NOTE FROM JESS: Technically should only be called upon success page, 
    // but currently not working so is being called via handleClick in Navbar
    
    // const {addPurchasesCb } = useContext(CartContext);

    // useEffect(() => {
    //     addPurchasesCb();
    // }, [])

    return(
        <h1>Thank you for your purchase!</h1>
    )
}

export default Success;