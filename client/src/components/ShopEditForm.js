import React, { useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap';
import './ShopEditForm.css'
import Local from "../helpers/Local.js"
import Popover from 'react-bootstrap/Popover'

const EMPTY_FORM ={
  shop_name:'',
  shop_description:'',
  shop_image:'',
  shop_address:'',
  website:'',
  phone: '',
  shop_email: '',
  donate: 0,
  led_lights: 0,
  small_biz: 0,
  min_biz: 0,
  wo_biz: 0
}

function ShopEditForm(props) {
    const [shopData, setShopData] = useState(props.shop);
    const [files, setFiles] = useState(null);
    /**** NEW ****/
    // const [shopName, setShopName] = useState(null);
    // const [shopAddress, setShopAddress] = useState(null);
    // const [shopDescription, setShopDescription] = useState(null);
    // // do we need img? doesn't exist in front end form    
    // // const [shopImage, setShopImage] = useState(null);
    // const [website, setWebsite] = useState(null);
    // const [phone, setPhone] = useState(null);
    // const [shopEmail, setShopEmail] = useState(null);
    // const [donate, setDonate] = useState(null);
    // const [ledLights, setLedLights] = useState(null);
    // const [smallBiz, setSmallBiz] = useState(null);
    // const [minBiz,setMinBiz] = useState(null);
    // const [woBiz,setWoBiz] = useState(null);

    function handleSubmit (e) {
      e.preventDefault();
      /******** ORIGINAL FORM *********/
      let formData = new FormData();
      formData.append('shop_name', shopData.shop_name);
      formData.append('shop_description', shopData.shop_description);
      formData.append('shop_image', files, files.shop_image);
      formData.append('shop_address', shopData.shop_address);
      formData.append('website', shopData.website);
      formData.append('phone', shopData.phone);
      formData.append('shop_email', shopData.shop_email);
      formData.append('donate', shopData.donate);
      formData.append('led_lights', shopData.led_lights);
      formData.append('small_biz', shopData.small_biz);
      formData.append('min_biz', shopData.min_biz);
      formData.append('wo_biz', shopData.wo_biz);
      console.log("FORMDATA", formData)
      console.log("SHOPDATA", shopData)
      props.editShopCb(shopData, Local.getShopId());
      console.log('Ran editShop function')
      // setFiles(null);
      // e.target.reset();
    }

  function handleFileChange(e) {
    console.log('upload', e.target.files[0])
        setFiles(e.target.files[0]); //is the products refering to products.js routes file?
    }
    
    function handleChange (e){
      let {name, value} = e.target;
      setShopData (data => ({...data, [name]: value}));
  }
      
  // sets value of that field to 1 when checked or 0 if unchecked
  function handleChangeCheck (e) {
    if (e.target.checked) {
     setShopData((data) => ({
           ...data, [e.target.name]:1
       }));
     } else {
       setShopData((data) => ({
         ...data, [e.target.name]:0
     }));
     }
 }



  return (

    <Form className='shop-form' onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label className='shop-name'>
            Shop Name </Form.Label>
            <Form.Control
             type='text'
             name='shop_name'
             value={shopData.shop_name}
             onChange={handleChange}
             />
      </Form.Group>


      <Form.Group className='mb-3'>
        <Form.Label className='shop-description'>
            Shop Description 
        </Form.Label>
            <Form.Control 
             type='textarea'
             name='shop_description'
             value={shopData.shop_description}
             onChange={handleChange}
             />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className='mb-3'>
            <Form.Label className='shop-address'>
                Shop Address
            </Form.Label>
                <Form.Control 
                type='textarea'
                name='shop_address'
                value={shopData.shop_address}
                onChange={handleChange}
                />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className='mb-3'>
            <Form.Label className='website'>
                Website
            </Form.Label>
                <Form.Control 
                type='textarea'
                name='website'
                value={shopData.website}
                onChange={handleChange}
                />
            </Form.Group>
          </Col>
        </Row>

         <Row>
          <Col>
            <Form.Group className='mb-3'>
            <Form.Label className='phone'>
              Phone
            </Form.Label>
                <Form.Control
                type='textarea'
                name='phone'
                value={shopData.phone}
                onChange={handleChange}
                />
            </Form.Group>
          </Col>
        
          <Col>
            <Form.Group className='mb-3'>
            <Form.Label className='shop-email'>
                Email
                </Form.Label> 
                <Form.Control
                type='textarea'
                name='shop_email'
                value={shopData.shop_email}
                onChange={handleChange}
                />
            
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className='mb-3'>
          <Form.Label className='shop-image'>
              Image
          </Form.Label>
          <Form.Control
              type='file'
              name='shop_image'
              onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
            This shop...
            <Form.Check
             label = 'Donates our surplus stock (instead of throwing it away)'
             type='checkbox'
             name='donate'
             value={shopData.donate}
             onChange={handleChangeCheck}
             />

            <Form.Check
             label='Uses LED lighting'
             type='checkbox'
             name='led_lights'
             value={shopData.led_lights}
             onChange={handleChangeCheck}
             />
        
            <Form.Check
             label='Has 10 or fewer employees'
             type='checkbox'
             name='small_biz'
             value={shopData.small_biz}
             onChange={handleChangeCheck}
             />

            <Form.Check
             label='Is owned by someone who is part of a racial or ethnic minority in our country'
             type='checkbox'
             name='min_biz'
             value={shopData.min_biz}
             onChange={handleChangeCheck}
             />
            
            <Form.Check
             label='Is owned by a woman, trangender or nonbinary person'
             type='checkbox'
             name='wo_biz'
             value={shopData.wo_biz}
             onChange={handleChangeCheck}
             />

        </Form.Group>

        <Button type="submit">Submit</Button>
    </Form>


  )
}

export default ShopEditForm;