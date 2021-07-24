import React from 'react'
import { Link } from 'react-router-dom'
import Badge from '@material-ui/core/Badge'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'
import disney from './images/disney-head.png'
import got from './images/got-head.png'
import harry from './images/harry-head.png'
import marvel from './images/marvel-head.png'
import movies from './images/movies-head.png'
import cartoon from './images/cartoon-head.png'
import exclusive from './images/exclusive-head.png'
import soon from './images/soon-head.png'

export default function NavBar ({ objectCartItems }) {
  const cartQty = Object.values(objectCartItems).reduce(
    (acc, item) => (acc += item),
    0
  )
  return (
    <div className='navBar'>
      <Link to='/' className='top'>
        <h1 className='store top'>Toy Store</h1>
      </Link>
      <div className='tabs'>
        <Link
          to='/products'
          id='productsTab'
          className='navLink hidden-visually'
        >
          <h3>PRODUCTS</h3>

          <div className='productContainer'>
            <Link to='/products/category/disney'>
              <div className='headContainer'>
                <img src={disney} alt='Disney' className='productImage' />
                <p>
                  <b>Disney</b>
                  <br />& Pixar
                </p>
              </div>
            </Link>
            <Link to='/products/category/game-of-thrones'>
              <div className='headContainer'>
                <img src={got} alt='Game of Thrones' className='productImage' />
                <p>
                  <b>Game of Thrones</b>
                  <br />& TV
                </p>
              </div>
            </Link>
            <Link to='/products/category/harry-potter'>
              <div className='headContainer'>
                <img src={harry} alt='Harry Potter' className='productImage' />
                <p>
                  <b>Harry Potter</b>
                  <br />& Series
                </p>
              </div>
            </Link>
            <Link to='/products/category/marvel'>
              <div className='headContainer'>
                <img src={marvel} alt='Marvel' className='productImage' />
                <p>
                  <b>Marvel</b>
                  <br />& SuperHeroes
                </p>
              </div>
            </Link>
          </div>
        </Link>
        <Link
          to='/products'
          id='featuredTab'
          className='navLink hidden-visually '
        >
          <h3>FEATURED</h3>
          <div className='productContainer'>
            <Link to='/products/category/movies'>
              <div className='headContainer'>
                <img src={movies} alt='Movies' className='productImage' />
                <p>
                  <b>Movies</b>
                  <br />& Villians
                </p>
              </div>
            </Link>
            <Link to='/products/category/cartoons'>
              <div className='headContainer'>
                <img src={cartoon} alt='Cartoon' className='productImage' />
                <p>
                  <b>Cartoons</b>
                  <br />& Comedy
                </p>
              </div>
            </Link>
            <Link to='/products/category/exclusive'>
              <div className='headContainer'>
                <img src={exclusive} alt='Exclusive' className='productImage' />
                <p>
                  <b>Exclusive</b>
                  <br />& Limited Edition
                </p>
              </div>
            </Link>
            <Link to='/products/category/coming-soon'>
              <div className='headContainer'>
                <img src={soon} alt='Coming Soon' className='productImage' />
                <p>
                  <b>Coming Soon</b>
                  <br />& Collectibles
                </p>
              </div>
            </Link>
          </div>
        </Link>
      </div>

      <form>
        <SearchIcon id='searchIcon' />
        <input className='navInput'></input>
      </form>
      <Link to='/' className='navProfile hidden-visually '>
        <AccountCircleIcon id='userLogin' />
      </Link>
      <Link to='/cart' className='navCar hidden-visually'>
        <Badge badgeContent={cartQty} color='secondary'>
          <ShoppingCartIcon />
        </Badge>
      </Link>
      <Link to='/products/new'>
        <button className='navButton hidden-visually'>New Items</button>
      </Link>
    </div>
  )
}
