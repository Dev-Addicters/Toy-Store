import React from 'react'
import { useState } from 'react'
import newProduct from './images/new.png'
import { Link, withRouter } from 'react-router-dom'

function NewItems(props) {
    const [newProducts, setNewProducts]  = useState({
        name: "",
        price: "",
        image: "",
        category: "",
        quantity: "",
        check: [],
        is_new: [],
    })
    
    const handleInput = (e)=>{
        setNewProducts({...newProducts, [e.target.id]: e.target.value})
    }
    const handleCheck = ()=>{
        setNewProducts({...setNewProducts, is_new: !newProducts.is_new})
    }
    const handleSubmit= (e)=>{
        e.preventDefault()
        props.addNewCard(newProducts)
        props.history.push('/products')
    }

    return (
        <div>
                
            <div>
             <Link to={`/products`}><button className="productshowB">Back</button></Link>
            </div>
            <h1 className="h1product">NewItems</h1>
            <div>
                <form onSubmit={handleSubmit} className="forminput">  
                    <label>Name: 
                    <input 
                        id="name"
                        value={newProducts.name}
                        type="text" 
                        onChange={handleInput}
                        placeholder="Name..."></input></label>
                    <label>Prices: 
                    <input 
                        id="price"
                        value={newProducts.price}
                        type="number" 
                        onChange={handleInput} 
                        placeholder="Amount..."></input></label>
                    <label>Image:
                        <input 
                            id="image"
                            value={newProducts.image}
                            type="text"
                            onChange={handleInput}
                            placeholder="URLink..."></input></label>
                    <label>Category: 
                    <input 
                        id="category"
                        value={newProducts.category}
                        type="text" 
                        onChange={handleInput} 
                        placeholder="Cateory..."></input></label>
                    <label>Quantity: 
                    <input 
                        id="quantity"
                        value={newProducts.quantity}
                        type="number" 
                        onChange={handleInput} 
                        placeholder="Quantity..."></input></label>
                    <label>Check: 
                    <input 
                        id="check"
                        value={newProducts.check}
                        type="number" 
                        onChange={handleInput}
                        placeholder="check..."></input></label>
                    <label>Is_new: 
                    <input 
                        id="is_new"
                        type="checkbox" 
                        onChange={handleCheck} 
                        checked={newProducts.is_new}
                        placeholder={" "}></input></label>
                    
                    <button type="submit" className="buttonupt">New</button>
                </form>
            </div>
              <img src={newProduct} alt={""} style={{width: "200px"}} className="newimgap" />
            
            <div className='productCardnew'>
                <img src={''} alt='New' />
                <img src={newProducts.image} alt={newProducts.image} className="imgnewPro"/> 
                    <p>
                    Category:<strong>{newProducts.category}</strong>
                    <br />
                <Link to={`/products`}>  <b>{newProducts.name}Product:</b></Link>
                <br />Price: $ {newProducts.price}
                </p>
                <button>Add to Cart</button>
            </div>
        
            
            
        </div>
    )
}
export default withRouter(NewItems)