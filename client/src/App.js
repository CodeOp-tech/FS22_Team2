import React, { useState, useNavigate } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';

import Local from "./helpers/Local.js";
import Api from "./helpers/Api.js";

import Navbar from './components.Navbar.js'
;

import PrivateRoute from "./components/PrivateRoute";
import UserProfileView from "./views/UserProfileView.js";
import LoginView from "./views/LoginView.js";
import ErrorView from './views/ErrorView';

import { application } from 'express';

import logo from './logo.svg';

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
      {/* header is all defualt from setup - revisit */}
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
      <Route 
        path="/" 
        element={<h1>Home</h1>} 
      />

      <Route 
        path ="/users/userId" 
        element ={
        <PrivateRoute>
          <UserProfileView />
        </PrivateRoute>
        } 
      />

      <Route 
        path="/login" 
        element={
        <LoginView 
          loginCb={(u, p) => doLogin(u, p)} 
          loginError={loginErrorMsg} 
        />}
      />

      <Route 
        path="*" 
        element={<ErrorView code="404" text="Page not found" 
        />} 
      />

    </Routes>

    </div>
  );
}

export default App;
