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
import Divider from '@material-ui/core/Divider'

import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

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
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  table: {
    width: '100%',
    height: '100%',

  },
  media: {
    height: 0,
    paddingTop: '84%'
  },
  delete: {
    '&:hover': {
      color: '#f00'
    }
  },
  rg: {
    transform: 'translateX(70px)'
  },
  price: {
    fontSize: '1.4rem',
    transform: 'translateX(-2ch)'
  },
  subtotal: {
    width: '100%',
    boxShadow: '0 3px 3px -2px rgba(0, 0, 0, 0.9)',
  },
  pay: {
    backgroundColor: '#263238',
    color: 'azure',
    width: '250px',
    borderRadius: '10px',
    '&:hover': {
      background: '#1b5e20'
    }
  },
  centered: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  centerFlex: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

export default function CartTable ({
  cartItems,
  objectCartItems,
  getCartList,
  addToCart,
  updateCart,
  buyProducts,
}) {
  const classes = useStyles()
  
  const numItems = objectCartItems
    ? Object.values(objectCartItems).reduce(
        (acc, itnum) => (acc += Number(itnum)),
        0
      )
    : 0
  const subTotal = parseFloat(
    cartItems
      ? cartItems.reduce(
          (acc, item) =>
            (acc += Number(item.price) * Number(objectCartItems[`${item.id}`])),
          0
        )
      : 0
  ).toFixed(2)
  const tax = parseFloat(subTotal * 0.07).toFixed(2)
  const total = parseFloat(subTotal) + parseFloat(tax)

  const handleQuantity = (itemID, q) => {
    updateCart(itemID, q)
  }
  // const buyProducts=()=>{
  //   updateProductsDatabase()
  // }

  return (
    <React.Fragment >
      <CssBaseline />
      <TableContainer component={Paper} elevation={3}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <b>ITEM</b>
              </TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='canter' className={classes.rg}>
                <b>QTY</b>
              </TableCell>
              <TableCell align='center'>
                <b>PRICE</b>
              </TableCell>
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
                      <IconButton
                        aria-label={`number of ${item.name}`}
                        disabled
                      >
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

      <Container maxWidth='md'>
        <Card className={classes.subtotal} variant='outlined'>
          <CardContent>
            <Container className={classes.centerFlex} fixed>
              <Typography
                color='textSecondary'
                style={{ fontSize: '30px' }}
                gutterBottom
              >
                Summary <b>{numItems}</b> Items
              </Typography>
            </Container>
            <Divider />
            <br />
            <Typography variant='h6' component='h2'>
              By clicking <b>PAY NOW</b>, I agree to the terms & conditions and
              understand that all sales are final. Some restrictions apply for
              free shipping. Any applicable discounts or coupons will be
              reflected at checkout.
            </Typography>
            <br />
            <Divider />
            <br />
            <Container className={classes.centered} fixed>
              <Typography
                className={classes.pos}
                color='textSecondary'
                variant='h4'
              >
                SubTotal
              </Typography>
              <Typography
                className={classes.pos}
                color='textSecondary'
                variant='h5'
              >
                <b>$ {subTotal}</b>
              </Typography>
            </Container>
            <Container className={classes.centered} fixed>
              <Typography
                className={classes.pos}
                color='textSecondary'
                variant='h4'
              >
                Tax
              </Typography>
              <Typography
                className={classes.pos}
                color='textSecondary'
                variant='h5'
              >
                <b>$ {tax}</b>
              </Typography>
            </Container>
            <Container className={classes.centered} fixed>
              <Typography
                className={classes.pos}
                color='textSecondary'
                variant='h3'
              >
                Total
              </Typography>
              <Typography
                className={classes.pos}
                color='textSecondary'
                variant='h4'
              >
                <b>$ {total.toFixed(2)}</b>
              </Typography>
            </Container>
            <Container className={classes.centerFlex} fixed>
              <Typography
                variant='h6'
                component='h2'
                style={{ alingSelf: 'center' }}
              >
                You have Free Shipping
              </Typography>
            </Container>
          </CardContent>
          <Container className={classes.centerFlex} fixed>
            <CardActions>
              <Button variant='outlined' className={classes.pay} >
                <Typography variant='h6' component='h2' onClick={()=>buyProducts()}>
                  PAY NOW
                </Typography>
              </Button>
            </CardActions>
          </Container>
        </Card>
      </Container>
    </React.Fragment>
  )
}
