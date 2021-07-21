import React from 'react'
import newProduct from './images/new.png'

export default function ProductCard ({ product, addToCart}) {

  return (
    <div className='productCard'>
      {product.is_new && <img src={newProduct} alt='New' href={`/products/${product.id}`}/>}
      <img src={product.image} alt={product.name} />
      <p>
        {product.category}
        <br />
        <b>{product.name}</b>
        <br />$ {product.price}
      </p>
      <button onClick={()=>addToCart(product.id)} >Add to Cart</button>
    </div>
  )
}
