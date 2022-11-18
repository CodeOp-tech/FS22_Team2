import React, { useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap';
import './SellerForm.css'

const EMPTY_FORM ={
    product_name:'',
    product_image:'',
    price:'',
    product_description:'',
    product_quantity:'',
    checklist1: '',
    checklist2: '',
    checklist3: '',
    checklist4: '',
    checklist5: ''
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
             label = 'Recyclable'
             type='checkbox'
             name='checklist1'
             value={productData.checklist1}
             onChange={handleChangeCheck}
             />
        
            <Form.Check
             label='Made from recycled products'
             type='checkbox'
             name='checklist2'
             value={productData.checklist2}
             onChange={handleChangeCheck}
             />
        
            <Form.Check
             label='Locally Sourced'
             type='checkbox'
             name='checklist3'
             value={productData.checklist3}
             onChange={handleChangeCheck}
             />
             
            <Form.Check
             label='Has no toxic materials'
             type='checkbox'
             name='checklist4'
             value={productData.checklist4}
             onChange={handleChangeCheck}
             />
            
            <Form.Check
             label='Fairtrade'
             type='checkbox'
             name='checklist5'
             value={productData.checklist5}
             onChange={handleChangeCheck}
             />

        </Form.Group>
        <Button type="submit">Submit</Button>
    </Form>


  )
}

export default SellerForm