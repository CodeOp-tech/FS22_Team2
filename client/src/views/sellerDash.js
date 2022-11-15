import React, {useState, useEffect}  from 'react'
import './sellerDash.css'
import SellerList from './components/SellerList';
import SellerForm from '../components/sellerForm';


function sellerDash(props) {
  const [productData, setProductData] = useState([]);

  async function addProduct(product) {
    let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  };
    
  try {
    let response = await fetch('/products', options); 
    if (response.ok) {
    let result = await response.json();
    setProductData(result);
} else {
    console.log(`Server error: ${response.status} ${response.statusText}`);
  }
} catch (err) {
    console.log(`Server error: ${err.message}`);
 }};

  async function deleteProduct(product) {
    let options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  };

  try {
    let response = await fetch('/products', options); 
    if (response.ok) {
    let result = await response.json();
    setProductData(result);
} else {
    console.log(`Server error: ${response.status} ${response.statusText}`);
  }
  } catch (err) {
    console.log(`Server error: ${err.message}`);
}};

  async function editProduct(product) {
    let options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
};
            
try {
    let response = await fetch('/products', options); 
    if (response.ok) {
    let result = await response.json();
    setProductData(result);
} else {
    console.log(`Server error: ${response.status} ${response.statusText}`);
}
} catch (err) {
    console.log(`Server error: ${err.message}`);
}};

  return (
    <div>
      <SellerList/>
      <SellerForm/>

    </div>
  )
}

export default sellerDash