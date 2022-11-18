import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';


function UserRegForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [hasShop, setHasShop] = useState(0);

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

    // if box is empty, clicking it will check the box: so set hasShop to 1 (aka true) when checked;
    // if box is already checked, clicking it will uncheck it: so set hasShop to 0 (aka false); 
    function handleChangeCheck (e) {
        if (e.target.checked) {
            setHasShop(0);
        } else {
            setHasShop(1);
        }
        console.log(hasShop);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.registerCb(username, password, email);
    }

    return (
        <div className="UserRegForm">
            <div className="col-4 offset-4">
                <h2>Sign up!</h2>
                
                {
                    props.regError && (
                        <div className="alert alert-danger">{props.regError}</div>
                    )
                }

                <Form className='user-reg-form' onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label className='username'>
                            Username
                        </Form.Label>
                        <Form.Control
                                type="text"
                                name="usernameInput"
                                required
                                className="form-control"
                                value={username}
                                onChange={handleChange}
                            />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label className='username'>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="passwordInput"
                            required
                            className="form-control"
                            value={password}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label className='username'>
                            Email
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="emailInput"
                            required
                            className="form-control"
                            value={email}
                            onChange={handleChange}
                        />
                        </Form.Group>

                    <Form.Group className='mb-3'>
                        <Col>
                            Would you like to open a shop?
                        </Col>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                name="has-shop"
                                value={hasShop}
                                onChange={handleChangeCheck}
                            />
                        </Col>
                    </Form.Group>

                    <Button type="submit" className="btn btn-primary">Submit</Button>
                </Form>
            </div>
        </div>
    );

}

export default UserRegForm;