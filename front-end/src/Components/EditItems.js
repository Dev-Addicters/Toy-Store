import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import {apiURL} from "../util/apiURL"

const API = apiURL() 

export default function EditItems(props) {
    let { id } = useParams()
    const [products, setProducts] = useState({})
    const history = useHistory()

    useEffect(() => {
      axios
        .get(`${API}/products/${id}`)
        .then(res => {
          setProducts(res.data[0])
        })
        .catch(e => {
          history.push('/not-found')
        })
    }, [])
    return (
        <div>
            <div>
             <Link to={`/products/${id}`}><button className="productshowB">Back</button></Link>
            </div>
            <h1 className="h1product">Edit Products</h1>
            <div>
            <form className="forminput">  
                <label>Category: <input type="text" placeholder={products.category}></input></label>
                <label>Product: <input type="text" placeholder={products.name}></input></label>
                <label>Prices: <input type="number" placeholder={ "$" + products.price}></input></label>
                <button>Update</button>
            </form>
            </div>
            
            <div className="imgedit">
              <img src={products.image} alt={products.name} />
            </div>
            
        </div>
    )
}
