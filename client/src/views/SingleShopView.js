import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import ProductContext from "../ProductContext";
import Sort from "../components/Sort";
import peace from "../DC/peace.png";
import charity from "../DC/charity.png";
import family from "../DC/family.png";
import idea from "../DC/idea.png";
import onlineshopping from "../DC/onlineshopping.png"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


function ShopView(props) {
  const { searchedByShop, shopProfile } = useContext(ProductContext);

  
  const popoverHoverFocusDonate = (
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'#EDE4F7'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'E6E6FA'}}>{"Do you donate your surplus stock (instead of throwing it away)?"}</Popover.Header>
    If your store has surplus stock that you cannot sell, you donate it to local organizations or individuals in need, rather than throwing it away.
    </Popover>
  );

  const popoverHoverFocusLEDlights =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'#EDE4F7'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'E6E6FA'}}>{"Does your shop use all-LED lighting?"}</Popover.Header>
    Your business uses 80% or more LED lighting. If you're not sure what kind of bulbs you have, you can look to see if they are labeled "LED" (as opposed to "halogen", "incandescent", etc.). If they are not labeled by type, it will show the wattage - generally, anything under 10 watts will be LED. LEDs conserve a lot of energy, and may save you on energy costs in the long run. If you don't have LEDs and are interested in buying them.</Popover>
  )

  const popoverHoverFocusSmallBiz =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'#E6E6FA'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'#EDE4F7'}}>{"Do you have 10 or fewer employees? "}</Popover.Header>
    The European Comission defines a "micro-business" as having 10 or fewer total employees. Small businesses can help boost local economies, and typically have less resources than larger businesses. </Popover>
  )

  const popoverHoverFocusMinBiz=(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'#EDE4F7'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'E6E6FA'}}>{"Is your shop owned by someone who is part of a racial or ethnic minority in your country?"}</Popover.Header>
    Minority-owned business make big contributions to local economies but often face more discrimination. </Popover>
  )

  const popoverHoverFocusWoBiz =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'#EDE4F7'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'E6E6FA'}}>{"Is your shop owned by a woman, trangender or nonbinary person?"}</Popover.Header>
    Women+-owned business make big contributions to local economies but often face more discrimination. </Popover>
  )

  return (
    <>
      <h1 style={{textAlign:'center', color:'white', fontStyle:'oblique', fontWeight:'bolder'}}>Welcome to {shopProfile.shop_name}</h1> 

      <img style={{marginLeft:'350px', border:'solid', borderStyle:'double', borderColor:'white', borderRadius:'30px'}} src={shopProfile.shop_image}></img>
      <div style={{width:'800px', marginLeft:'250px', marginTop: '30px', fontWeight:'bold', color:'white'}}>
      <h3 style={{textAlign:'center'}}>{shopProfile.shop_description}</h3>
      </div>
      <div style={{width:'800px', marginLeft:'250px', marginTop: '30px', fontWeight:'bold', color:'white', textAlign:'center'}}>
      <p>Address: {shopProfile.shop_address}</p>
      <p>Website: {shopProfile.website}</p>
      <p>Email: {shopProfile.shop_email}</p> 
      </div>
      <div style={{ margin:'auto', width:'60%', padding:'10px',border:'none', marginBottom: '30px'}}>
      <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="left"
              overlay={popoverHoverFocusMinBiz}>  
          <img style={{width:'150px'}} src={shopProfile.min_biz===1?(peace):" "}/>     
        </OverlayTrigger> 
      <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="top"
              overlay={popoverHoverFocusDonate}>  
          <img style={{width:'150px'}} src={shopProfile.donate===1?(charity):" "}/>     
        </OverlayTrigger> 
      <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocusSmallBiz}>  
          <img style={{width:'150px'}} src={shopProfile.small_biz===1?(family):" "}/>     
        </OverlayTrigger> 
      <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="top"
              overlay={popoverHoverFocusLEDlights}>  
          <img style={{width:'150px'}} src={shopProfile.led_lights===1?(idea):" "}/>     
        </OverlayTrigger> 
      <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={popoverHoverFocusWoBiz}>  
          <img style={{width:'150px'}} src={shopProfile.wo_biz===1?(onlineshopping):" "}/>     
        </OverlayTrigger> 
        </div>
   
    
    
     
    

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