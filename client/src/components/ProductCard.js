import { useContext, useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
// NOTE: See React Bootstrap cards for more info: https://react-bootstrap.github.io/components/cards/
import CartContext from "../CartContext";

function ProductCard(props) {
  // props.product is the product we are selling
  const product = props.product;
  const { items,
    getProductQuantityCb,
    addOneToCartCb,
    removeOneFromCartCb,
    deleteFromCartCb,
    getTotalCostCb } = useContext(CartContext);
  
  const productQuantity = getProductQuantityCb(product.product_id);
  const addToCart = addOneToCartCb(product.product_id);
  
  return (
    <Card>
      <Card.Body> {/* used to pad content inside a <Card> */}
        <Card.Img variant="top" src={product.product_image} />
        <Card.Title>{product.product_name}</Card.Title>{" "}
        {/* using Card.Title, Card.Subtitle, Card.Text inside the Card.Body will line them up nicely */}
        <Card.Text>${product.price}</Card.Text>
        <Card.Text>{product.product_description}</Card.Text>
        <Button variant="primary" onClick={() => addToCart(product.product_id)}>Add To Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
