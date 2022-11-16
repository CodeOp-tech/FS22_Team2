import React, {useState} from 'react'
import './SellerList.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


function SellerList(props) {
  return (
    <div className='sell-list'>
      {props.productsData?.map (p => ( // why does this work with the ?
      <Card key={p.id}
            style={{width: '15rem'}}>
            <Card.Img variant='top' src={p.url}/>
            <Card.Body>
             <Card.Title>
                {p.product_name}
            </Card.Title>
            <Card.Text>
                {p.product_description}
            </Card.Text>
                <button className='delete-p'  type='button'>Delete</button>
                <button className='edit-p'  type='button'>Edit</button>
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

export default SellerList