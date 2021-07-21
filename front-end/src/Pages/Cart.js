import React,{ useEffect }from 'react';
import ProductCard from '../Components/ProductCard'



const Cart = ({ cartItems, getCartList, addToCart }) => {

    useEffect(() => {
        getCartList();
    },[]);

    return (
        <div className='repeatAutoMinMax'>
        {cartItems && cartItems.map(item => {
          return <ProductCard product={item} key={item.id} addToCart={addToCart}/>
        })}
      </div>
    );
};

export default Cart;