import React, {useState, useEffect}  from 'react'
import './SellerDash.css'
import SellerList from '../components/SellerList';
import SellerForm from '../components/SellerForm';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';


function SellerDash(props) {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    getProducts();
}, []);

async function getProducts() {
    try {
        let response = await fetch('/products/1');
        if (response.ok) {
            let data = await response.json();
            setProductsData(data);
        } else {
            console.log(`Server error: ${response.status}: ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Network error: ${err.message}`);
    }
}


  async function addProduct(formData) {
    console.log(formData)
    let options = {
    method: 'POST',
    //headers: { 'Content-Type': 'application/json' }, //remove?
    body: formData // just formData?
  };
    
  try {
    let response = await fetch('/products', options); 
    if (response.ok) {
    let result = await response.json();
    setProductsData(result);
} else {
    console.log(`Server error: ${response.status} ${response.statusText}`);
  }
} catch (err) {
    console.log(`Server error: ${err.message}`);
 }};

//   async function deleteProduct(product) {
//     let options = {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(product)
//   };

//   try {
//     let response = await fetch('/products', options); 
//     if (response.ok) {
//     let result = await response.json();
//     setProductData(result);
// } else {
//     console.log(`Server error: ${response.status} ${response.statusText}`);
//   }
//   } catch (err) {
//     console.log(`Server error: ${err.message}`);
// }};

//   async function editProduct(product) {
//     let options = {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(product)
// };
            
// try {
//     let response = await fetch('/products', options); 
//     if (response.ok) {
//     let result = await response.json();
//     setProductData(result);
// } else {
//     console.log(`Server error: ${response.status} ${response.statusText}`);
// }
// } catch (err) {
//     console.log(`Server error: ${err.message}`);
// }};

  return (
    <div>
      <Container>
      <Row>
      <Col><SellerForm addProductCb={addProduct} /></Col>
      <Col><SellerList productsData={productsData}/></Col>
      
      </Row>
      </Container>

    </div>
  )
}

export default SellerDash