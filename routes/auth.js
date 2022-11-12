const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config.js');
const db = require("../model/helper.js");

// Register new user
router.post ('/register', async (req,res) => {
    let { username, password, email} = req.body;
}
)

// Log in user