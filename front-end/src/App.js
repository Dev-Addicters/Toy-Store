import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { apiURL } from './util/apiURL.js'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Products from './Pages/Products'
import New from './Pages/New'
import Show from './Pages/Show'
import Edit from './Pages/Edit'
import Cart from './Pages/Cart'
import Four0Four from './Pages/Four0Four'

const API = apiURL()

export default function App () {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [objectCartItems, setObjectCartItems] = useState({})

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
  const addNewCard = async (newCard ) => {
    try {
      const res = await axios.post(`${API}/products/`,newCard)
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

  const getUserSearch = async ( userInput ) => {
    try {
      const res = await axios.get(`${API}/products?name=${userInput}`)
      setProducts(res)
      toast.success('Product Found')
    } catch (e) {
      toast.error('Not Found')
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
      const res = await axios.put(`${API}/products/${id}`,editedProduct)
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
    try {
      const res = await axios.put(
        `${API}/products/${buyItems.map(item => item.id).join(',')}`,
        buyItems
      )
      setObjectCartItems({})
      toast.success('Thank you for your order!')
    } catch (e) {
      toast.error('Something went wrong.')
    }
  }

  

  return (
    <Router>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
      <NavBar objectCartItems={objectCartItems} getUserSearch={getUserSearch}/>
      <main>
        {alert}
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
            />
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
            <Show product={products} addToCart={addToCart} />
          </Route>
          <Route exact path='/products/:id/edit'>
            <Edit updateProduct={updateProduct}/>
          </Route>
          <Route>
            <Four0Four />
          </Route>
        </Switch>
      </main>
      <Footer objectCartItems={objectCartItems} />
    </Router>
  )
}
