import { Card, Button, Form, Row, Col } from "react-bootstrap";
// NOTE: See React Bootstrap cards for more info: https://react-bootstrap.github.io/components/cards/

function ProductCard(props) {
  // props.product is the product we are selling
  const product = props.product;

  return (
    <Card>
      <Card.Body> {/* used to pad content inside a <Card> */}
        <Card.Img variant="top" src={product.product_image} />
        <Card.Title>{product.product_name}</Card.Title>{" "}
        {/* using Card.Title, Card.Subtitle, Card.Text inside the Card.Body will line them up nicely */}
        <Card.Text>${product.price}</Card.Text>
        <Button variant="primary">Add To Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
