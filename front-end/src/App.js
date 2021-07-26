import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { apiURL } from './util/apiURL.js'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Four0Four from './Pages/Four0Four'
import Results from './Pages/Results.js'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Products from './Pages/Products'
import Show from './Pages/Show'
import Home from './Pages/Home'
import Edit from './Pages/Edit'
import Cart from './Pages/Cart'
import New from './Pages/New'

const API = apiURL()

export default function App () {
  const [objectCartItems, setObjectCartItems] = useState({})
  const [placingOrder, setPlacingOrder] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    getAllProducts()
  }, [])

  const addToCart = id => {
    let objItems = Object.assign({}, objectCartItems)
    if (!Object.keys(objItems).includes(id.toString())) {
      objItems[id.toString()] = 0
    }
    objItems[id.toString()] += 1
    setObjectCartItems(objItems)
  }

  const getCartList = () => {
    const listItems = Object.keys(objectCartItems).join(',')
    if (listItems) {
      axios
        .get(`${API}/products/${listItems}`)
        .then(
          response => setCartItems(response.data),
          error => console.log('get', error)
        )
        .catch(c => console.warn('catch', c))
    } else {
      setCartItems([])
    }
  }

  // CREATE
  const addNewCard = async newCard => {
    try {
      await axios.post(`${API}/products/`, newCard)
      toast.success('Product added to Inventory!')
    } catch (e) {
      toast.error('Something went wrong.')
    }
  }

  // UPDATE
  const updateCart = (id, quantity) => {
    let objItems = Object.assign({}, objectCartItems)
    objItems[id.toString()] += quantity
    if (objItems[id.toString()] === 0) {
      delete objItems[id.toString()]
    }
    setObjectCartItems(objItems)
  }

  // SHOW
  const getUserSearch = async userInput => {
    try {
      const { data } = await axios.get(`${API}/products?search=${userInput}`)
      setResults(data)
    } catch (e) {
      toast.error('Something went wrong')
    }
  }

  const getAllProducts = () => {
    axios
      .get(`${API}/products?sortBy=id`)
      .then(
        response => setProducts(response.data),
        error => console.log('get', error)
      )
      .catch(c => console.warn('catch', c))
  }

  const getProductsByCategory = category => {
    axios
      .get(`${API}/products?category=${category}`)
      .then(
        response => setProducts(response.data),
        error => console.log('get', error)
      )
      .catch(c => console.warn('catch', c))
  }

  // UPDATE
  const updateProduct = async (id, editedProduct) => {
    try {
      await axios.put(`${API}/products/${id}`, editedProduct)
      toast.success('Successful Modification!')
    } catch (e) {
      toast.error('Something went wrong.')
    }
  }

  const buyProducts = async () => {
    const buyItems = []
    for (const id in objectCartItems) {
      buyItems.push({ id, quantity: -objectCartItems[id] })
    }
    axios
      .put(
        `${API}/products/${buyItems.map(item => item.id).join(',')}`,
        buyItems
      )
      .then(res => {
        setPlacingOrder(true)
        toast.success('Thank you, your order has been placed!')
        setTimeout(() => {
          setObjectCartItems({})
          setPlacingOrder(false)
        }, 2000)
      })
      .catch(e => {
        setPlacingOrder(false)
        toast.error('Something went wrong.')
      })
  }

  // DELETE
  const handleDelete = id => {
    axios
      .delete(`${API}/products/${id}`)
      .then(res => {
        toast.success('Product deleted successfully!')
        setTimeout(function () {
          window.open('/products', '_self')
        }, 2000)
      })
      .catch(e => {
        toast.error('Something went wrong.')
      })
  }

  return (
    <Router>
      <NavBar objectCartItems={objectCartItems} getUserSearch={getUserSearch} />
      <main>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/cart'>
            <Cart
              cartItems={cartItems}
              objectCartItems={objectCartItems}
              getCartList={getCartList}
              addToCart={addToCart}
              updateCart={updateCart}
              buyProducts={buyProducts}
              placingOrder={placingOrder}
            />
          </Route>
          <Route exact path='/results'>
            <Results results={results} addToCart={addToCart} />
          </Route>
          <Route exact path='/products/category/:category'>
            <Products
              products={products}
              addToCart={addToCart}
              getProductsByCategory={getProductsByCategory}
              getAllProducts={getAllProducts}
            />
          </Route>
          <Route exact path='/products/new'>
            <New addNewCard={addNewCard} />
          </Route>
          <Route exact path='/products'>
            <Products
              products={products}
              addToCart={addToCart}
              getProductsByCategory={getProductsByCategory}
              getAllProducts={getAllProducts}
            />
          </Route>
          <Route exact path='/products/:id'>
            <Show addToCart={addToCart} handleDelete={handleDelete} />
          </Route>
          <Route exact path='/products/:id/edit'>
            <Edit updateProduct={updateProduct} />
          </Route>
          <Route>
            <Four0Four />
          </Route>
        </Switch>
      </main>
      <div className='footerContainer'>
        <Footer objectCartItems={objectCartItems} />
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        ></ToastContainer>
      </div>
    </Router>
  )
}
