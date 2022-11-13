import React, { useState, useNavigate } from "react";
import { Routes, Route, PrivateRoute } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { application } from 'express';

function App() {
  const [user, setUser] = useState(Local.getUser()); // useState 1
  const [loginErrorMessage, setLoginErrorMessage] = useState('') // useState 2
  const navigate = useNavigate();

  async function doLogin(username, password) {
    let myResponse = await Api.loginUser(username, password);
    if (myResponse.ok) {
      Local.saveUserInfo(myResponse.data.token, myResponse.data.user);
      setUser(myResponse.data.user);
      setLoginErrorMessage('');
      navigate('/');
    } else {
      setLoginErrorMessage('Login failed');
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    //Navbar should send user to home page
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    <Routes>
      <Route path ="/users/userId" element ={
        <PrivateRoute>
          <UserProfileView />
        </PrivateRoute>
      } />
    </Routes>

    </div>
  );
}

export default App;
