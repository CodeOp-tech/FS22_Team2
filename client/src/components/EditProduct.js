import React, {useState} from 'react'
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import './SellerForm.css'

// const EMPTY_FORM ={
//         product_name:'',
//         product_image:'',
//         price:'',
//         product_description:'',
//         product_quantity:'',
//         recycled: '',
//         no_fridge: '',
//         fair_trade: '',
//         local: '',
//         organic: ''
//     }

function EditProduct(props) {
    const [editProductData, setEditProductData] = useState(props.editProductItem);
    const [editFile, setEditFile] = useState(null)
    
    function handleEditSubmit (e) {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append('product_name', editProductData.product_name);
        formData.append('productimg', editFile, editFile.name);
        formData.append('price', editProductData.price);
        formData.append('product_description', editProductData.product_description);
        formData.append('product_quantity', editProductData.product_quantity);

        console.log('this is a test', formData, editProductData.product_id)

        props.editProductCb(editProductData.product_id, formData);

    }
    
      function handleEditFileChange(e) {
        console.log('upload', e.target.files[0])
            setEditFile(e.target.files[0]); //is the products refering to products.js routes file?
        }
        
          function handleEditChange (e){
            let {name, value} = e.target;
            setEditProductData (data => ({...data, [name]: value}));
        }
          
    
          function handleEditChangeCheck (e) {
            let checkbox = e.target.checked;
    
            setEditProductData((data) => ({
                ...data, [e.target.name]:checkbox
            }));
          }

    // if(!editProductData){
    //   return <h2>loading</h2>
    // }


  return (
     <div>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className='seller-form' onSubmit={handleEditSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label className='product-name'>
            Product Name </Form.Label>
            <Form.Control
             type='text'
             name='product_name'
             defaultValue={editProductData.product_name}
             onChange={handleEditChange}
             />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label className='product-name'>
            Product Description 
        </Form.Label>
            <Form.Control 
             type='textarea'
             name='product_description'
             defaultValue={editProductData.product_description}
             onChange={handleEditChange}
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
             defaultValue={editProductData.price}
             onChange={handleEditChange}
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
             defaultValue={editProductData.product_quantity}
             onChange={handleEditChange}
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
             onChange={handleEditFileChange}
             />
        </Form.Group>
        <Form.Group className='mb-3'>
            This product is...
            <Form.Check
             label = 'Made from recycled materials'
             type='checkbox'
             name='recycled'
             defaultValue={editProductData.recycled}
             onChange={handleEditChangeCheck}
             />
        
            <Form.Check
             label='Does not require rifrigeration '
             type='checkbox'
             name='no_fridge'
             defaultValue={editProductData.no_fridge}
             onChange={handleEditChangeCheck}
             />
        
            <Form.Check
             label='Fairtrade'
             type='checkbox'
             name='fair_trade'
             defaultValue={editProductData.fair_trade}
             onChange={handleEditChangeCheck}
             />
             
            <Form.Check
             label='Locally Sourced'
             type='checkbox'
             name='local'
             defaultValue={editProductData.local}
             onChange={handleEditChangeCheck}
             />
            
            <Form.Check
             label='Organic'
             type='checkbox'
             name='organic'
             defaultValue={editProductData.organic}
             onChange={handleEditChangeCheck}
             />

        </Form.Group>
        
    </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={props.editProductCb}>Update</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
     </div>
  )
}

export default EditProduct