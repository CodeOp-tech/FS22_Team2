import React, { useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap';
import './SellerForm.css'


const EMPTY_FORM ={
    product_name:'',
    product_image:'',
    price:'',
    product_description:'',
    product_quantity:'',
    recycled: '',
    no_fridge: '',
    fair_trade: '',
    local: '',
    organic: ''
}

function SellerForm(props) {
    const [productData, setProductData] = useState(EMPTY_FORM);
    const [files, setFiles] = useState(null)

      function handleSubmit (e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append('product_name', productData.product_name);
        formData.append('productimg', files, files.name);
        formData.append('price', productData.price);
        formData.append('product_description', productData.product_description);
        formData.append('product_quantity', productData.product_quantity);
        console.log(formData)
        props.addProductCb(formData);

        setProductData(EMPTY_FORM);
        setFiles(null);
        e.target.reset();
      }

  function handleFileChange(e) {
    console.log('upload', e.target.files[0])
        setFiles(e.target.files[0]); //is the products refering to products.js routes file?
    }
    
      function handleChange (e){
        let {name, value} = e.target;
        setProductData (data => ({...data, [name]: value}));
    }
      

      function handleChangeCheck (e) {
        let checkbox = e.target.checked;

        setProductData((data) => ({
            ...data, [e.target.name]:checkbox
        }));
      }


  return (

    <Form className='seller-form' onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label className='product-name'>
            Product Name </Form.Label>
            <Form.Control
             type='text'
             name='product_name'
             value={productData.product_name}
             onChange={handleChange}
             />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label className='product-name'>
            Product Description 
        </Form.Label>
            <Form.Control 
             type='textarea'
             name='product_description'
             value={productData.product_description}
             onChange={handleChange}
             />
        </Form.Group>
         <Row>
           <Col>
        <Form.Group className='mb-3'>
        <Form.Label className='price'>
            Price
        </Form.Label>
            <Form.Control
             type='number'
             name='price'
             value={productData.price}
             onChange={handleChange}
             />
        </Form.Group>
         </Col>
         <Col>
        <Form.Group className='mb-3'>
        <Form.Label className='product-quantity'>
            Quantity
            </Form.Label> 
            <Form.Control
             type='number'
             name='product_quantity'
             value={productData.product_quantity}
             onChange={handleChange}
             />
        
        </Form.Group>
        </Col>
        </Row>
        <Form.Group className='mb-3'>
        <Form.Label className='product-image'>
            Image</Form.Label>
            <Form.Control
             type='file'
             name='product_image'
             onChange={handleFileChange}
             />
        </Form.Group>
        <Form.Group className='mb-3'>
            This product is...
            <Form.Check
             label = 'Made from recycled materials'
             type='checkbox'
             name='recycled'
             value={productData.recycled}
             onChange={handleChangeCheck}
             />
        
            <Form.Check
             label='Does not require refrigeration '
             type='checkbox'
             name='no_fridge'
             value={productData.no_fridge}
             onChange={handleChangeCheck}
             />
        
            <Form.Check
             label='Fairtrade'
             type='checkbox'
             name='fair_trade'
             value={productData.fair_trade}
             onChange={handleChangeCheck}
             />
             
            <Form.Check
             label='Locally Sourced'
             type='checkbox'
             name='local'
             value={productData.local}
             onChange={handleChangeCheck}
             />
            
            <Form.Check
             label='Organic'
             type='checkbox'
             name='organic'
             value={productData.organic}
             onChange={handleChangeCheck}
             />

        </Form.Group>
        <Button type="submit">Submit</Button>
    </Form>


  )
}

export default SellerForm