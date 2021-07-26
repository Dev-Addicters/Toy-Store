import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { apiURL } from '../util/apiURL.js'
import axios from 'axios'

import ShowItem from '../Components/ShowItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const API = apiURL()

const useStyles = makeStyles({
  productshowB: {
    backgroundColor: '#eeeeee',
    width: '20%',
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

export default function Show ({ addToCart, handleDelete }) {
  const classes = useStyles()

  const [product, setProduct] = useState({})
  const history = useHistory()
  let { id } = useParams()

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then(res => {
        setProduct(res.data[0])
      })
      .catch(e => {
        history.push('/not-found')
      })
  }, [product])

  return (
    <div className='showGrid'>
      <div className='showGridDiv1'>
        <Button
          onClick={() => history.goBack()}
          variant='outlined'
          className={classes.productshowB}
        >
          <Typography variant='h6' component='h2' className={classes.txt}>
            BACK
          </Typography>
        </Button>
        <Button
          onClick={() => addToCart(id)}
          variant='outlined'
          className={classes.productshowB}
        >
          <Typography variant='h6' component='h2' className={classes.txt}>
            BUY
          </Typography>
        </Button>
        <Button
          onClick={() => window.open(`/products/${id}#reviewsBlock`, '_self')}
          variant='outlined'
          className={classes.productshowB}
        >
          <Typography variant='h6' component='h2' className={classes.txt}>
            REVIEWS
          </Typography>
        </Button>
        <br />
        <br />
      </div>
      <ShowItem
        product={product}
        id={id}
        addToCart={addToCart}
        handleDelete={handleDelete}
      />
    </div>
  )
}
