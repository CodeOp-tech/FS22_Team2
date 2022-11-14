var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const stripe = require('stripe')('pk_test_51M44XcBIwndE5957AFPxf2L7EGzX9EjVFN44RHmf7y1tcKRePIRn1VTbWbc4iqKKFC6gVwEECkkYnDmWQA5kqXHc00E4SmyYoB');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var stripeRouter = require("./routes/stripe");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/stripe", stripeRouter);

module.exports = app;
