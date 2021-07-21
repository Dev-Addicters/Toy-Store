import React from 'react'
import newProduct from './images/new.png'

export default function ProductCard ({ product }) {
  return (
    <div className='productCard'>
      {product.isnew && <img src={newProduct} alt='New' />}
      <img src={product.image} alt={product.name} />
      <p>
        {product.category}
        <br />
        <b>{product.name}</b>
        <br />$ {product.price}
      </p>
      <button>Add to Cart</button>
    </div>
  )
}
