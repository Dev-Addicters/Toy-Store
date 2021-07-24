import React, { useEffect } from 'react'
import CartTable from '../Components/CartTable'
import ContinueShopping from '../Pages/ContinueShopping'
export default function Cart({
  cartItems,
  objectCartItems,
  getCartList,
  addToCart,
  updateCart,
  buyProducts,
  placingOrder
}) {
  useEffect(() => {
    getCartList()
    // eslint-disable-next-line
  }, [objectCartItems])

  return (
    <div className='repeatAutoMinMax'>
      {cartItems.length > 0 ? (
        <CartTable
          cartItems={cartItems}
          objectCartItems={objectCartItems}
          getCartList={getCartList}
          addToCart={addToCart}
          updateCart={updateCart}
          buyProducts={buyProducts}
          placingOrder={placingOrder}
        />
      ) : (
        <ContinueShopping />
      )}
    </div>
  )
}
