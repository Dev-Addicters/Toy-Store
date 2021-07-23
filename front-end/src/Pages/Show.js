import React from 'react'
import ItemsApi from '../Components/ItemsApi'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { apiURL } from '../util/apiURL.js'
import { Link } from 'react-router-dom'
import newPhoto from '../Components/images/20050569271586786433-128.png'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const API = apiURL()

export default function Show ({product, addToCart}) {
  let { id } = useParams()
  const [products, setProducts] = useState({})
  console.log(products, "hello")
  const history = useHistory()
  // const [productDetails, setProductDetails] = useState({})

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
    <div >
      <div>
        <Link to={`/products`}><button className="productshowB">Back</button></Link>
      </div>
      <ItemsApi products={products} id={id} addToCart={addToCart} />
      <Link to={`/products`} className="garabe"><img src={newPhoto} alt="garabe"/></Link>
    </div>
  )
}
