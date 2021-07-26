import React from 'react'
import ProductCard from '../Components/ProductCard'

export default function Results ({ results, addToCart }) {
  return (
    <>
      {!results.length && <h1>No result found</h1>}
      <div className='repeatAutoMinMax'>
        {results.map(product => {
          return (
            <ProductCard
              products={product}
              key={product.id}
              id={product.id}
              addToCart={addToCart}
            />
          )
        })}
      </div>
    </>
  )
}
