import React, {useState, useEffect} from "react";
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css"; // import necessary as it has the stylesheets necessary for Bootstrap components
import { Container } from "react-bootstrap"; // wraps entire application to sit more centered of screen
import { BrowserRouter, Routes, Route} from "react-router-dom"; // BrowserRouter = the overarching router
import Cancel from "./views/Cancel";
import ShopView from "./views/ShopView";
import Success from "./views/Success";


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts(shop_id) { // shop_id should be passed from child
    try {
      let response = await fetch(`/products/1`); // NOTE: Temporarily hardcoding store_id here for testing
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

  return (
    <div className="App">
      <Container>

          <BrowserRouter>
            <Routes>
              <Route path="shop" element={
                <ShopView 
                  products={products}
                  // getProductsCb={(shop_id) => getProducts(shop_id)} 
                />} 
              />

              {/* Stripe will redirect to either success or cancel path depending on how Stripe is interacted with */}
              <Route path="success" element={<Success />} />
              <Route path="cancel" element={<Cancel />} />
            </Routes>
          </BrowserRouter>

        
      </Container>
     
    </div>
  );
}

export default App;
