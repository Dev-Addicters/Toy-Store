import React from 'react'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import newProductImg from './images/new.png'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  },
  h1product: {
    width: '100vw',
    height: 'minmax(5%,8%)',
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center'
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
    width: '20%',
    margin: '10px 20px 0px 10px',
    borderRadius: '10px',
    '&:hover': {
      background: '#e0e0e0'
    }
  },
  fit: {
    width: '100%',
    height: '100%',
    padding: '30px'
  }
}))

function NewItem (props) {
  const classes = useStyles()
  const history = useHistory()
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    quantity: '',
    is_new: true
  })

  const handleInput = e => {
    setNewProduct({ ...newProduct, [e.target.id]: e.target.value })
  }
  const handleCheck = () => {
    setNewProduct({ ...setNewProduct, is_new: !newProduct.is_new })
  }
  const handleSubmit = e => {
    e.preventDefault()
    props.addNewCard(newProduct)
    props.history.push('/products')
  }

  return (
    <>
      <Typography variant='h4' className={classes.h1product}>
        Fill the form to add a new product
      </Typography>
      <div className='shGriDv2-TwoDivs'>
        <img
          src={newProductImg}
          alt='New-Product'
          style={{ transform: 'scale(0.7)' }}
        />

        <CssBaseline />
        <Container
          maxWidth='sm'
          component={Paper}
          elevation={3}
          className={classes.fit}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ margin: 0, padding: 10 }}
              InputLabelProps={{ shrink: true }}
              onChange={handleInput}
              value={newProduct.category}
              placeholder='New category'
              label='Category'
              variant='outlined'
              id='category'
              fullWidth
              required
            />
            <TextField
              style={{ margin: 0, padding: 10 }}
              InputLabelProps={{ shrink: true }}
              onChange={handleInput}
              value={newProduct.name}
              placeholder='New Name'
              label='Name'
              variant='outlined'
              id='name'
              fullWidth
              required
            />
            <TextField
              style={{ margin: 0, padding: 10 }}
              InputLabelProps={{ shrink: true }}
              onChange={handleInput}
              value={newProduct.price}
              InputProps={{
                inputProps: {
                  max: 100,
                  min: 0
                }
              }}
              variant='outlined'
              placeholder='$'
              label='Price'
              type='number'
              id='price'
              fullWidth
              required
            />
            <TextField
              style={{ margin: 0, padding: 10 }}
              InputLabelProps={{ shrink: true }}
              onChange={handleInput}
              value={newProduct.quantity}
              InputProps={{
                inputProps: {
                  max: 10000,
                  min: 0
                }
              }}
              variant='outlined'
              placeholder='10'
              label='Quantity'
              type='number'
              id='quantity'
              fullWidth
              required
            />
            <List>
              <ListItem alignItems='center'>
                <Checkbox
                  checked={newProduct.is_new}
                  onChange={handleCheck}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  required
                />
                <TextField
                  fullWidth
                  disabled
                  placeholder='Is a New Product .?'
                />
              </ListItem>
            </List>

            <div style={{ margin: 0, padding: 14 }}>
              <Button
                variant='outlined'
                color='primary'
                type='submit'
                fullWidth
              >
                Create Product
              </Button>
              <div>&emsp;</div>
              <Button
                onClick={() => {
                  history.push(`/products`)
                }}
                variant='outlined'
                color='primary'
                type='button'
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </>
  )
}
export default withRouter(NewItem)
