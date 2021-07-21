import React, {   useEffect } from 'react'
import ProductCard from '../Components/ProductCard'
import { useParams, useRouteMatch } from 'react-router-dom'

export default function Products ({ products, addToCart, getProductsByCategory, getAllProducts }) {

const { category } = useParams()
const { url } = useRouteMatch()

useEffect(()=>{
  if (category !== undefined) {
    let categoryTrimed = category.split('-').join(' ');
    getProductsByCategory(categoryTrimed)
  }else{
    getAllProducts()
  }
}, [category, url])


  return (
    <div className='repeatAutoMinMax'>
      {products.map(product => {
        return <ProductCard product={product} key={product.id} addToCart={addToCart}/>
      })}
    </div>
  )
}
