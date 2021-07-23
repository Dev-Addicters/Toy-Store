import React from 'react'
import newProduct from './images/new.png'
import { Link } from 'react-router-dom'

export default function NewItems() {
    return (
        <div>
                
            <div>
             <Link to={`/products`}><button className="productshowB">Back</button></Link>
            </div>
            <h1 className="h1product">NewItems</h1>
            <div>
                <form className="forminput">  
                    <label>Category: <input type="text" placeholder={" "}></input></label>
                    <label>Product: <input type="text" placeholder={" "}></input></label>
                    <label>Prices: <input type="number" placeholder={" "}></input></label>
                    <button className="buttonupt">New</button>
                </form>
            </div>
              <img src={newProduct} alt={""} style={{width: "500px"}} className="newimgap" />
            
            <div className='productCardnew'>
                <img src={""} alt='New' />
                <img src={""} alt={""} /> 
                    <p>
                    {""}Category:
                    <br />
                <Link to={`/products`}>  <b>{""}Product:</b></Link>
                <br />Price: $ {""}
                </p>
                <button>Add to Cart</button>
            </div>
        
            
            
        </div>
    )
}
