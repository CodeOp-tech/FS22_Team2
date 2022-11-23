import React, {useState} from 'react'
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import './SellerForm.css'
import Local from '../helpers/Local';



function EditProduct(props) {
    const [editProductData, setEditProductData] = useState(props.editProductItem);
    const [editFile, setEditFile] = useState(null)
    
    function handleEditSubmit (e) {
      e.preventDefault();
    
      let formData = new FormData();
        formData.append('product_name', editProductData.product_name);
        // formData.append('productimg', editFile, editFile.name)
        formData.append('price', editProductData.price);
        formData.append('product_description', editProductData.product_description);
        formData.append('product_quantity', editProductData.product_quantity);
        formData.append('recycled', editProductData.recycled);
        formData.append('no_fridge', editProductData.no_fridge);
        formData.append('fair_trade', editProductData.fair_trade);
        formData.append('local', editProductData.local);
        formData.append('organic', editProductData.organic);
        formData.append('shop_id', editProductData.shop_id);
        console.log('this is a test', editProductData, formData, editProductData.product_id);
        console.log('check formData', formData)


        props.editProductCb( editProductData.product_id, formData );
        // props.editProductCb( editProductData.product_id, editProductData );

    }
    
      // function handleEditFileChange(e) {
      //   console.log('upload', e.target.files[0])
      //       setEditFile(e.target.files[0]); 
      //   }
        
    function handleEditChange (e){
        let {name, value} = e.target;
        setEditProductData (data => ({...data, [name]: value}));
    }
          
    
          // function handleEditChangeCheck (e) {
          //   let checkbox = e.target.checked;
    
          //   setEditProductData((data) => ({
          //       ...data, [e.target.name]:checkbox
          //   }));
          // }
    function handleEditChangeCheck(e) {
        if (e.target.checked) {
          setEditProductData((data) => ({
              ...data, [e.target.name]:1
                }));
      } else {
          setEditProductData((data) => ({
              ...data, [e.target.name]:0
        }));
      }
    }

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
             value={editProductData.product_name}
             onChange={handleEditChange}
             />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label className='product_description'>
            Product Description 
        </Form.Label>
            <Form.Control 
             as="textarea"
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
        {/* <Form.Group className='mb-3'>
        <Form.Label className='product-image'>
            Image</Form.Label>
            <Form.Control
             type='file'
             name='product_image'
             onChange={handleEditFileChange}
             />
        </Form.Group> */}
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
        <Button type="submit" >Update</Button>
    </Form>

      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
     </div>
  )
}

export default EditProduct