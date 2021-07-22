import React, { useEffect } from 'react'
import CartTable from '../Components/CartTable'
import ContinueShopping from '../Pages/ContinueShopping'
export default function Cart ({
  cartItems,
  objectCartItems,
  getCartList,
  addToCart,
  updateCart
}) {
  useEffect(() => {
    getCartList()
  }, [objectCartItems])

  const handleQuantity = (itemID, q) => {
    updateCart(itemID, q)
  }
  console.log(cartItems)

  return (
    <div className='repeatAutoMinMax'>
      {cartItems.length > 0 ? (
        <CartTable
          cartItems={cartItems}
          objectCartItems={objectCartItems}
          getCartList={getCartList}
          addToCart={addToCart}
          updateCart={updateCart}
        />
      ) : (
        <ContinueShopping />
      )}
    </div>
  )
}
