import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import NavbarShop from '../components/NavbarShop';
import ProductCard from "../components/ProductCard";

function ShopView(props) {

    // URGENT TO-DO NOTE: Include shop name in h1

  return (
    <>
    <NavbarShop></NavbarShop>
      <h1>Welcome to the store!</h1> 
      <Row xs={1} md={3} className="g-4">
        {" "}
        {/* On an extra small screen, only show 1 column but on medium screen show 3 columns */}
        {props.products.map((product, idx) => ( // received props.products from parent App
          <Col align="center" key={idx}>
            <ProductCard product={product} /> {/* Send mapped product above as props to ProductCard to use*/}
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ShopView;