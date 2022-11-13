import React from "react";
import { Navigate } from "react-router-dom";
import Local from "../helpers/Local.js";

function PrivateRoute(props) {
    // Redirect to login page if user is anonymous
    let userId = Local.getUserId();
    if (!userId) {
        return <Navigate to="/login" />
    }

    // Else if user is verified, render child components
    return (
        <>
            { props.children }
        </>
    );
}

export default PrivateRoute;