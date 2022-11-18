import React, { useState } from 'react';
import UserRegForm from "../components/UserRegForm.js";

function RegistrationView(props) {
    return (
        <div className="RegistrationView">
            <UserRegForm 
                registerCb={props.registerCb}
                regError={props.regError}
            />
        </div>
    )
}

export default RegistrationView;