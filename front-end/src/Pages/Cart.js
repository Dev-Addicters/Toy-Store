import React, { useEffect } from 'react'
// import ProductCard from '../Components/ProductCard'
import DeleteIcon from '@material-ui/icons/Delete'

export default function Cart ({
  cartItems,
  objectCartItems,
  getCartList,
  addToCart,
  updateCart
}) {
  useEffect(() => {
    getCartList()
  }, [objectCartItems, getCartList])

  const handleQuantity = (itemID, q) => {
    updateCart(itemID, q)
  }

  return (
    <div className='repeatAutoMinMax'>
      {/* {cartItems &&
        cartItems.map(item => {
          return (
            <ProductCard product={item} key={item.id} addToCart={addToCart} />
          )
        })} */}

      <table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th></th>
            <th>QTY</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {objectCartItems &&
            cartItems.map(item => {
              return (
                <tr>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '80px', height: '60px' }}
                    />
                    <p>
                      {item.category}
                      <br />
                      <b>{item.name}</b>
                    </p>
                  </td>
                  <td>
                    <DeleteIcon
                      onClick={() =>
                        handleQuantity(item.id, -objectCartItems[item.id])
                      }
                    />
                  </td>
                  <td>
                    <div>
                      <button onClick={() => handleQuantity(item.id, -1)}>
                        -
                      </button>
                      <button>{objectCartItems[item.id.toString()]}</button>
                      <button onClick={() => handleQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>{`${Number(item.price) *
                    Number(objectCartItems[item.id.toString()]) || 0.0}`}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
