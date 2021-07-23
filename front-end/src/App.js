import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { apiURL } from './util/apiURL.js'
import axios from 'axios'

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

  const addNewCard = (newCard)=>{
    axios.get(`${API}/products`, newCard).then((res)=>{
      return axios.get(`${API}/products`)
    }).then((res)=>{
      setProducts(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })
  }

  const updateCart = (id, quantity) => {
    let objItems = Object.assign({}, objectCartItems)
    objItems[id.toString()] += quantity
    if (objItems[id.toString()] === 0) {
      delete objItems[id.toString()]
    }
    setObjectCartItems(objItems)
  }

  const getAllProducts = () => {
    axios
      .get(`${API}/products`)
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

  return (
    <Router>
      <NavBar />
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
            <New  addNewCard={addNewCard}/>
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
            <Show product={products} addToCart={addToCart}/>
          </Route>
          <Route exact path='/products/:id/edit'>
            <Edit />
          </Route>
          <Route>
            <Four0Four />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}
