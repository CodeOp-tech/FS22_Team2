// Video tutorial from: https://www.youtube.com/watch?v=_8M-YVY76O8&ab_channel=TraversyMedia

import { useContext, useEffect, useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
// NOTE: See React Bootstrap cards for more info: https://react-bootstrap.github.io/components/cards/
import CartContext from "../CartContext";
import ProductContext from "../ProductContext";
import "./ProductCard.css";
import PopUpView from "../views/PopUpView";
import { useNavigate } from "react-router-dom"; // BrowserRouter = the overarching router

function ProductCard(props) {
  const product = props.product; // props.product is the product we are selling, received from parent ShopView (which received it's props.products from parent App)
  const [buttonPopup, setButtonPopup] = useState(false);
  const navigate = useNavigate();

  const { getProductDataCb, getProductReviewsCb, getProductsByShopCb, getShopProfileCb, shopProfile } = useContext(ProductContext);


  const { user,

    cartProducts,
    getProductQuantityCb,
    addOneToCartCb,
    removeOneFromCartCb,
    deleteFromCartCb,
  } = useContext(CartContext);

  useEffect(() => {
    showPopup();
    removePopup();
  }, []);

  function handleClick(id) {
    // id is received from onClick function below, product.product_id (product = props.product, see above)
    getProductQuantityCb(id);
    addOneToCartCb(id);
    console.log(cartProducts);
    getProductDataCb(id); // getProductDataCb called, to provide access to product properties to display product name, price & description below
  }

  function handleClickRemove(id) {
    // id is received from onClick function below, product.product_id (product = props.product, see above)
    removeOneFromCartCb(id);
    console.log(cartProducts);
  }

  function handleClickDelete(id) {
    // id is received from onClick function below, product.product_id (product = props.product, see above)
    deleteFromCartCb(id);
    console.log(cartProducts);
  }


    function showPopup(id) { // product_id from (props.product.product_id) passed to getProductReviewsCb function below
      setButtonPopup(true);
      getProductReviewsCb(id); // call getProductReviews function in App
    }

    function removePopup() {
      setButtonPopup(false);
    }

    function navigateShop(shop_id) {
      getProductsByShopCb(shop_id);
      getShopProfileCb(shop_id);
      navigate('/shop')
    }


  let find = cartProducts.find((e) => e.id === product.product_id);

  return (
    <Card>

      <Card.Body> {/* used to pad content inside a <Card> */}
        <div className="image">
          <Card.Img title="click for more info" className="img" variant="top" src={product.url} />
          <div onClick={() => showPopup(product.product_id)} className="overlay">
            <div className="text">
              Click for more product info & product reviews
            </div>

          </div>
        </div>
        <Card.Title>{product.product_name}</Card.Title>{" "}
        {/* using Card.Title, Card.Subtitle, Card.Text inside the Card.Body will line them up nicely */}
        <Card.Text><a onClick={() => navigateShop(product.shop_id)}>from <i>{product && product.shop_name || shopProfile && shopProfile.shop_name}</i></a></Card.Text>
        <Card.Text><i>{product.total_product_points} point(s) rewarded</i></Card.Text>
        <Card.Text><b>${product.price}</b></Card.Text>
        {/* <Card.Text>{product.product_description}</Card.Text> */}

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

      {/* Pass product via props to child Popup*/}
      <PopUpView
        trigger={buttonPopup}
        setTriggerCb={removePopup}
        product={product}
      />

     
    </Card>
  );
}

export default ProductCard;
