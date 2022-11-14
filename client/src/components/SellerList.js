import React, {useState} from 'react'
import './SellerList.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function SellerList(props) {
  return (
    <div className='sell-list'>
      {/* {props.productData.map (p => (
      <Card style={{width: '15rem'}}
            key={p.id}>
            <Card.Img variant='top' src='{p.product_image}'/>
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
                   
        ))} */}
       
      <Card>
            <Card.Img variant='top' src='https://static.vecteezy.com/system/resources/previews/003/806/865/original/avocado-illustration-with-a-cute-and-adorable-face-vector.jpg'/>
            <Card.Body>
             <Card.Title>
                Product Name
            </Card.Title>
            <Card.Text>
                Product Description
            </Card.Text>
                <Button className='delete-p'  type='button'>Delete</Button>
                <Button className='edit-p'  type='button'>Edit</Button>
            </Card.Body>  
        </Card>
    </div>
  )
}

export default SellerList