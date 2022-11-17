import React, { useState } from 'react';


function UserRegForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function handleChange(event) {
        let { name, value } = event.target;
        switch (name) {
            case 'usernameInput':
                setUsername(value);
                break;
            case 'passwordInput':
                setPassword(value);
                break;
            case 'emailInput':
                setEmail(value);
                break;
            default:
                break;
        }
    }

    // function handleChangeCheck (e) {
    //     if (e.target.checked) {
    //         setProductData((data) => ({
    //            ...data, [e.target.name]:1
    //        }));
    //     }
    // }

    function handleSubmit(event) {
        event.preventDefault();
        props.registerCb(username, password, email);
    }

    return (
        <div className="UserRegForm row">
            <div className="col-4 offset-4">
                <h2>Sign up!</h2>
                
                {
                    props.regError && (
                        <div className="alert alert-danger">{props.regError}</div>
                    )
                }

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username
                            <input
                                type="text"
                                name="usernameInput"
                                required
                                className="form-control"
                                value={username}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Password
                            <input
                                type="password"
                                name="passwordInput"
                                required
                                className="form-control"
                                value={password}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Email
                            <input
                                type="text"
                                name="emailInput"
                                required
                                className="form-control"
                                value={email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    {/* <div className="form-group">
                        <label>Would you like to open a shop?
                            <input
                                type="checkbox"
                                name="has-shop"
                                required
                                className="form-control"
                                value={has_shop}
                                onChange={handleChange}
                            />
                        </label>
                    </div> */}

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );

}

export default UserRegForm;