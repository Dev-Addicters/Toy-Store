import React from 'react'
import newProduct from './images/new.png'
import { Link } from "react-router-dom"



export default function ProductCard ({ product }) {
  

  return (
    <div className='productCard'>
      {product.is_new && <img src={newProduct} alt='New' />}
       <img src={product.image} alt={product.name} />
      <p>
        {product.category}
        <br />
        <b>{product.name}</b>
        <br />$ {product.price}
      </p>
      <Link to={`/`}><button>Add to Cart</button></Link>
    </div>
  )
}
