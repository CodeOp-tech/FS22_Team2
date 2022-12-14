import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // import necessary as it has the stylesheets necessary for Bootstrap components
import { Container } from "react-bootstrap"; // wraps entire application to sit more centered of screen
import { Routes, Route, useNavigate } from "react-router-dom"; // BrowserRouter = the overarching router

import Local from "./helpers/Local.js";
import Api from "./helpers/Api.js";

import Navbar from "./components/Navbar.js";

import Cancel from "./views/Cancel";
import ShopView from "./views/ShopView";
import SingleShopView from "./views/SingleShopView";
import Success from "./views/Success";
import ProductContext from "./ProductContext";
import CartContext from "./CartContext";
import PrivateRoute from "./components/PrivateRoute";
import UserProfileView from "./views/UserProfileView.js";
import RegistrationView from "./views/RegistrationView.js";
import LoginView from "./views/LoginView.js";
import ErrorView from "./views/ErrorView";
import HomeView from "./views/HomeView";
import BuyerPurchaseView from "./views/BuyerPurchaseView";
import SellerPurchaseView from "./views/SellerPurchaseView";
import SellerDash from "./views/SellerDash";

//map stuff!
import { getHome } from "./helpers/geoLocation";

function App() {
  const [products, setProducts] = useState([]); // useState 1 (products fetched from database upon page render)
  const [cartProducts, setCartProducts] = useState([]); // useState 2 (populates only upon adding to cart)
  const [productData, setProductData] = useState([]); // useState 3 (populates only upon adding to cart)
  const [user, setUser] = useState(Local.getUser()); // useState 4
  const [regErrorMessage, setRegErrorMessage] = useState(""); // useState 5
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // useState 6
  const [error, setError] = useState(""); // useState 7
  const [purchases, setPurchases] = useState([]); // useState 8 (populates only upon clicking Purchase Items in Shopping cart)
  const [purchasedItemsByUser, setPurchasedItemsByUser] = useState([]); // useState 9
  const [purchasedItemsByShop, setPurchasedItemsByShop] = useState([]); // useState 10
  const [totalCost, setTotalCost] = useState([]); // useState 11
  const [shop, setShop] = useState(Local.getShop()); // useState 12
  const [productsByShop, setProductsByShop] = useState([]); // useState 13
  const [purchasedItems, setPurchasedItems] = useState([]); // useState 14
  const [searched, setSearched] = useState([]); // useState 15
  const [searchedByShop, setSearchedByShop] = useState([]); // useState 16
  const [shops, setShops] = useState([]); //useState 17
  const [shopProfile, setShopProfile] = useState([]); // useState18
  const [reviews, setReviews] = useState([]); // useState 19

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    getProductsByShop();
    getPurchasedItemsByUser();
    getPurchasedItemsByShop();
  }, []);

  useEffect(() => {
    setSearched(products); // this must be done, if not All Shops page renders empty because search/filter function running (must set the page with all products)
    setSearchedByShop(productsByShop); // this must be done, if not individual Shop page renders empty (must set the page with shop's products)
  }, [products, productsByShop]); // whenever products or productsByShop change

  useEffect(() => {
    getPurchasedItemsByUser();
    getPurchasedItemsByShop();
  }, [purchases, purchasedItems]); // when purchases & purchasedItems are updated (see addPurchases function), getPurchasedItemsbyUser/Shop is called

  useEffect(() => {
    getTotalCost();
  }, [cartProducts]); // whenever cartProducts are added/removed, total cost must be updated

  useEffect(() => {
    fetch("/shops")
      .then((res) => res.json())
      .then((json) => {
        setShops(json);
      })
      .catch((error) => {});
  }, []);

  /********************* AUTH FUNCTIONS *********************/

  // register new user
  // NOTE: removed has_shop to test; add back in later
  async function doRegister(username, password, email, has_shop) {
    let myResponse = await Api.registerUser(
      username,
      password,
      email,
      has_shop
    );
    if (myResponse.ok) {
      // This will direct user to the SellerDash page on login, if they have a shop. Else will take them to UserDash.
      doLogin(username, password);
    } else {
      setRegErrorMessage("Registration failed");
    }
  }

  // log in user
  // when log in, save
  async function doLogin(username, password) {
    let myResponse = await Api.loginUser(username, password);
    if (myResponse.ok) {
      Local.saveUserInfo(
        myResponse.data.token,
        myResponse.data.user,
        myResponse.data.shop
      );
      console.log(myResponse.data.user);
      console.log(myResponse.data.shop);
      // setUser(Local.getUser);
      setUser(myResponse.data.user);
      // setShop(Local.getShop);
      setShop(myResponse.data.shop);
      setLoginErrorMessage("");
      getPurchasedItemsByUser();
      // If user has a shop, send them to SellerDash page on login. If not, send them to UserDash
      // console logging "shop" returns null even though shop is saved in localstorage
      // QUESTION: doesn't work, goes to seller page for sellers but stays on login page for buyers
      if (myResponse.data.user.shop_id) {
        getPurchasedItemsByShop();
        navigate("/seller");
      } else {
        navigate("/");
      }
    } else {
      setLoginErrorMessage("Login failed");
    }
  }

  // log out user
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    setShop(null);
    //Navbar should send user to home page
  }

  /********************* SHOP FUNCTIONS *********************/

  // GET shop profile
  async function getShopProfile(shop_id) {
    // update shop @ local shop_id w/shopData info
    let myresponse = await Api.getShopProfile(shop_id);
    if (myresponse.ok) {
      setShopProfile(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  }

  // PUT edit shop info
  async function editShop(shopData, shop_id) {
    // update shop @ local shop_id w/shopData info
    //console.log("App editShop receives:", shopData);
    let myresponse = await Api.updateShop(shopData, shop_id);
    if (myresponse.ok) {
      setShop(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  }

  /********************* PRODUCT FUNCTIONS *********************/
  // GET ALL PRODUCTS (regardless of store)
  async function getProducts() {
    try {
      let response = await fetch(`/products`);
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

  // TO-DO NOTE: NEEDS TO BE UPDATED WITH ACTUAL SHOP_ID PASSED BY FUNCTION
  async function getProductsByShop(shop_id) {
    // shop_id should be passed from child
    let myresponse = await Api.getProductsByShop(shop_id); // URGENT NOTE: To update: currently hardcoded
    if (myresponse.ok) {
      setProductsByShop(myresponse.data);
      console.log(productsByShop);
    } else {
      setError(myresponse.error);
    }
  }

  // GET PRODUCT DATA FOR INDIVIDUAL PRODUCTS
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

  /********************* SHOPPING CART FUNCTIONS *********************/

  // GET PRODUCT QUANTITY OF PRODUCTS ADDED TO SHOPPING CART
  function getProductQuantity(id) {
    // id (ie. product.product_id) passed from child ProductCard
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity; // if we find the product with a certain id, we want to know its quantity (cartProducts array which consists objects made up of id and quantity)
    // cartProducts array example: [ { id: 1, quantity: 2 } ]

    if (quantity === undefined) {
      return 0;
    } else {
      return quantity;
    }
  }

  // ADD ONE PRODUCT TO SHOPPING CART
  function addOneToCart(id) {
    // id (ie. product.product_id) passed from child ProductCard
    const quantity = getProductQuantity(id);
    // individual product info is called from the getProductData function
    // so that we can add the name and price field to the cartProducts objects
    const product = getProductData(id);
    console.log(product);

    // NOTE: Update total quantity available for product
    setProducts(
      products.map((product) =>
        product.product_id === id
          ? { ...product, product_quantity: product.product_quantity - 1 }
          : product
      )
    );

    if (quantity === 0) {
      // product is not in cart
      let thisQuantity = 1; // thisQuantity is set outside of object so totalPoints can refer to it
      setCartProducts(
        // set state
        [
          ...cartProducts, // spread elements, take all of objects already in cart and put them in this array
          {
            // add an additional object
            id: id, // id is the product id that was passed from child ProductCard
            quantity: thisQuantity,
            name: product.product_name,
            price: product.price,
            shop_id: product.shop_id,
            productPoints:
              Number(product.recycled) + Number(product.no_fridge) + Number(product.fair_trade) + Number(product.local) + Number(product.organic),
            // totalPoints created separate from productPoints, to store total points from productPoints multiplied by quantity of product in shopping cart
            totalPoints:
              (Number(product.recycled) + Number(product.no_fridge) + Number(product.fair_trade) + Number(product.local) + Number(product.organic)) * thisQuantity,
            stripe_id: product.stripe_product_id,
          },
        ]
      );
    } else {
      // product is in cart
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                  totalPoints: product.productPoints * (product.quantity + 1),
                } // if statement is true, take the entire product object and add one to quantity, add points proportionally
              : product // if statement is false, return product object
        )
      );
    }
  }

  // REMOVE ONE PRODUCT FROM SHOPPING CART
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
              ? {
                  ...product,
                  quantity: product.quantity - 1,
                  totalPoints: product.productPoints * (product.quantity - 1),
                } // if statement is true, take the entire product object and minus one from quantity
              : product // if statement is false, return product object
        )
      );
    }
  }

  // GET TOTAL SUM OF ALL PRODUCTS IN SHOPPING CART
  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });
    let fixed = totalCost.toFixed(2); //toFixed(2) rounds number of decimals to two
    setTotalCost(fixed);
    Local.saveTotal(fixed);
  }

  // DELETE FROM SHOPPING CART
  function deleteFromCart(id) {
    // id (ie. product.product_id) passed from child ProductCard
    // filter = [] if an object meets a condition, add the object to array
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
  }

  /********************* PURCHASE FUNCTIONS *********************/

  // ADD PURCHASE (ie. receipt of a single purchase) INTO PURCHASES TABLES (DATABASE)
  async function addPurchases(purchase_sum, user_id) {
    let myresponse = await Api.addPurchases(
      Local.getTotal(),
      Local.getUserId()
    ); // call upon Local for stored total amount and userId

    if (myresponse.ok) {
      setPurchases(myresponse.data);
      // console.log(myresponse.data);
      let data = myresponse.data;
      let purchaseId = data[data.length - 1].purchase_id;

      // ADD ALL PRODUCTS (ie. purchased_items) PURCHASED INTO PURCHASED_ITEMS TABLES (DATABASE)
      let myresponse2 = await Api.addPurchasedItems(
        purchaseId,
        Local.getCartProducts()
      );
      if (myresponse2.ok) {
        setPurchasedItems(myresponse2.data);
      } else {
        setError(myresponse2.error);
      }
    }

    // UPDATE USER PURCHASE POINTS
    let myresponse3 = await Api.addUserPoints(Local.getUserId());
    if (myresponse3.ok) {
      setUser(myresponse3.data);
      console.log("user:", user);
    } else {
      setError(myresponse3.error);
    }
  }

  // GET ALL PURCHASED ITEMS (ie. single customer purchases at all shops) TO DISPLAY TO CUSTOMER/BUYER

  async function getPurchasedItemsByUser(user_id) {
    let myresponse = await Api.getPurchasedItemsByUser(Local.getUserId()); // INSERT: Local.getUserId();
    if (myresponse.ok) {
      setPurchasedItemsByUser(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  }

  // GET ALL PURCHASED ITEMS (ie. all customer purchases at said shop) TO DISPLAY TO SHOP
  async function getPurchasedItemsByShop(shop_id) {
    let myresponse = await Api.getPurchasedItemsByShop(Local.getShopId()); // INSERT: Local.getShopId()
    if (myresponse.ok) {
      setPurchasedItemsByShop(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  }

  /********************* SEARCH & SORT FUNCTIONS *********************/

  // SEARCH FUNCTION WITHIN SHOPVIEW (Online Store)
  function search(input) {
    let tempProducts = products.filter((p) => {
      return p.product_name.toLowerCase().includes(input.toLowerCase());
      // convert both product_name and input to lowercase so not case sensitive
    });
    setSearched(tempProducts); // "searched" state set to ShopView via ProductContext
  }

  // SEARCH FUNCTION WITHIN SINGLE SHOP VIEW ()
  function searchShop(input) {
    let tempProducts = productsByShop.filter((p) => {
      return p.product_name.toLowerCase().includes(input.toLowerCase());
      // convert both product_name and input to lowercase so not case sensitive
    });
    setSearchedByShop(tempProducts); // "searchedByShop" state set to SingleShopView via ProductContext
  }

  // Referred to https://www.educative.io/answers/how-to-sort-an-array-of-objects-in-javascript for a more generic sort function
  function dynamicsort(property, order) {
    let sort_order = 1;
    if (order === "desc") {
      sort_order = -1;
    }
    return function (a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (a[property] > b[property]) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    };
  }

  function showTotalPoints() {
    let copySearched = [...searched];
    let shopsFilter = copySearched.sort(
      dynamicsort("total_product_points", "desc")
    );
    setSearched(shopsFilter);
  }

  function showLowToHighPrice() {
    let copySearched = [...searched];
    let priceFilter = copySearched.sort(dynamicsort("price"));
    setSearched(priceFilter);
  }

  function showHighToLowPrice() {
    let copySearched = [...searched];
    let priceFilter = copySearched.sort(dynamicsort("price", "desc"));
    setSearched(priceFilter);
  }

  function showShopsAtoZ() {
    let copySearched = [...searched];
    let shopsFilter = copySearched.sort(dynamicsort("shop_name"));
    setSearched(shopsFilter);
  }

  /********************* REVIEWS FUNCTIONS *********************/

  async function getProductReviews(product_id) {
    // product_id passed from showPopup(id) function in ProductCard child
    let myresponse = await Api.getProductReviews(product_id);
    if (myresponse.ok) {
      setReviews(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  }

  async function addReview(newReview, product_id, user_id) {
    let myresponse = await Api.addReview(
      newReview,
      Number(product_id),
      Local.getUserId()
    );
    // newReview (formData), product_id passed from handleSubmit() function in AddReview child
    if (myresponse.ok) {
      setReviews(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  }

  /* ---Context Objects--- */

  const contextObjCart = {
    user,
    cartProducts,
    purchasedItemsByUser,
    purchasedItemsByShop,
    totalCost,
    addPurchasesCb: addPurchases,
    getProductQuantityCb: getProductQuantity,
    addOneToCartCb: addOneToCart,
    removeOneFromCartCb: removeOneFromCart,
    deleteFromCartCb: deleteFromCart,
    getTotalCostCb: getTotalCost,
    getPurchasedItemsByUserCb: getPurchasedItemsByUser,
  };

  const contextObjProduct = {
    products,
    productData,
    searched,
    searchedByShop,
    productsByShop,
    reviews,
    shopProfile,
    getShopProfileCb: getShopProfile,
    showTotalPointsCb: showTotalPoints,
    showHighToLowPriceCb: showHighToLowPrice,
    showLowToHighPriceCb: showLowToHighPrice,
    showShopsAtoZCb: showShopsAtoZ,
    addReviewCb: addReview,
    getProductsByShopCb: getProductsByShop,
    getProductReviewsCb: getProductReviews,
    getProductDataCb: getProductData,
    searchCb: search,
    searchShopCb: searchShop,
  };

  return (
    <div className="App">
      <Container>
        <ProductContext.Provider value={contextObjProduct}>
          <CartContext.Provider value={contextObjCart}>
            <Navbar user={user} shop={shop} logoutCb={doLogout} />

            <Routes>
              <Route path="/" element={<HomeView shops={shops} />} />
              {/* NOTE: This route shows all products of all shops */}
              <Route
                path="shops"
                element={<ShopView products={products} reviews={reviews} />}
              />
              {/* NOTE: This route shows products of a single selected shop */}
              <Route
                path="shop"
                element={<SingleShopView products={productsByShop} />}
              />
              <Route
                path="/seller"
                element={
                  <SellerDash
                    showAllProducts={getProducts}
                    shop={shop}
                    getProductsByShopCb={(shop_id) =>
                      getProductsByShop(shop_id)
                    }
                    editShopCb={(formData, shop_id) =>
                      editShop(formData, shop_id)
                    }
                  />
                }
              />{" "}
              {/*remove after*/}
              {/* Stripe will redirect to either success or cancel path depending on how Stripe is interacted with */}
              <Route path="success" element={<Success />} />
              <Route path="cancel" element={<Cancel />} />
              <Route
                path="customer_purchases"
                element={<BuyerPurchaseView />}
              />
              <Route path="shop_purchases" element={<SellerPurchaseView />} />
              <Route
                path="/users/:userId"
                element={
                  <PrivateRoute>
                    <UserProfileView user={user} shops={shops} />
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
                path="/register"
                element={
                  <RegistrationView
                    registerCb={(username, password, email, has_shop) =>
                      doRegister(username, password, email, has_shop)
                    }
                    regError={regErrorMessage}
                  />
                }
              />
              <Route
                path="*"
                element={<ErrorView code="404" text="Page not found" />}
              />
            </Routes>
          </CartContext.Provider>
        </ProductContext.Provider>
      </Container>
    </div>
  );
}

export default App;
