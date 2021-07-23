import React from 'react'
import { Link, withRouter } from 'react-router-dom'


function ItemsApi (props) {
 const {products, id, addToCart } = props

  return (
    <div className="ProductDeat">
      <h1 className="h1product">{products.name}</h1>
      <div>
        <img src={products.image} alt={products.name} />
      </div>
      <div className="Details">
        <p>
            <h1> Category : {products.category} </h1>
            <h1> Product name: {products.name}</h1>
            <h1> Product Price: $ {products.price}</h1>
        </p>
        <Link to={`/products/${id}/edit`}><button products={products} >Edit Product</button></Link>{" "}
        <button onClick={()=> addToCart(products.id)} >Add to Cart</button>
      </div>
    </div>
  )
}
export default withRouter(ItemsApi)
