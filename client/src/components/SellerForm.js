import React, { useState } from 'react'
import './SellerForm.css'

const EMPTY_FORM ={
    date: '', // need date? for future reference (e.g. keeps track of how long the shop has been with the website)
    product_name:'',
    porduct_image:'',
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

    function handleSubmit (e) {
        e.preventDefault();

        let formData = new FormData();
       
        formData.append('productfile', file, file.name);

        addProduct (productData);

        setProductData(EMPTY_FORM);
      }

    function handleSubmit (e) {
      e.preventDefault();
      let formData = new FormData();
      formData.append
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

    <form className='seller-form' onSubmit={handleSubmit}>
        <label className='date'>
          Date
            <input
             type='date'
             name='date'
             vlaue={productData.date}
             onChange={handleChange}
             />
        </label>
        <label className='product-name'>
            Product Name 
            <input
             type='text'
             name='product_id'
             value={productData.product_name}
             onChange={handleChange}
             />
        </label>
        <label className='product-name'>
            Product Decription
            <input
             type='text'
             name='product_description'
             value={productData.product_description}
             onChange={handleChange}
             />
        </label>
        <label className='price'>
            Price
            <input
             type='number'
             name='price'
             value={productData.price}
             onChange={handleChange}
             />
        </label>
        <label className='product-quantity'>
            Qauntity
            <input
             type='number'
             name='product_quantity'
             value={productData.product_quantity}
             onChange={handleChange}
             />
        </label>
        <label className='product-image'>
            Image
            <input
             type='file'
             name='product_image'
             value={productData.porduct_image}
             onChange={handleChange}
             />
        </label>
        <label className='product-checklist'>
            This product is...
            Recyclable
            <input
             type='checkbox'
             name='checklist1'
             value={productData.checklist1}
             onChange={handleChangeCheck}
             />
        </label>
        <label className='product-checklist'>
            Made from recycled products
            <input
             type='checkbox'
             name='checklist2'
             value={productData.checklist2}
             onChange={handleChangeCheck}
             />
        </label>
        <label className='product-checklist'>
            Locally Sourced
            <input
             type='checkbox'
             name='checklist3'
             value={productData.checklist3}
             onChange={handleChangeCheck}
             />
        </label>
        <label className='product-checklist'>
            Has no toxic materials 
            <input
             type='checkbox'
             name='checklist4'
             value={productData.checklist4}
             onChange={handleChangeCheck}
             />
        </label>
        <label className='product-checklist'>
            Fairtrade
            <input
             type='checkbox'
             name='checklist5'
             value={productData.checklist5}
             onChange={handleChangeCheck}
             />
        </label>
        <button type="submit">Submit</button>
    </form>


  )
}

export default SellerForm