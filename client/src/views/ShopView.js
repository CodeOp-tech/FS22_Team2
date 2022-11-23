// Video tutorial from: https://www.youtube.com/watch?v=_8M-YVY76O8&ab_channel=TraversyMedia

import React, { useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Sort from "../components/Sort";
import ProductContext from "../ProductContext";
import NavbarShop from "../components/NavbarShop";

function ShopView(props) {
  const { searched } = useContext(ProductContext);
  const [filtered, setFiltered] = useState([]);

  

  // TO-DO NOTE: Need to be able to pass shop_id somehow to parent App (for now, hardcoded in App)

  return (
    <div className="ShopView container">
      <h1>Welcome to My Shopping Buddy</h1>
      <p>Please login/register to begin shopping!</p>
      <div className="row">
        <div className="col-sm-2">
          <Search />
        </div>
        <div className="col-sm-2">
          <Sort />
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
