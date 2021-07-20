import React from 'react'
import { Link } from 'react-router-dom'
import StorefrontIcon from '@material-ui/icons/Storefront'
import ViewListIcon from '@material-ui/icons/ViewList'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

export default function Footer () {
  return (
    <div className='footer'>
      <Link to='/'>
        <StorefrontIcon />
      </Link>
      <Link to='/products'>
        <ViewListIcon />
      </Link>
      <Link to='/login'>
        <AccountCircleIcon />
      </Link>
      <Link to='/cart'>
        <ShoppingCartIcon />
      </Link>
    </div>
  )
}
