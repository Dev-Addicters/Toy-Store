import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useHistory, useParams, withRouter } from 'react-router-dom'
import axios from "axios"
import {apiURL} from "../util/apiURL"

const API = apiURL() 

function ItemsApi (props) {

 const [products, setProducts] = useState([])
 let { id } = useParams()
 let history = useHistory()

 useEffect(()=>{
     axios.get(`${API}/products/${id}`).then((res)=>{
         const {data} = res
         setProducts(data)
       
     }).catch((e)=>{
                 history.push('/not-found')
             })
 }, [id, history])
  return (
    <div className="ProductDeat">
      <h1>{products.name}</h1>
      <div>
        <img src={products.image} alt={products.name} />
      </div>
      <div className="Details">
        <p>
            <h2> Category : {products.category} </h2>
            <h2> Product name: {products.name}</h2>
            <h2> Product Price: $ {products.price}</h2>
        </p>
        <Link to={`/products/${id}/edit`}><button products={products} >Edit Product</button></Link>
      </div>
    </div>
  )
}
export default withRouter(ItemsApi)
