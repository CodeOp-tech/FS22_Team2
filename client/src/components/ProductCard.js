// Video tutorial from: https://www.youtube.com/watch?v=_8M-YVY76O8&ab_channel=TraversyMedia

import { useContext, useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
// NOTE: See React Bootstrap cards for more info: https://react-bootstrap.github.io/components/cards/
import CartContext from "../CartContext";
import ProductContext from "../ProductContext";
import "./ProductCard.css";

function ProductCard(props) {
  const product = props.product; // props.product is the product we are selling, received from parent ShopView (which received it's props.products from parent App)

  const { getProductDataCb } = useContext(ProductContext);

  const { cartProducts,
    getProductQuantityCb,
    addOneToCartCb,
    removeOneFromCartCb,
    deleteFromCartCb } = useContext(CartContext);

    function handleClick(id) {
      getProductQuantityCb(id);
      addOneToCartCb(id); 
      console.log(cartProducts);
      getProductDataCb(id);
    }

    function handleClickRemove(id) {
      removeOneFromCartCb(id);
      console.log(cartProducts);
    }

    function handleClickDelete(id) {
      deleteFromCartCb(id);
      console.log(cartProducts);
    }

let find = cartProducts.find(e => e.id === product.product_id);
  
  return (
    <Card>
      <Card.Body> {/* used to pad content inside a <Card> */}
        <div className="image">
          <Card.Img title="click for more info" className="img" variant="top" src={product.url} />
          <div className="overlay">
            <div className="text">
              Click on image to see more product info
            </div>
          </div>
        </div>
        <Card.Title>{product.product_name}</Card.Title>{" "}
        {/* using Card.Title, Card.Subtitle, Card.Text inside the Card.Body will line them up nicely */}
        <Card.Text>${product.price}</Card.Text>
        <Card.Text>{product.product_description}</Card.Text>
        
        { find ? 
        <>
        <Form as={Row}>
          {/* find is declared above to identify exact product in cartProducts, and within cartProducts there is the quantity property*/}
          <Form.Label column="true" sm="6">In Cart: {find.quantity} </Form.Label>
          <Col sm="6">
            <Button sm="6" onClick={() => handleClick(product.product_id)} className="mx-2">+</Button>
            <Button sm="6" onClick={() => handleClickRemove(product.product_id)} className="mx-2">-</Button>
          </Col>
        </Form>
        <Button variant="danger" onClick={() => handleClickDelete(product.product_id)} className="mx-2">Remove from cart</Button>
        </>
        :
        <Button variant="primary" onClick={() => handleClick(product.product_id)}>Add To Cart</Button>
        }
        
        
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
