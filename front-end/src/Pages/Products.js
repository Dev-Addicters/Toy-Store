import React from 'react'
import ProductCard from '../Components/ProductCard'

export default function Products ({ products }) {
  return (
    <div className='repeatAutoMinMax'>
      {products.map(product => {
        return <ProductCard product={product} key={product.id} />
      })}
    </div>
  )
}