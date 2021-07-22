import React from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'

function ItemsApi ({ productDetails }) {
  let history = useHistory()
  const product = Object.assign({}, ...productDetails)

  return (
    <div>
      <h1>{product.name}</h1>
      <div>
        <img src={product.image} alt={product.name} />
        <p>
          <label>Category : {product.category} </label>
          <br />
          <label>
            Product name: <b>{product.name}</b>
          </label>
          <label>
            Product Price: <br />$ {product.price}
          </label>
        </p>
        <button>Edit Product</button>
        <button>Delete</button>
        <Link to={`/products`}>
          <button>Back</button>
        </Link>
      </div>
    </div>
  )
}
export default withRouter(ItemsApi)
