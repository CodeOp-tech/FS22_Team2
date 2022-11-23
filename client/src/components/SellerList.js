
import React, {useState, useEffect} from 'react'
import './SellerList.css'
import { Card, Col, Row, Button, ButtonToolbar } from 'react-bootstrap';
import EditProduct from './EditProduct';
import Local from '../helpers/Local';


function SellerList(props) {
const [show, setShow] = useState(false) //state to show Modal
const [editProductItem, setEditProductItem] = useState(null)


const handleClose = () => setShow(false); //to close Modal


function handleShow(id) {
  let product = props.productsData.find(p => p.product_id === id)
  setEditProductItem(product)
  setShow(true);
 } //to show Modal

 function handleEditSubmit(shop_id, product_id, formData){
 setShow(false);
 props.editProductCb(shop_id, product_id, formData)
 }
 



return (
    <div className='sell-list'>
            {props.productsData?.map (p => ( 
        <Card className='productCard' key={p.product_id}
            style={{width:'auto'}}>

              <Row>
                <Col>
                  <Card.Img 
                    variant='bottom' 
                    src={p.url} 
                    style={{objectFit: 'cover', height:'150px', marginBottom:'10px', width: '180px'}}/>
              <Button 
                className='probtn' 
                 onClick={(e) => props.deleteProductCb(p.shop_id, p.product_id)} >Delete</Button>
              <Button className='probtn'onClick={(e) => handleShow(p.product_id)}>Edit</Button>
              </Col>
              <Col>
             <Card.Title className='proTitle' style={{fontWeight:'bold', padding:'4px', textTransform:'capitalize' }}>
              {p.product_name}
              </Card.Title>
              <Card.Text className="proText" style={{ padding: "10px" }}>
                {p.product_description}

            </Card.Text > 
            <Card.Text className='proText' style={{padding:'10px', }}>
                {p.recycled + p.no_fridge + p.fair_trade + p.local + p.organic} 
            </Card.Text >
            
            <Row> 
              <Col> 
              <Card.Text className='proText'  style={{padding:'5px', }}>
                  £{p.price}
                </Card.Text>
              </Col>      
              <Col>
                <Card.Text className='proText' style={{padding:'5px', }}>
                  Qty: {p.product_quantity}
                </Card.Text>
              </Col>                
            </Row>  
              
          </Col></Row>

        </Card>
                   
        ))} 
        {show && (
        <EditProduct     show={show}
                         onHide={handleClose}
                         editProductItem={editProductItem}
                         editProductCb={(shop_id, product_id, formData)=>handleEditSubmit(shop_id, product_id, formData)} 
                        //  product_id={p.product_id}
                        //  product_name={p.product_name}
                />
        )}
    </div>
  );
}

export default SellerList;
