import React, {useState, useEffect} from 'react'
import './SellerList.css'
import {Card, Row, Col, Button} from 'react-bootstrap'



function SellerList(props) {
// const [isEdit, setIsEdit] = useState(false)

// function handleToggleEdit(){
//     setIsEdit(!isEdit)

return (
    <div className='sell-list'>
      {props.productsData?.map (p => ( // why does this work with the ?
      <Card key={p.product_id}
            style={{width: '15rem'}}>
            <Card.Img variant='top' src={p.url}/>
            <Card.Body>
             <Card.Title>
                {p.product_name}
            </Card.Title>
            <Card.Text>
                {p.product_description}
            </Card.Text>
            <Row>
                <Col>
                  <Card.Text>
                    £{p.price}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    Qty: {p.product_quantity}
                  </Card.Text>
                </Col>
            </Row>
            
                <Button className='delete-p' onClick={(e) => props.deleteProductCb(p.product_id)} >Delete</Button>
                <Button className='edit-p'>Edit</Button>
            </Card.Body>  
        </Card>
                   
        ))}
      {/* <Card>
        <Card.Body>
            <Card.Img variant='top'  src='https://cdn.shopify.com/s/files/1/0277/6262/2567/products/medium-chubby-hoop-earrings-earrings-missoma-18ct-gold-plated-817200_600x.jpg?v=1638046361'/>
            <Card.Title>
                Product Name
            </Card.Title>
            <Card.Text>
                Product Description
            </Card.Text>
                <Button className='delete-p'  type='button'>Delete</Button>
                <Button className='edit-p'  type='button'>Edit</Button>
            </Card.Body>  
        </Card> */}

        
    </div>
  )
}

export default SellerList;