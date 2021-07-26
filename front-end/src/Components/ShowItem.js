import React from 'react'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'

import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const theme = createTheme({
  typography: {
    fontFamily: ['Asap', 'cursive'].join(',')
  }
})

const useStyles = makeStyles({
  h1product: {
    width: '100vw',
    display: 'grid',
    gridArea: '1 / 1 / 2 / 1',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#a29684',
    color: '#292723'
  },
  buttonsDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  productshowB: {
    backgroundColor: '#eeeeee',
    width: '40%',
    margin: '10px 20px 0px 10px',
    borderRadius: '10px',
    '&:hover': {
      background: '#e0e0e0'
    }
  },
  txt: {
    color: 'black',
    fontSize: '1.2rem',
    textTransform: 'capitalize'
  },
  txtbg: {
    backgroundColor: '#565656',
    color: '#ffebcd',
    textShadow: '0 -1px 0 rgb(0 0 0)',
    textAlign: 'center'
  },
  txtcenter: {
    textAlign: 'center'
  }
})

export default function ItemsApi (props) {
  const { product, id, handleDelete } = props
  const classes = useStyles()

  return (
    <div className='showGridDiv2'>
      <Typography variant='h3' className={classes.h1product}>
        {product.name}
      </Typography>
      <div className='shGriDv2-TwoDivs'>
        <img src={product.image} alt={product.name} />
        <div className='itemDetails'>
          <div className='textDetails'>
            <ThemeProvider theme={theme}>
              <Typography variant='h4' className={classes.txtcenter}>
                <div>
                  <p className={classes.txtbg}>&emsp;Category :&emsp;</p>
                </div>
                {product.category}
              </Typography>
              <Typography variant='h4' className={classes.txtcenter}>
                <div>
                  <p className={classes.txtbg}>&emsp;Product name:&emsp;</p>
                </div>
                {product.name}
              </Typography>
              <Typography
                variant='h4'
                className={classes.txtcenter}
                gutterbottom
              >
                <p className={classes.txtbg}>&emsp;Product Price:&emsp;</p>
                &emsp;$ {product.price}
              </Typography>
            </ThemeProvider>
          </div>
          <br />
          <div className={classes.buttonsDiv}>
            <Button
              component={Link}
              to={`/products/${id}/edit`}
              variant='outlined'
              className={classes.productshowB}
            >
              <Typography variant='h6' component='h2' className={classes.txt}>
                Edit Product
              </Typography>
            </Button>
            <Button
              onClick={() => handleDelete(product.id)}
              variant='outlined'
              className={classes.productshowB}
            >
              <Typography variant='h6' component='h2' className={classes.txt}>
                Delete
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      <Reviews productId={id} />
    </div>
  )
}
