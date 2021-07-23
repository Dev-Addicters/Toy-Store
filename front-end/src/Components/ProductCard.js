import React from 'react'
import newProduct from './images/new.png'
import onePixel from './images/1px.png'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

export default function ProductCard ({ products, addToCart, id }) {
  return (
    <div className='productCard'>
      {products.is_new ? (
        <img src={newProduct} alt='New' />
      ) : (
        <img src={onePixel} alt='Hidden' />
      )}
      <img src={products.image} alt={products.name} />
      <p>
        {products.category}
        <br />
        <Link to={`/products/${id}`}>
          <b>{products.name}</b>
        </Link>
        <br />$ {products.price}
      </p>
      <Button
        onClick={() => addToCart(products.id)}
        style={{ backgroundColor: 'lightgray' }}
      >
        Add to Cart
      </Button>
    </div>
  )
}
