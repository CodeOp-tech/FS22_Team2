import React, { useState, useEffect } from "react";
import "./SellerDash.css";
import SellerList from "../components/SellerList";
import SellerForm from "../components/SellerForm";
import { Container, Col, Row, Card, Button } from "react-bootstrap";


function SellerDash(props) {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {

    getProducts();
  }, []);

  async function getProducts() {

    try {
      let response = await fetch("/products/1");
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
    getProducts(); //note to ask about the reload
    } else {
    console.log(`Server error: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.log(`Server error: ${err.message}`);
  }}

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


    async function editProduct(id, formData) {
      console.log('testing', formData, id)
      let options = {
      method: 'PUT',
      // headers: { 'Content-Type': 'application/json' },
      body: formData
  };

  try {
      let response = await fetch(`/products/${id}`, options);
      if (response.ok) {
      let result = await response.json();
      setProductsData(result);
  } else {
      console.log(`Server error: ${response.status} ${response.statusText}`);
  }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }};

  return (
    <div>
      <Container>
      <Row>
      <Col>
      <SellerForm addProductCb={addProduct} />
      </Col>
      <Col>
      <SellerList productsData={productsData}
                  deleteProductCb={(id) => deleteProduct(id)}
                  editProductCb={(id, formData) =>editProduct(id, formData)}//id sent to the sellerDash (parent of sellerlist)
      /></Col> 
      
      </Row>
    
      </Container>  
    
    </div>
  );
}

export default SellerDash;
