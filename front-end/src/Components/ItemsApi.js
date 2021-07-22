import React from 'react'
import { useState, useEffect } from 'react'
import {Link, useParams, useHistory, withRouter } from "react-router-dom"
import axios from "axios"
import {apiURL} from "../util/apiURL"

const API = apiURL()
function ItemsApi() {

    const [ product, setProduct] = useState([])
    let {id} = useParams()
    let history = useHistory()

    // useEffect(() => {
    //     axios.get (`${API}/products/${id}`).then((res)=>{
    //         const {data} =res
    //         setProduct(data)
    //     }).catch((e)=>{
    //         history.push('/not-found')
    //     })
        
    // }, )
    return (
        <div>
            <h1>ItemsApi</h1>
            <div>
                <img src={product.image} alt={product.name} />
            <p>
            <label>Category : {product.category} </label>
            <br />
            <label>
                Product name: <b>{product.name}</b>
                </label>
            <label>
                Product Price:           <br />$ {product.price}
            </label>
            </p>
            <button>Edit Product</button>
            <button>Delete</button>
            <Link to={`/products`}><button>Back</button></Link>
            </div>
        </div>
    )
}
export default withRouter(ItemsApi)