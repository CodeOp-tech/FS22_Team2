import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // import necessary as it has the stylesheets necessary for Bootstrap components
import { Container } from "react-bootstrap"; // wraps entire application to sit more centered of screen
import { Routes, Route, useNavigate } from "react-router-dom"; // BrowserRouter = the overarching router
import Cancel from "./views/Cancel";
import ShopView from "./views/ShopView";
import Success from "./views/Success";
import CartContext from "./CartContext";

import Local from "./helpers/Local.js";
import Api from "./helpers/Api.js";

import Navbar from "./components/Navbar.js";

import PrivateRoute from "./components/PrivateRoute";
import UserProfileView from "./views/UserProfileView.js";
import LoginView from "./views/LoginView.js";
import ErrorView from "./views/ErrorView";
import HomeView from "./views/HomeView";
import BuyerPurchaseView from "./views/BuyerPurchaseView";
import SellerPurchaseView from "./views/SellerPurchaseView";
import SellerDash from "./views/SellerDash";

function App() {
  const [products, setProducts] = useState([]); // useState 1 (products fetched from database upon page render)
  const [cartProducts, setCartProducts] = useState([]); // useState 2 (populates only upon adding to cart)
  const [productData, setProductData] = useState([]); // useState 3 (populates only upon adding to cart)
  const [user, setUser] = useState(Local.getUser()); // useState 4
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // useState 5
  const [error, setError] = useState(""); // useState 6
  const [purchases, setPurchases] = useState([]); // useState 7 (populates only upon clicking Purchase Items in Shopping cart)
  const [purchasedItemsByUser, setPurchasedItemsByUser] = useState([]); // useState 8
  const [purchasedItemsByShop, setPurchasedItemsByShop] = useState([]); // useState 9
  const [totalCost, setTotalCost] = useState([]); // useState 10

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    getPurchasedItemsByUser();
    getPurchasedItemsByShop();
  }, []);

  // log in user
  async function doLogin(username, password) {
    let myResponse = await Api.loginUser(username, password);
    if (myResponse.ok) {
      Local.saveUserInfo(myResponse.data.token, myResponse.data.user);
      setUser(myResponse.data.user);
      setLoginErrorMessage("");
      navigate("/");
    } else {
      setLoginErrorMessage("Login failed");
    }
  }

  // log out user
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    //Navbar should send user to home page
  }

  // TO-DO NOTE: NEEDS TO BE UPDATED WITH ACTUAL STORE_ID
  async function getProducts(shop_id) {
    // shop_id should be passed from child
    try {
      let response = await fetch(`/products`); // NOTE: Temporarily hardcoding store_id here for testing
      if (response.ok) {
        let result = await response.json();
        setProducts(result);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // NOTE: Because products live within products table, to access individual product information
  // we do so via "products" state (which is fetched from getProducts function above)
  function getProductData(id) {
    // id (ie. product.product_id) passed from child ProductCard
    let productData = products.find((product) => product.product_id === id);
    // once products state is set, can find productData for each product

    if (productData === undefined) {
      console.log("Product data does not exist for ID: " + id);
      return undefined;
    }
    setProductData(productData);
    // must return productData in order for it to be used in addOneToCart function
    return productData;
  }

  function getProductQuantity(id) {
    // id (ie. product.product_id) passed from child ProductCard
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity; // if we find the product with a certain id, we want to know it's quantity (cartProducts array which consists objects made up of id and quantity)
    // cartProducts array example: [ { id: 1, quantity: 2 } ]

    if (quantity === undefined) {
      return 0;
    } else {
      return quantity;
    }
  }

  function addOneToCart(id) {
    // id (ie. product.product_id) passed from child ProductCard
    const quantity = getProductQuantity(id);
    // individual product info is called from the getProductData function
    // so that we can add the name and price field to the cartProducts objects
    const product = getProductData(id);
    console.log(product);
  
    // NOTE: Update total quantity available for product
    setProducts(
      products.map(
        (product) => 
        product.product_id === id
        ? {...product, product_quantity: product.product_quantity - 1}
        : product))

    if (quantity === 0) {
      // product is not in cart
      setCartProducts(
        // set state
        [
          ...cartProducts, // spread elements, take all of objects already in cart and put them in this array
          {
            // add an additional object
            id: id, // id is the product id that was passed from child ProductCard
            quantity: 1,
            name: product.product_name,
            price: product.price,
            stripe_id: product.stripe_product_id
          },
        ]
      );
    } else {
      // product is in cart
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 } // if statement is true, take the entire product object and add one to quantity
              : product // if statement is false, return product object
        )
      );
    }
  }

  function removeOneFromCart(id) {
    // id (ie. product.product_id) passed from child ProductCard
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id); // if only one exists, delete entirely by calling deleteFromCart function
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id
              ? { ...product, quantity: product.quantity - 1 } // if statement is true, take the entire product object and minus one from quantity
              : product // if statement is false, return product object
        )
      );
    }
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });
    // let fixed = totalCost.toFixed(2);
    setTotalCost(totalCost);
    // return totalCost;
  }

  function deleteFromCart(id) {
    // id (ie. product.product_id) passed from child ProductCard
    // filter = [] if an object meets a condition, add the object to array
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
  }

  // URGENT NOTE: WORK IN PROGRESS
  // NOTE: Need to figure out how to pass total points to purchase_points below (NOW HARDCODED)
  async function addPurchases(purchase_sum, user_id) {
    let myresponse = await Api.addPurchases(`${totalCost}`, 1 ); //INSERT `${Local.getUserId()}`
    if (myresponse.ok) {
      setPurchases(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  };

  // URGENT NOTE: WORK IN PROGRESS
  async function addPurchasedItems(purchase_quantity, purchase_points, purchase_id, product_id, shop_id) {
    let myresponse = await Api.addPurchasedItems();
    if (myresponse.ok) {
      setPurchasedItemsByUser(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  };

  async function getPurchasedItemsByUser(user_id) {
    let myresponse = await Api.getPurchasedItemsByUser(1); // INSERT: Local.getUserId();
    if (myresponse.ok) {
      setPurchasedItemsByUser(myresponse.data)
    } else {
      setError(myresponse.error);
    }
  };

  async function getPurchasedItemsByShop(shop_id) {
    let myresponse = await Api.getPurchasedItemsByShop(1); // INSERT: Local.getShopId()
    if (myresponse.ok) {
      setPurchasedItemsByShop(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  };

  /* ---Context Objects--- */

  const contextObjCart = {
    products,
    cartProducts,
    productData,
    purchasedItemsByUser,
    purchasedItemsByShop,
    totalCost,
    addPurchasesCb: addPurchases,
    getProductDataCb: getProductData,
    getProductQuantityCb: getProductQuantity,
    addOneToCartCb: addOneToCart,
    removeOneFromCartCb: removeOneFromCart,
    deleteFromCartCb: deleteFromCart,
    getTotalCostCb: getTotalCost,
    getPurchasedItemsByUserCb: getPurchasedItemsByUser
  };

  return (
    <div className="App">
      <Container>
        <CartContext.Provider value={contextObjCart}>
          <Navbar user={user} logoutCb={doLogout} />

          <Routes>
            <Route path="/" element={<HomeView />} />

            <Route
              path="shop"
              element={
                <ShopView
                  products={products}
                  // getProductsCb={(shop_id) => getProducts(shop_id)}
                />
              }
            />
            <Route path="/seller" element={<SellerDash/>}/> //remove after 

            {/* Stripe will redirect to either success or cancel path depending on how Stripe is interacted with */}
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            
            <Route path="customer_purchases" element={<BuyerPurchaseView />} />
            <Route path="shop_purchases" element={<SellerPurchaseView />} />

            <Route
              path="/users/userId"
              element={
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
                  loginError={loginErrorMessage}
                />
              }
            />

            <Route
              path="*"
              element={<ErrorView code="404" text="Page not found" />}
            />
          </Routes>
        </CartContext.Provider>
      </Container>
    </div>
  );
}

export default App;
