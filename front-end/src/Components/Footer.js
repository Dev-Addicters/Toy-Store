import React from 'react'
import { Link } from 'react-router-dom'
import Badge from '@material-ui/core/Badge'
import StorefrontIcon from '@material-ui/icons/Storefront'
import ViewListIcon from '@material-ui/icons/ViewList'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

export default function Footer ({ objectCartItems }) {
  const cartQty = Object.values(objectCartItems).reduce(
    (acc, item) => (acc += item),
    0
  )
  return (
    <div className='footer'>
      <Link to='/'>
        <StorefrontIcon />
      </Link>
      <Link to='/products'>
        <ViewListIcon />
      </Link>
      <Link to='/'>
        <AccountCircleIcon />
      </Link>
      <Link to='/cart'>
        <Badge badgeContent={cartQty} color='secondary'>
          <ShoppingCartIcon />
        </Badge>
      </Link>
    </div>
  )
}
