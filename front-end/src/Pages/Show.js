import React from 'react'
import ItemsApi from '../Components/ItemsApi'
import { useState } from 'react'
import { useParams } from 'react-router'

export default function Show( { product }) {
    const {id} = useParams()
    const [products]= useState(product[id])
    return (
        <div className='productCard'>
            <ItemsApi products={products} id={id}/>
       </div>
    )
}
