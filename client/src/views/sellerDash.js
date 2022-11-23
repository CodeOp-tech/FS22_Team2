import React, { useState, useEffect } from "react";
import "./SellerDash.css";
import SellerList from "../components/SellerList.js";
import SellerForm from "../components/SellerForm.js";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import ShopEditForm from "../components/ShopEditForm";
import Api from "../helpers/Api.js";
import Local from "../helpers/Local";

function SellerDash(props) {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // Get all product info for this shop by id and save to productsData state
  async function getProducts() {
    try {
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

  async function addProduct(editProductData) {
    // console.log(formData);
    let options = {
      method: "POST",
      //headers: { 'Content-Type': 'application/json' }, //remove?
      body: editProductData,
    };

    //   method: 'POST',
    //   //headers: { 'Content-Type': 'application/json' }, //remove?
    //   body: editProductData // just formData?
    // };

    try {
      let response = await fetch(`/products/${Local.getShopId()}`, options);
      if (response.ok) {
        let result = await response.json();
        setProductsData(result);
        getProducts(); //note to ask about the reload
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  async function deleteProduct(id) {
    let options = {
      method: "DELETE",
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
    }
  }

  async function editProduct(id, formData) {
    let options = {
      method: "PUT",
      // headers: { 'Content-Type': 'application/json' },
      body: formData,
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(formData)
    };
    console.log(formData);
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
    }
  }

  return (
    <div>
      <Container>
        <Row>
          <ShopEditForm shop={props.shop} editShopCb={props.editShopCb} />
        </Row>

        <Row>
          <Col>
            <SellerForm addProductCb={addProduct} />
          </Col>
          <Col>
            <SellerList
              productsData={productsData}
              deleteProductCb={(id) => deleteProduct(id)}
              editProductCb={(id, formData) => editProduct(id, formData)} //id sent to the sellerDash (parent of sellerlist)
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SellerDash;
