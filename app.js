var createError = require('http-errors');
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

// added authRouter
var authRouter = require('./routes/auth.js');
var indexRouter = require("./routes/index.js");
var usersRouter = require("./routes/users.js");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// commented out because if it's live, path directs here 
// app.use(express.static(path.join(__dirname, "public")));

// Routes 
// added authRouter 
app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// General error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error: err.message });
});

module.exports = app;
