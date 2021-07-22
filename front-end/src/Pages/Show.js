import React from 'react'
import ItemsApi from '../Components/ItemsApi'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { apiURL } from '../util/apiURL.js'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const API = apiURL()

export default function Show () {
  const { id } = useParams()
  const history = useHistory()
  const [productDetails, setProductDetails] = useState({})

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then(res => {
        setProductDetails(res.data)
      })
      .catch(e => {
        history.push('/not-found')
      })
  }, [])

  return (
    <div className='productCard'>
      <ItemsApi productDetails={productDetails} key={productDetails.name} />
    </div>
  )
}
