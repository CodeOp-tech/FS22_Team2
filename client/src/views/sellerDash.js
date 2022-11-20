import React, { useState, useEffect } from "react";
import "./SellerDash.css";
import SellerList from "../components/SellerList.js";
import SellerForm from "../components/SellerForm.js";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import Local from "../helpers/Local.js";
import ShopEditForm from "../components/ShopEditForm";
import Api from "../helpers/Api.js";

function SellerDash(props) {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // Get all product info for this shop by id and save to productsData state
  async function getProducts() {
    try {
      // NOTE: in original working version, hard-coded to 1
      // NOTE: also tried converting to number, no dice
      let response = await fetch(`/products/${Local.getShopId()}`);
      if (response.ok) {
        let data = await response.json();
        setProductsData(data);
      } else {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }


  async function addProduct(formData) {
    console.log(formData);
    let options = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' }, //remove?
      body: formData // just formData?
    };
    
    try {
      let response = await fetch('/products', options); 
      if (response.ok) {
        let result = await response.json();
        setProductsData(result);
        getProducts();
      } else {
      console.log(`Server error: ${response.status} ${response.statusText}`);
    }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }
  
  /********* URGENT ZOE TESITNG THIS ROUTE, NOT WORKING YET *********/
  // Add a new product to this shop
  // async function addProduct(formData) {
  //   let options = {
  //     method: 'POST'
  //   };
  //   try {
  //     //let response = await Api.addProducts(formData, `${Local.getShopId()}`);
  //     //console.log(`SellerDash shop_id: ${Local.getShopId()}`);
  //     let response = await fetch(`/products`, options); 
  //     if (response.ok) {
  //       console.log(response.json());
  //       setProductsData(response.data);
  //       getProducts();
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Network error: ${err.message}`);
  //   }
  // }
  /********* END ZOE'S *********/

  // Delete a product by id
  async function deleteProduct(id) {
    let options = {
    method: 'DELETE'
  };

  try {
    let response = await fetch(`/products/${id}`, options); 
    if (response.ok) {
      let result = await response.json();
      setProductsData(result);
      getProducts(); //split second loads all products
    } else {
      console.log(`Server error: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.log(`Server error: ${err.message}`);
  }};

  //   async function editProduct(product) {
  //     let options = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(product)
  // };

  // try {
  //     let response = await fetch('/products', options);
  //     if (response.ok) {
  //     let result = await response.json();
  //     setProductData(result);
  // } else {
  //     console.log(`Server error: ${response.status} ${response.statusText}`);
  // }
  // } catch (err) {
  //     console.log(`Server error: ${err.message}`);
  // }};

  return (
    <div>
      <Container>

      <Row>
        <ShopEditForm 
          shop = {props.shop}
        />
      </Row>

      <Row>
      <Col>
      <SellerForm addProductCb={addProduct} />
      </Col>
      <Col>
        <SellerList 
          productsData={productsData}
          deleteProductCb={(id) => deleteProduct(id)}
        />
      </Col>
      
      </Row>

      </Container>
    </div>
  );
}


export default SellerDash;
