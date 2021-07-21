import React from 'react'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'

export default function NavBar () {
  return (
    <div className='navBar'>
      <Link to='/' className='top'>
        <h1 className='store top'>Toy Store</h1>
      </Link>
      <div className='tabs'>
        <Link
          to='/products'
          id='productsTab'
          className='navLink hidden-visually '
        >
          <h3>PRODUCTS</h3>
          <div>
            <p>List of Products</p>
          </div>
        </Link>
        <Link
          to='/featured'
          id='featuredTab'
          className='navLink hidden-visually '
        >
          <h3>FEATURED</h3>
          <div>
            <p>Featured</p>
          </div>
        </Link>
      </div>

      <form>
        <SearchIcon id='searchIcon' />
        <input className='navInput'></input>
      </form>
      <Link to='/login' className='navProfile hidden-visually '>
        <AccountCircleIcon id='userLogin' />
      </Link>
      <Link to='/cart' className='navCar hidden-visually'>
        <ShoppingCartIcon />
      </Link>
      <Link to='/products/new'>
        <button className='navButton hidden-visually'>New Items</button>
      </Link>
    </div>
  )
}
