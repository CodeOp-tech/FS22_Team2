// Video tutorial from: https://www.youtube.com/watch?v=_8M-YVY76O8&ab_channel=TraversyMedia

import React, { useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Sort from "../components/Sort";
import ProductContext from "../ProductContext";
import CartContext from "../CartContext";


function ShopView(props) {
  const { searched } = useContext(ProductContext);
  const { user } = useContext(CartContext);

  return (
    <div className="ShopView container">
      <h2 style={{color:'white', fontWeight:'bolder', textAlign: 'center'}}>Welcome to our online marketplace</h2>
      <h3 style={{color:'white', fontWeight:'bolder', textAlign: 'center'}}>Happy Shopping!</h3>
      { !user ? 
      <h4>Please login/register to begin shopping!</h4>
      : ""
      }
      <div className="row">
        <div className="col-sm-2">
          <Search />
        </div>
        <div className="col-sm-2">
          <Sort  />
        </div>
      </div>
      
      <Row xs={1} md={3} className="g-4">
        {" "}
        {/* On an extra small screen, only show 1 column but on medium screen show 3 columns */}
        {searched.map((product, idx) => ( // received searched state from parent App, from search function (with original state being "products")
          <Col align="center" key={idx}>
            <ProductCard product={product} /> 
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ShopView;
