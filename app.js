var createError = require('http-errors');
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const stripe = require('stripe')('pk_test_51M44XcBIwndE5957AFPxf2L7EGzX9EjVFN44RHmf7y1tcKRePIRn1VTbWbc4iqKKFC6gVwEECkkYnDmWQA5kqXHc00E4SmyYoB');

var authRouter = require('./routes/auth.js');
var shopsRouter = require("./routes/shops.js");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var stripeRouter = require("./routes/stripe");
var purchasesRouter = require("./routes/purchases");
var purchaseditemsRouter = require("./routes/purchaseditems");
var reviewsRouter = require("./routes/reviews");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// commented out because if it's live, path directs here 
// app.use(express.static(path.join(__dirname, "public")));
app.use( express.static('public') );
// Routes 
// added authRouter 
app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/shops", shopsRouter);
app.use("/products", productsRouter);
app.use("/stripe", stripeRouter);
app.use("/purchases", purchasesRouter);
app.use("/purchaseditems", purchaseditemsRouter);
app.use("/reviews", reviewsRouter)

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
