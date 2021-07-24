import React from 'react'
import ItemsApi from '../Components/ShowItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { apiURL } from '../util/apiURL.js'
import { Link } from 'react-router-dom'
import newPhoto from '../Components/images/20050569271586786433-128.png'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const API = apiURL()

const useStyles = makeStyles({
  productshowB: {
    backgroundColor: '#eeeeee',
    width: '20%',
    margin: '10px 20px 0px 10px',
    borderRadius: '10px',
    '&:hover': {
      background: '#e0e0e0'
    }
  },
  txt: {
    color: 'black',
    fontSize: '1em'
  }
})

export default function Show({ product, addToCart }) {
  const classes = useStyles()

  let { id } = useParams()
  const [products, setProducts] = useState({})

  const history = useHistory()

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then(res => {
        setProducts(res.data[0])
      })
      .catch(e => {
        history.push('/not-found')
      })
    // eslint-disable-next-line
  }, [])

  return (
    <div className='showGrid'>
      <div className='showGridDiv1'>
        <Button
          component={Link}
          to={`/products`}
          variant='outlined'
          className={classes.productshowB}
        >
          <Typography variant='h6' component='h2' className={classes.txt}>
            BACK
          </Typography>
        </Button>
      </div>
      <ItemsApi products={products} id={id} addToCart={addToCart} />
      <Link to={`/products`} className='garabe'>
        <img src={newPhoto} alt='garabe' />
      </Link>
    </div>
  )
}
