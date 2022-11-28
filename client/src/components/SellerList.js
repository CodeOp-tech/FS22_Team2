
import React, {useState, useEffect} from 'react'
import './SellerList.css'
import { Card, Col, Row, Button, ButtonToolbar } from 'react-bootstrap';
import EditProduct from './EditProduct';
import Local from '../helpers/Local';
import EdiText from 'react-editext'
import { FaPencilAlt } from 'react-icons/fa'
import {TiTickOutline} from 'react-icons/ti'
import {MdOutlineCancel} from 'react-icons/md'

function SellerList(props) {
const [show, setShow] = useState(false) //state to show Modal
const [editProductItem, setEditProductItem] = useState(null)
const onSave = val => {
  console.log('Edited Value -> ', val)
}

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
              <Card.Img variant='bottom' src={p.url} style={{objectFit: 'cover', height:'150px', marginBottom:'10px', width: '200px', marginTop:'20px', marginLeft:'20px'}}/>
                <Button style={{backgroundColor:'indianred'}} className='probtn' onClick={(e) => props.deleteProductCb(p.shop_id, p.product_id)} >Delete</Button>
                <Button style={{backgroundColor:'#00AAC3'}} className='probtn'onClick={(e) => handleShow(p.product_id)}>Edit</Button>
            </Col>
            <Col>
              <Card.Title className='proTitle' style={{fontWeight:'bold', padding:'4px', textTransform:'capitalize', backgroundColor: 'rgba(248, 95, 24, 0.393)', borderRadius:'10px', marginTop:'20px', marginRight:'20px'
                }}>
              <EdiText 
                  editButtonContent={<FaPencilAlt/>}
                  saveButtonContent={<TiTickOutline/>}
                  cancelButtonContent={<MdOutlineCancel/>}
                  editButtonClassName="custom-edit-button"
                  saveButtonClassName="custom-save-button"
                  cancelButtonClassName="custom-cancel-button"
                  type='text'
                  value={p.product_name}
                  onSave={onSave}
                />
              </Card.Title>
              <Card.Text className='proText' style={{padding:'10px' }}>
                <h6>Description:</h6>
              <EdiText                 
                  editButtonContent={<FaPencilAlt/>}
                  saveButtonContent={<TiTickOutline/>}
                  cancelButtonContent={<MdOutlineCancel/>}
                  editButtonClassName="custom-edit-button"
                  saveButtonClassName="custom-save-button"
                  cancelButtonClassName="custom-cancel-button"
                  type='text'
                  value= {p.product_description}
                  onSave={onSave}
                />
                {p.recycled === 1}
              </Card.Text > 
              <Card.Text className='proText' style={{padding:'10px' }}>
               Points: {p.recycled + p.no_fridge + p.fair_trade + p.local + p.organic} 
              </Card.Text >            
              <Row> 
                <Col> 
                  <Card.Text className='proText'  style={{padding:'5px', marginBottom:'20px' }}>
                    ${(p.price).toFixed(2)}
                    
                  </Card.Text>
                </Col>      
                <Col>
                  <Card.Text className='proText' style={{padding:'5px' }}>
                    Qty: {p.product_quantity}
                  </Card.Text>
                </Col>                
              </Row>                  
            </Col>
          </Row>
      </Card>
    ))} 
        {show && (
        <EditProduct     
            show={show}
            onHide={handleClose}
            editProductItem={editProductItem}
            editProductCb={(id, formData)=>handleEditSubmit(id, formData)} 
          />
        )}
    </div>
  );
}

export default SellerList;
