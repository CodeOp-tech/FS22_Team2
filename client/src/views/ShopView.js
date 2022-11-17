// Video tutorial from: https://www.youtube.com/watch?v=_8M-YVY76O8&ab_channel=TraversyMedia

import React, { useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import NavbarShop from '../components/NavbarShop';
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import ProductContext from "../ProductContext";

function ShopView(props) {
  const { searched } = useContext(ProductContext);

  // TO-DO NOTE: Need to be able to pass shop_id somehow to parent App (for now, hardcoded in App)

  return (
    <>
    <NavbarShop></NavbarShop>
      <h1>Welcome to the store!</h1>
      <Search />
      <Row xs={1} md={3} className="g-4">
        {" "}
        {/* On an extra small screen, only show 1 column but on medium screen show 3 columns */}
        {searched.map((product, idx) => ( // received searched state from parent App, from search function (with original state being "products")
          <Col align="center" key={idx}>
            <ProductCard product={product} /> 
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ShopView;
