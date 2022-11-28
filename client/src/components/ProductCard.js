// Video tutorial from: https://www.youtube.com/watch?v=_8M-YVY76O8&ab_channel=TraversyMedia

import { useContext, useEffect, useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
// NOTE: See React Bootstrap cards for more info: https://react-bootstrap.github.io/components/cards/
import CartContext from "../CartContext";
import ProductContext from "../ProductContext";
import "./ProductCard.css";
import PopUpView from "../views/PopUpView";
import { useNavigate } from "react-router-dom"; // BrowserRouter = the overarching router
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function ProductCard(props) {
  const product = props.product; // props.product is the product we are selling, received from parent ShopView (which received it's props.products from parent App)
  const [buttonPopup, setButtonPopup] = useState(false);
  const navigate = useNavigate();

  const { getProductDataCb, getProductReviewsCb, getProductsByShopCb, getShopProfileCb, shopProfile } = useContext(ProductContext);

  let totalProductPoints = (product.recycled + product.no_fridge + product.fair_trade + product.organic + product.local);


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

  const popoverHoverFocusRecycle = (
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lavenderblush', fontWeight:'bolder'}}> 
    Made from recycled items
    </Popover>
  );

  const popoverHoverFocusNoFridge =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lavenderblush', fontWeight:'bolder'}}> 
    No refrigeration required
  </Popover>
  )

  const popoverHoverFocusFairTrade =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lavenderblush', fontWeight:'bolder'}}> 
   Fair-Trade approved
    </Popover>
  )

  const popoverHoverFocusLocal =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lavenderblush', fontWeight:'bolder'}}> 
    This product is made/sourced locally
    </Popover>
  )

  const popoverHoverFocusOrganic =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lavenderblush', fontWeight:'bolder'}}> 
    Organic
    </Popover>
  )

  return (
  
    <Card className="onlineSCard" style={{ width: '26rem', background:'rgba(255, 255, 255, 0.858)'}}>

     {/* used to pad content inside a <Card> */}
        <div className="image">
          <Card.Img title="click for more info" className="pro-card-img" style={{borderRadius:'30px', marginLeft:'9px', padding:'10px'}} src={product.url} />
          <div onClick={() => showPopup(product.product_id)} className="overlay">
            <div className="text" style={{fontWeight:'bolder'}}>
              Click for more product info & product reviews
            </div>

          </div>
        </div>
        <Card.Title className="shopTitle" >{product.product_name}</Card.Title>
        {/* using Card.Title, Card.Subtitle, Card.Text inside the Card.Body will line them up nicely */}
        <div className="checkimgs">
        <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="top"
              overlay={popoverHoverFocusRecycle}>  
          <img style={{width:'70px'}} src={product.recycled===1?"https://img.icons8.com/bubbles/100/null/recycle-sign.png":" "}/>     
        </OverlayTrigger> 
        <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="top"
              overlay={popoverHoverFocusNoFridge}> 
          <img style={{width:'70px'}} src={product.no_fridge===1?"https://img.icons8.com/bubbles/100/null/greenhouse-effect.png":""}/>
        </OverlayTrigger>
        <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="top"
              overlay={popoverHoverFocusFairTrade}>          
          <img style={{width:'70px'}} src={product.fair_trade===1?"https://img.icons8.com/bubbles/100/000000/certificate.png":""}/>
        </OverlayTrigger>
        <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="top"
              overlay={popoverHoverFocusLocal}>  
          <img style={{width:'70px'}} src={product.local===1?"https://img.icons8.com/bubbles/100/null/shop-local--v1.png":""}/>
              </OverlayTrigger>
        <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="top"
              overlay={popoverHoverFocusOrganic}>  
              <img style={{width:'70px'}} src={product.organic===1?"https://img.icons8.com/bubbles/100/000000/sprout.png":""}/>
              </OverlayTrigger> 
       
        
</div>
        <Card.Text className="shopText"><a onClick={() => navigateShop(product.shop_id)}>from <i className="shopname">{product && product.shop_name || shopProfile && shopProfile.shop_name}</i></a> <br></br><h5 style={{marginTop:'15px'}}>{product.product_description}</h5></Card.Text>
        <Card.Text className="shopText"><i>{totalProductPoints} point(s) rewarded</i><br></br><b>${(product.price).toFixed(2)}</b></Card.Text>

       
        { find ? 
        <>
        <Form as={Row}>
          {/* find is declared above to identify exact product in cartProducts, and within cartProducts there is the quantity property*/}
          <Form.Label column="true" sm="6">In Cart: {find.quantity} </Form.Label>
          <Col sm="6">
            <Button sm="6" style={{margin:'5px', fontWeight:'900', backgroundColor:'rgba(101, 212, 172, 0.884'}} onClick={() => handleClick(product.product_id)} className="mx-2">+</Button>
            <Button style={{margin:'5px', width:'37px', fontWeight:'900', backgroundColor:'rgba(101, 212, 172, 0.884'}} sm="6" onClick={() => handleClickRemove(product.product_id)} className="mx-2">-</Button>
          </Col>
        </Form>
        <Button variant="danger" onClick={() => handleClickDelete(product.product_id)} className="mx-2">Remove from cart</Button>
        </>
        : 
        <Button className='buybtn' disabled={!user} variant="primary" onClick={() => handleClick(product.product_id)}>Add To Cart</Button>
        }
      

      

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
