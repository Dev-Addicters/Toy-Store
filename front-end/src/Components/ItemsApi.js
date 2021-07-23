import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Reviews from "./Reviews";
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({

  h1product: {
    width: '100vw',
    height: 'minmax(5%,8%)',
    display: 'grid',
    placeItems: 'center',
  },
  buttonsDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  productshowB: {
    backgroundColor: '#eeeeee',
    width: '20%',
    margin: '10px 20px 0px 10px',
    borderRadius: '10px',
    '&:hover': {
      background: '#e0e0e0'
    }
  },
  txt:{
    color: 'black',
    fontSize: '1em'
  }
})

  
function ItemsApi(props) {
  const { products, id, addToCart } = props
  const classes = useStyles()
  return (
    <div className="showGridDiv2">
      <Typography variant='h3' className={classes.h1product}>
      {products.name}
      </Typography>
      <div className="shGriDv2-TwoDivs">
        <img src={products.image} alt={products.name} />
      <div className="itemDetails">
        <div className="textDetails">
        <Typography variant='h4'>
        Category : {products.category} 
        </Typography>
          <Typography variant='h4'>
          Product name: {products.name}
          </Typography>
          <Typography variant='h4'>
          Product Price: $ {products.price}
          </Typography>

        </div>
        <div className={classes.buttonsDiv}>
        <Button component={Link} to={`/products/${id}/edit`} variant='outlined' className={classes.productshowB}>
                <Typography variant='h6' component='h2'className={classes.txt}>
                Edit Product
                </Typography>
              </Button>
              <Button onClick={() => addToCart(products.id)} variant='outlined' className={classes.productshowB}>
                <Typography variant='h6' component='h2'className={classes.txt}>
                Add to Cart
                </Typography>
              </Button>
        </div>
      </div>
      </div>
      <Reviews productId={id} />
    </div>
  )
}
export default withRouter(ItemsApi)
