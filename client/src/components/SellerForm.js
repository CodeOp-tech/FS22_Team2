import React, { useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap';
import './SellerForm.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {TbInfoCircle}  from 'react-icons/tb';


const EMPTY_FORM ={
    product_name:'',
    product_image:'',
    price:'',
    product_description:'',
    product_quantity:'',
    recycled: 0,
    no_fridge: 0,
    fair_trade: 0,
    local: 0,
    organic: 0
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
        formData.append('recycled', productData.recycled);
        formData.append('no_fridge', productData.no_fridge);
        formData.append('fair_trade', productData.fair_trade);
        formData.append('local', productData.local);
        formData.append('organic', productData.organic);
        // logs [object formData], but data gets uploaded correctly
        // console.log(`product form: ${formData}`);
        props.addProductCb(formData); //Getting from the SellerDash
        props.showProducts(); //Getting from the SellerDash
        setProductData(EMPTY_FORM);
        setFiles(null);
        e.target.reset();
        
      }

  function handleFileChange(e) {
        setFiles(e.target.files[0]); //is the products refering to products.js routes file?
    }
    
      function handleChange (e){
        let {name, value} = e.target;
        setProductData (data => ({...data, [name]: value}));
    }
      
    // sets value of that field to 1 when checked or 0 if unchecked
    function handleChangeCheck (e) {
      if (e.target.checked) {
       setProductData((data) => ({
             ...data, [e.target.name]:1
         }));
       } else {
         setProductData((data) => ({
           ...data, [e.target.name]:0
       }));
       }
   }

  



   const popoverHoverFocusRecycle = (
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lightcyan'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'teal'}}>{"Made from recycled items? Popover"}</Popover.Header>
      Products that are made from recyled materials will usually advertise this on the label. Look for a label that says "this product is made from __% recycled paper", or something similar. If the product states that it's made from recycled materials (or if you made this product from recycled materials), check this box. If not or if unknown, leave blank.
    </Popover>
  );

  const popoverHoverFocusNoFridge =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lightcyan'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'teal'}}>{"Is this product stored at room temperature? (i.e. Does it NOT require heating or refrigeration?)"}</Popover.Header>
    If you don't need to refrigerate this product, check this box! If this product needs to be refrigerated, leave blank.    </Popover>
  )

  const popoverHoverFocusFairTrade =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lightcyan'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'teal'}}>{"Is this product fair-trade? "}</Popover.Header>
     Is this product fair trade certified? It should have a label that says "fair trade" (it might look like this or this). If you see one of these labels - great, check the box! If not or if unknown, leave blank.    </Popover>
  )

  const popoverHoverFocusLocal =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lightcyan'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'teal'}}>{"Was is this product locally sourced?"}</Popover.Header>
    If this item was made in your country, check the box! It should have a label "Made in [country]" somewhere on the packaging. If not or if unknown, leave blank.    </Popover>
  )

  const popoverHoverFocusOrganic =(
    <Popover id="popover-trigger-hover-focus" style={{padding: '10px', backgroundColor:'lightcyan'}}> 
    <Popover.Header as="h5" style={{backgroundColor:'teal'}}>{"Is this product organic?"}</Popover.Header>
    Is this product certified organic? It should have a label that says "organic" (it might look like this or this). If you see one of these labels - great, check the box! If not or if unknown, leave blank.    </Popover>
  )


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
            This product is... <br></br>
       
          <Form.Group  style={{display:'-webkit-flex'}}>      
            <Form.Check 
            //  style={{display:'inline-block'}}
             label = 'Made from recycled materials'
             type='checkbox'
             name='recycled'
             value={productData.recycled}
             onChange={handleChangeCheck}
             />
             
             <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={popoverHoverFocusRecycle}>  
              <button style={{border:'none', background:'none' }}><TbInfoCircle/></button>
              </OverlayTrigger> 
          </Form.Group>
          <Form.Group  style={{display:'-webkit-flex'}}>
            <Form.Check
            //  style={{display:'inline-block'}}
             label='Does not require refrigeration'
             type='checkbox'
             name='no_fridge'
             value={productData.no_fridge}
             onChange={handleChangeCheck}
             />
             <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={popoverHoverFocusNoFridge}>  
              <button style={{border:'none', background:'none' }}><TbInfoCircle/></button>
              </OverlayTrigger>
          </Form.Group> 
          <Form.Group  style={{display:'-webkit-flex'}}>
            <Form.Check
            //  style={{display:'inline-block'}}
             label='Is fair trade'
             type='checkbox'
             name='fair_trade'
             value={productData.fair_trade}
             onChange={handleChangeCheck}
             />
             <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={popoverHoverFocusFairTrade}>  
              <button style={{border:'none', background:'none' }}><TbInfoCircle/></button>
              </OverlayTrigger>
            </Form.Group> 
          <Form.Group  style={{display:'-webkit-flex'}}>            
            <Form.Check
            //  style={{display:'inline-block'}}
             label='Is locally sourced'
             type='checkbox'
             name='local'
             value={productData.local}
             onChange={handleChangeCheck}
             />
             <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={popoverHoverFocusLocal}>  
              <button style={{border:'none', background:'none' }}><TbInfoCircle/></button>
              </OverlayTrigger>
              </Form.Group> 
          <Form.Group  style={{display:'-webkit-flex'}}>
            <Form.Check
             label='Is organic'
             type='checkbox'
             name='organic'
             value={productData.organic}
             onChange={handleChangeCheck}
             />
             <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={popoverHoverFocusOrganic}>  
              <button style={{border:'none', background:'none' }}><TbInfoCircle/></button>
              </OverlayTrigger> 
</Form.Group>
        </Form.Group>
        <Button type="submit">Submit</Button>
    </Form>
  )
}

export default SellerForm;