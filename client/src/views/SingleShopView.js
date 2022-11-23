import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import ProductContext from "../ProductContext";
import Sort from "../components/Sort";


function ShopView(props) {
  const { searchedByShop, shopProfile } = useContext(ProductContext);

  return (
    <>
      <h1>Welcome to {shopProfile.shop_name}</h1> 

      <img src={shopProfile.shop_image}></img>
      <h3>{shopProfile.shop_description}</h3>
      <p>Address: {shopProfile.shop_address}</p>
      <p>Website: {shopProfile.website}</p>
      <p>Email: {shopProfile.shop_email}</p>
      <p>Donate: {shopProfile.donate}</p>
      <p>LED lights: {shopProfile.led_lights}</p>
      <p>Min biz: {shopProfile.min_biz}</p>
      <p>Small biz: {shopProfile.small_biz}</p>
      <p>Women-only biz: {shopProfile.wo_biz}</p>

      <Row xs={1} md={3} className="g-4">
        {" "}
        {/* On an extra small screen, only show 1 column but on medium screen show 3 columns */}
        {searchedByShop.map((product, idx) => ( // received searchedByShop state from parent App, where search/filter function takes place (with original state being productsByShop)
          <Col align="center" key={idx}>
            <ProductCard product={product} /> {/* Send mapped product above as props to ProductCard to use*/}
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ShopView;