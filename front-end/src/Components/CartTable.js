import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import DeleteIcon from '@material-ui/icons/Delete'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider';


import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  root: {
    maxWidth: 145
  },
  p: {
    display: 'inline-block',
    margin: '0 2ch',
    textAlign: 'center',
    transform: 'scale(0.9)'
  },
  title: {
    fontSize: '1.5vw',
    transform: 'translateX(-30px)'
  },
  pos: {
    marginBottom: 12
  },
  table: {
    width: '100%',
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '80%' 
  },
  delete:{
    '&:hover': {
        color: "#f00",
     },
  },
  rg: {
    transform: 'translateX(70px)'
  },
  price: {
    fontSize: '1.5vw',
    transform: 'translateX(-2ch)'
  },
  subtotal:{
    width: '100%',
  },
  pay:{
      backgroundColor:'#263238', 
      color:'azure',
      width: '60%',
      borderRadius: '10px',
      '&:hover': {
        background: "#1b5e20",
     },
    }
})

export default function CartTable ({
  cartItems,
  objectCartItems,
  getCartList,
  addToCart,
  updateCart
}) {
  const classes = useStyles()
  const bull = <span className={classes.p}>•</span>

  const numItems = objectCartItems ? Object.values(objectCartItems).reduce((acc,itnum) => acc+=Number(itnum),0) : 0
  const subTotal = parseFloat(cartItems ? cartItems.reduce((acc,item) => acc += Number(item.price) * Number(objectCartItems[`${item.id}`]),0) : 0).toFixed(2)
  const tax = parseFloat(subTotal * 0.07).toFixed(2)
  const total = parseFloat(subTotal) + parseFloat(tax)

 

  const handleQuantity = (itemID, q) => {
    updateCart(itemID, q)
  }

  return (
    <React.Fragment>
    <CssBaseline />
    
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.title} align='center'>
              Item
            </TableCell>
            <TableCell align='center'>{bull}</TableCell>
            <TableCell align='canter' className={classes.rg}>
              QTY
            </TableCell>
            <TableCell align='center'>PRICE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objectCartItems &&
            cartItems.map(item => (
              <TableRow key={item.name}>
                <TableCell align='left'>
                  <Card className={classes.root}>
                    <CardContent>
                      <CardMedia
                        className={classes.media}
                        image={item.image}
                        title={item.name}
                      />
                      <Typography
                        variant='body1'
                        color='textSecondary'
                        component='p'
                        className={classes.p}
                      >
                        {item.category}
                        <br />
                        <b>{item.name}</b>
                      </Typography>
                    </CardContent>
                  </Card>
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    aria-label='remove from cart'
                    onClick={() =>
                      handleQuantity(item.id, -objectCartItems[item.id])
                    }
                  >
                    <DeleteIcon className={classes.delete} />
                  </IconButton>
                </TableCell>
                <TableCell align='left'>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label='delete one from cart'
                      onClick={() => handleQuantity(item.id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton aria-label={`number of ${item.name}`} disabled>
                      {objectCartItems[item.id.toString()]}
                    </IconButton>
                    <IconButton
                      aria-label='add one to cart'
                      onClick={() => handleQuantity(item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </CardActions>
                </TableCell>
                <TableCell align='right'>
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    component='p'
                    className={classes.price}
                  >
                    ${' '}
                    {`${Number(item.price) *
                      Number(objectCartItems[item.id.toString()]) || 0.0}`}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Container maxWidth="md">
    <Card className={classes.subtotal} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" variant="h4" gutterBottom>
           Summary <b>{numItems}</b> Items
        </Typography>
        <Divider />
        <br />
        <Typography variant="h6" component="h2">
        By clicking <b>PAY NOW</b>, I agree to the terms & conditions and understand that all sales are final. Some restrictions apply for free shipping. Any applicable discounts or coupons will be reflected at checkout.
        </Typography>
        <br />
        <Divider />
        <br />
        <Typography className={classes.pos} color="textSecondary" variant="h4">
            SubTotal <b >$ {subTotal}</b>
        </Typography>
        <Typography className={classes.pos} color="textSecondary" variant="h4">
            Tax <b >$ {tax}</b>
        </Typography>
        <Typography className={classes.pos} color="textSecondary" variant="h4">
            Total <b >$ {total}</b>
        </Typography>
        <Typography variant="h6" component="h2">
            You have Free Shipping
        </Typography>
      </CardContent>
      <CardActions >
      <Button variant="outlined"  className={classes.pay}><Typography variant="h6" component="h2">PAY NOW</Typography></Button>
      </CardActions>
    </Card>
    </Container>
    </React.Fragment>
  )
}
