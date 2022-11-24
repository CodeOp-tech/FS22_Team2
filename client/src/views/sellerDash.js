import React, { useState, useEffect } from "react";
import "./SellerDash.css";
import SellerList from "../components/SellerList.js";
import SellerForm from "../components/SellerForm.js";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import ShopEditForm from "../components/ShopEditForm";
import Api from "../helpers/Api.js";
import Local from "../helpers/Local";
import Accordion from "react-bootstrap/Accordion";

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

  async function addProduct(formData) {
    // console.log(formData);
    let options = {
      method: "POST",
      body: formData,
    };
    let token = Local.getToken();
    if (token) {
      options.headers["authorization"] = `Bearer ${token}`;
    } // add token to headers if it exists in localStorage
    try {
      let response = await fetch(`/products/${Local.getShopId()}`, options);
      if (response.ok) {
        let result = await response.json();
        setProductsData(result);
        getProducts();
        props.showAllProducts(); // fetches all the products without reload on the online store
        //note to ask about the reload
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  async function deleteProduct(shop_id, product_id) {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/products/${shop_id}/${product_id}`, options);

      if (response.ok) {
        let result = await response.json();
        setProductsData(result);
        getProducts();
        props.showAllProducts(); //split second loads all products
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function editProduct(shop_id, product_id, formData) {
    let options = {
      method: "PUT",
      // headers: { 'Content-Type': 'application/json' },
      body: formData,
    };

    try {
      let response = await fetch(`/products/${shop_id}/${product_id}`, options);
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
    <Accordion defaultActiveKey="0">
      <Container>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="editShop-accHead">
            Edit You Shop Profile
          </Accordion.Header>
          <Accordion.Body className="editShop-acc">
            <Row>
              <ShopEditForm shop={props.shop} editShopCb={props.editShopCb} />
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Shop Products</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <SellerForm
                  addProductCb={addProduct}
                  showProducts={props.showAllProducts}
                />{" "}
                //Getting from the App
              </Col>
              <Col>
                <SellerList
                  productsData={productsData}
                  deleteProductCb={(shop_id, product_id) =>
                    deleteProduct(shop_id, product_id)
                  }
                  editProductCb={(id, formData) => editProduct(id, formData)} //id sent to the sellerDash (parent of sellerlist)
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Container>
    </Accordion>
  );
}

export default SellerDash;
